# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models
import json

import logging
_logger = logging.getLogger(__name__)

class Board(models.Model):
    _inherit = "og.board"
    
    def _get_info(self):
        return {
            'id': self.id,
            'number':self.number,
            'vulnerable':self.vulnerable,
            'dealer':self.dealer,
            'hands': self.hands,
            'declarer': rec.declarer,
            'contract': rec.contract,
            'openlead': rec.openlead,
            'result': rec.result,
            'ns_point': rec.ns_point,
            'ew_point': rec.ew_point,
            
            'auction': rec.auction,
            'ns_win': rec.ns_win,
            'ew_win': rec.ew_win,
            'last_trick': rec.last_trick,
            'current_trick': rec.current_trick,
            'tricks': rec.tricks,

            'player': rec.player,
            'state': rec.state,
        }
    
    def message_post(self, method, args, info):
        message = {
            'id': self.id,
            'method': method, 
            'args': args,
            'info': info
        }
    
        for channel in self.table_id.channel_ids:
            channel.message_post(subject = method,
                body = json.dumps(body) )

    @api.multi
    def bid(self, pos, call):
        ret = super(Board, self).bid(pos, call)
        if not ret:
            for rec in self:
                info = rec._get_info()
                rec.message_post('bid', [pos, call], info)

        return ret

    @api.multi
    def play(self,pos,card):
        ret = super(Board, self).play(pos, card)
        if not ret:
            for rec in self:
                info = rec._get_info()
                rec.message_post('play', [pos, card], info)

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
    def claim_ok(self,pos,ok):
        ret = super(Board, self).claim_ok(pos, ok)
        if not ret:
            for rec in self:
                info = rec._get_info()
                rec.message_post('claim_ok', [pos, ok], info)

        return ret

    @api.multi
    def undo(self):
        ret = super(Board, self).undo()
        if not ret:
            for rec in self:
                info = rec._get_info()
                rec.message_post('undo', [], info)
        
        return ret

class Table(models.Model):
    _inherit = "og.table"
    channel_ids = fields.One2many('og.channel','table_id')
    

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
        #subject = msg.subject
        body = msg.body
        if body[:3] == '<p>' and body[-4:] == '</p>':
            body = body[3:-4]

        body = json.loads(body)
        body = self._transposition(body)
        
        uid = self.env.uid
        
        body = {'uid':uid, 'board': body}

        return json.dumps(body)

    @api.multi
    @api.returns('self', lambda value: value.id)
    def message_post(self, body='', subject=None ):
        self = self.sudo()
        return self.mail_channel_id.message_post(body=body, subject=subject,
                      message_type='comment', subtype='mail.mt_comment')


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
            'channel_last_seen_partner_ids': [
                [ 0,0,{'partner_id':ptn}] for ptn in partner_ids ]
        }

        mail_channel = self.env['mail.channel'].create(channel_vals)
        
        vals = {
            'name' : name,
            'table_id' : table_id,
            'mail_channel_id': mail_channel.id }

        return super(GameChannel,self).create(vals)

