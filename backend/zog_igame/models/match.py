# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

from .tools import point2imp, imp2vp

class Match(models.Model):
    _name = "og.match"
    _description = "Match"
    _order = 'number'

    name = fields.Char('Name' )
    number = fields.Integer(default=1, help="if a stage of parent." )

    round_id = fields.Many2one('og.game.round', string='Round',required=True, ondelete='restrict')
    
    
    game_id = fields.Many2one('og.game', related='round_id.game_id')
    deal_ids = fields.Many2many('og.deal',string='Deals', 
                                related='round_id.deal_ids')

    date_from = fields.Datetime(related='round_id.date_from')
    date_thru = fields.Datetime(related='round_id.date_thru')

    group_id = fields.Many2one('og.game.group', required=True, ondelete='restrict')

    host_id  = fields.Many2one('og.game.team',required=True, 
        compute='_compute_team', inverse='_inverse_team_host')
    guest_id = fields.Many2one('og.game.team',required=True,
        compute='_compute_team', inverse='_inverse_team_guest')

    match_team_ids = fields.One2many('og.match.team','match_id')

    @api.multi
    def _compute_team(self):
        def fn(pos):
            return rec.match_team_ids.filtered(
                lambda s: s.position == pos).team_id

        for rec in self:
            rec.host_id  = fn('host')
            rec.guest_id = fn('guest')

    @api.onchange('host_id', 'guest_id')
    def _inverse_team_host(self):
        self._inverse_team('host')

    @api.onchange('host_id', 'guest_id')
    def _inverse_team_guest(self):
        self._inverse_team('guest')

    def _inverse_team(self,pos):
        for rec in self:
            match_team = rec.match_team_ids.filtered(lambda s: s.position==pos)

            ptns = {'host': rec.host_id,
                    'guest':rec.guest_id }

            if match_team:
                match_team.team_id = ptns[pos]
            else:
                vals = {'match_id':rec.id,
                        'position':pos,
                        'team_id': ptns[pos].id }

                match_team.create(vals)

    open_table_id  = fields.Many2one('og.table', compute='_compute_table' )
    close_table_id = fields.Many2one('og.table', compute='_compute_table' )

    table_ids = fields.One2many('og.table','match_id')

    @api.multi
    def _compute_table(self):
        def fn(room):
            return rec.table_ids.filtered(lambda s: s.room_type == room)

        for rec in self:
            rec.open_table_id  = fn('open')
            rec.close_table_id = fn('close')

    line_ids = fields.One2many('og.match.line','match_id')

    deal_count = fields.Integer(compute='_compute_imp',help='used for IMP 2 VP')

    bam = fields.Integer(compute='_compute_imp')
    host_bam  = fields.Integer(compute='_compute_imp')
    guest_bam = fields.Integer(compute='_compute_imp')

    imp = fields.Integer(compute='_compute_imp')
    imp_manual = fields.Integer(default=0)
    host_imp  = fields.Integer(compute='_compute_imp')
    guest_imp = fields.Integer(compute='_compute_imp')

    vp = fields.Float(compute='_compute_imp')
    vp_manual = fields.Float()

    host_vp  = fields.Float(compute='_compute_imp')
    guest_vp = fields.Float(compute='_compute_imp')

    @api.multi
    def _compute_imp(self):
        for rec in self:
            bam = sum(rec.line_ids.mapped('bam') )
            rec.bam = bam
            rec.host_bam  = bam
            rec.guest_bam = -bam

            imp = sum(rec.line_ids.mapped('imp') )
            host_imp = sum(rec.line_ids.mapped('host_imp') )
            guest_imp = sum(rec.line_ids.mapped('guest_imp') )
            
            impm = rec.imp_manual
            imp = imp + impm
            rec.imp = imp 
            rec.host_imp  = host_imp + (impm>0 and impm or 0)
            rec.guest_imp = guest_imp + (impm<0 and -impm or 0)
            #rec.deal_count = len(rec.line_ids)
            rec.deal_count = len(rec.deal_ids)
            vp = imp2vp(imp, rec.deal_count)
            vp = vp + rec.vp_manual
            vp = (vp>20) and 20 or vp
            vp = (vp<-20) and -20 or vp
            
            rec.vp = vp
            rec.host_vp  = vp
            rec.guest_vp  = 20 - vp

    @api.model
    def create(self,vals):
        """ should be set deal_ids in round before create match in round """
        match = super(Match,self).create(vals)

        for deal in match.deal_ids:
            self.env['og.match.line'].create({'match_id': match.id, 'deal_id': deal.id})

        if not vals.get('name'):
            round = match.round_id
            name = round.game_id.name + ',' + str(round.number)
            name = name + ',' + match.host_id.name + ' vs ' + match.guest_id.name
            match.name = name

        def set_tri(pos):
            tri_obj = self.env['og.game.team.round.info']
            tri_obj.create({'round_id': match.round_id.id, 
                            'team_id' : {'host': match.host_id,
                                         'guest': match.guest_id
                                        }[pos].id,
                            'match_id': match.id,
                            'position': pos  })

        set_tri('host')
        set_tri('guest')
        
        return match



class MatchTeam(models.Model):
    _name = "og.match.team"
    _description = "Match Team"
    _order = 'id desc'
    
    name = fields.Char(related='team_id.name')
    match_id = fields.Many2one('og.match', string='Match', ondelete='cascade')
    team_id = fields.Many2one('og.game.team', string='Team', ondelete='restrict')
    position = fields.Selection([
        ('host','Host'),
        ('guest','Guest')], string='Position', default='host')

    vp = fields.Float(compute='_compute_score')
    bam = fields.Float(compute='_compute_score')

    @api.multi
    def _compute_score(self):
        def _fn(pos,match):
            return {'host': lambda m: (m.host_vp, m.host_bam),
                    'guest':lambda m: (m.guest_vp,m.guest_bam) }[pos](match)

        for rec in self:
            rec.vp,rec.bam =  _fn(rec.position,rec.match_id)

class MatchLine(models.Model):
    _name = "og.match.line"
    _description = "Match Line"

    name = fields.Char('Name' )

    match_id = fields.Many2one('og.match', required=True, ondelete='cascade')
    deal_id = fields.Many2one('og.deal', required=True, ondelete='restrict')

    host_id  = fields.Many2one(related='match_id.host_id')
    guest_id = fields.Many2one(related='match_id.guest_id')

    open_table_id  = fields.Many2one(related='match_id.open_table_id')
    close_table_id = fields.Many2one(related='match_id.close_table_id')

    open_board_id = fields.Many2one('og.board',compute='_compute_board')
    close_board_id = fields.Many2one('og.board',compute='_compute_board')

    @api.multi
    def _compute_board(self):
        def _fn(tbl,deal):
            return tbl.board_ids.filtered(lambda b: b.deal_id == deal)

        for rec in self:
            rec.open_board_id  = _fn(rec.open_table_id, rec.deal_id)
            rec.close_board_id = _fn(rec.close_table_id, rec.deal_id)

    open_declarer = fields.Selection(related='open_board_id.declarer')
    open_contract = fields.Selection(related='open_board_id.contract')
    open_result   = fields.Integer(  related='open_board_id.result')
    open_result2  = fields.Char(     related='open_board_id.result2')
    open_point    = fields.Integer(  related='open_board_id.point')
    open_ns_point = fields.Integer(  related='open_board_id.ns_point')
    open_ew_point = fields.Integer(  related='open_board_id.ew_point')

    close_declarer = fields.Selection(related='close_board_id.declarer')
    close_contract = fields.Selection(related='close_board_id.contract')
    close_result   = fields.Integer(  related='close_board_id.result')
    close_result2  = fields.Char(     related='close_board_id.result2')
    close_point    = fields.Integer(  related='close_board_id.point')
    close_ns_point = fields.Integer(  related='close_board_id.ns_point')
    close_ew_point = fields.Integer(  related='close_board_id.ew_point')

    point = fields.Integer(compute='_compute_point')
    host_point =  fields.Integer(compute='_compute_point')
    guest_point = fields.Integer(compute='_compute_point')

    bam = fields.Integer(compute='_compute_point')
    host_bam =  fields.Integer(compute='_compute_point')
    guest_bam = fields.Integer(compute='_compute_point')

    imp = fields.Integer(compute='_compute_point')
    host_imp  = fields.Integer(compute='_compute_point')
    guest_imp = fields.Integer(compute='_compute_point')

    @api.multi
    def _compute_point(self):
        for rec in self:
            point = rec.open_board_id.point - rec.close_board_id.point
            rec.point = point
            rec.host_point  = point>0 and point or 0
            rec.guest_point = point<0 and point or 0

            bam = point != 0 and (point>0 and 1 or -1 ) or 0
            rec.bam = bam
            rec.host_bam = bam
            rec.guest_bam = -bam

            imp = point2imp(point)
            rec.imp = imp
            rec.host_imp  = imp>0 and imp or 0
            rec.guest_imp = imp<0 and -imp or 0

