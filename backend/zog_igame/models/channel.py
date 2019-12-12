# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models
import json

import logging
_logger = logging.getLogger(__name__)

class Table(models.Model):
    _inherit = "og.table"
    channel_ids = fields.One2many('og.channel','table_id')


class Board(models.Model):
    _inherit = "og.board"
    
    # TBD  re compute
    def _get_info(self):
        table_player_ids = self.table_id.table_player_ids
        datas = []
        for table_player in table_player_ids:
            data = {
                'id':table_player.id,
                'name':table_player.name,
                'position':table_player.position,
                'online':table_player.online
            }
            datas.append(data)

        return {
            'id': self.id,
            'number':self.number,
            'vulnerable':self.vulnerable,
            'dealer':self.dealer,
            'hands': self.hands,
            'declarer': self.declarer,
            'contract': self.contract,
            'openlead': self.openlead,
            'result': self.result,
            'result2': self.result2,
            'ns_point': self.ns_point,
            'ew_point': self.ew_point,
            'point': self.point,
            'claim_result': self.claim_result,
            'ns_claim': self.ns_claim,
            'ew_claim': self.ew_claim,
            
            'auction': self.auction,
            'ns_win': self.ns_win,
            'ew_win': self.ew_win,
            'last_trick': self.last_trick,
            'current_trick': self.current_trick,
            'tricks': self.tricks,
            'player': self.player,
            'state': self.state,
            'table_player_ids':datas,
        }
    
    def message_post(self, method, args, info):
        message = {
            'id': self.id,
            'method': method, 
            'args': args,
            'info': info
        }
        print('message:::::::',message)
    
        for channel in self.table_id.channel_ids:
            #import pdb;pdb.set_trace()
            print('channel::::::::::::',channel.sudo().mail_channel_id)
            if channel.sudo().mail_channel_id.channel_type == 'og_game_board':
                rec = channel.sudo().message_post(subject = 'og.board', body = json.dumps(message)  )
                print(rec)

    @api.multi
    def bid(self, pos, call,agreement,notes):
        ret = super(Board, self).bid(pos, call,agreement,notes)
        if not ret:
            for rec in self:
                info = rec._get_info()
                rec.message_post('bid', [pos, call,agreement,notes], info)

        return ret

    @api.multi
    def play(self,pos,card):
        self.ensure_one()
        player = self.player
        ret = super(Board, self).play(pos, card)
        if not ret:
            info = self._get_info()
            self.message_post('play', [player, card], info)

        return ret

    @api.multi
    def claim(self,pos,num):
        ret = super(Board, self).claim(pos, num)
        if not ret:
            for rec in self:
                info = rec._get_info()
                rec.message_post('claim', [pos, num], info)

        return ret

    @api.multi
    def claim_ack(self,pos,ok):
        ret = super(Board, self).claim_ack(pos, ok)
        if not ret:
            for rec in self:
                info = rec._get_info()
                rec.message_post('claim_ack', [pos, ok], info)

        return ret

    @api.multi
    def undo(self):
        ret = super(Board, self).undo()
        if not ret:
            for rec in self:
                info = rec._get_info()
                rec.message_post('undo', [], info)
        
        return ret

class GameChannel(models.Model):
    _name = "og.channel"

    name = fields.Char(related='mail_channel_id.name')
    table_id = fields.Many2one('og.table')
    
    mail_channel_id = fields.Many2one('mail.channel')

    type = fields.Selection([('all',       'To All'),
                             ('spectator', 'To All Spectators'),
                             ('one',       'To One Spectator'),
                             ('player',    'To All Player'),
                             ('opps',      'To Opps'),
                             ('lho',       'To LHO'),
                             ('rho',       'To RHO'),

                             ], default='all')

    """
    def _transposition(self, body ):
        board_id = body['id']
        board = self.env['og.board'].browse(board_id)
        tp = board.table_id.table_player_ids.filtered(
            lambda tp: tp.partner_id == self.env.user.partner_id)
        my_pos = tp and tp.position or None
        info = body['info']
        uid = self.env.uid
        return body

    @api.multi
    def message_get(self, message_id ):
        msg = self.env['mail.message'].browse(message_id)
        subject = msg.subject
        body = msg.body
        if body[:3] == '<p>' and body[-4:] == '</p>':
            body = body[3:-4]

        #body = json.loads(body)
        #body = self._transposition(body)
        #uid = self.env.uid
        #return json.dumps(body)
        
        return {'subject':subject, 'body':body}
    """

    @api.multi
    @api.returns('self', lambda value: value.id)
    def message_post(self, body='', subject=None, message_type=None, subtype=None):
        if not message_type:
            message_type='comment'
            
        if not subtype:
            subtype='mail.mt_comment'
            
        self = self.sudo()
        return self.mail_channel_id.message_post(body=body, subject=subject,
                      message_type=message_type, subtype=subtype)


    @api.multi
    def unlink(self):
        for rec in self:
            rec.mail_channel_id.unlink()
        return super(GameChannel,self).unlink()

    #@api.returns('self')
    @api.model
    def create(self, vals):
    
        name = vals.get('name')
        table_id = vals.get('table_id')

        table = self.env['og.table'].browse(table_id)
        
        partner_ids = table.table_player_ids.mapped(
            'player_id').mapped('partner_id').ids
            
        channel_vals = {
            'name' : name,
            'public':'private',
            'channel_type': 'og_game_board',
            'channel_last_seen_partner_ids': [
                [ 0,0,{'partner_id':ptn}] for ptn in partner_ids ]
        }

        mail_channel = self.env['mail.channel'].create(channel_vals)
        
        vals = {
            'name' : name,
            'table_id' : table_id,
            'mail_channel_id': mail_channel.id }

        return super(GameChannel,self).create(vals)

class MailChannel(models.Model):
    """ Chat Session
        Reprensenting a conversation between users.
        It extends the base method for anonymous usage.
    """

    _inherit = 'mail.channel'
    channel_type = fields.Selection(selection_add=[('og_game_board', 'Game Board')])
