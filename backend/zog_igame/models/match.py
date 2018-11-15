# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

class GameRound(models.Model):
    _inherit = "og.round"
    match_ids = fields.One2many('og.match','round_id')


class Match(models.Model):
    """
    A match with host and guest team for a phase
    """
    
    _name = "og.match"
    _description = "Match"
    _order = 'number'

    name = fields.Char('Name' )
    number = fields.Integer(default=1, help="if a stage of parent." )

    round_id = fields.Many2one('og.round', required=True, ondelete='restrict')
    phase_id = fields.Many2one('og.phase', related='round_id.phase_id')
    schedule_id = fields.Many2one('og.schedule', related='round_id.schedule_id')
    game_id =  fields.Many2one('og.game',  related='phase_id.game_id')
    deal_ids = fields.Many2many('og.deal', related='round_id.deal_ids')

    host_tri_id  = fields.Many2one('og.team.round.info',required=True, 
        compute='_compute_team', inverse='_inverse_team_host')
    guest_tri_id = fields.Many2one('og.team.round.info',required=True,
        compute='_compute_team', inverse='_inverse_team_guest')

    host_id  = fields.Many2one('og.team',related='host_tri_id.team_id')
    guest_id = fields.Many2one('og.team',related='guest_tri_id.team_id')

    date_from = fields.Datetime(related='round_id.date_from')
    date_thru = fields.Datetime(related='round_id.date_thru')

    match_team_ids = fields.One2many('og.match.team','match_id', help='Technical field')

    @api.multi
    def _compute_team(self):
        def fn(pos):
            return rec.match_team_ids.filtered(
                lambda s: s.position == pos).tri_id

        for rec in self:
            rec.host_tri_id  = fn('host')
            rec.guest_tri_id = fn('guest')

    @api.onchange('host_tri_id' )
    def _inverse_team_host(self):
        self._inverse_team('host')

    @api.onchange('guest_tri_id')
    def _inverse_team_guest(self):
        self._inverse_team('guest')

    def _inverse_team(self,pos):
        for rec in self:
            match_team = rec.match_team_ids.filtered(lambda s: s.position==pos)
            ptns = {'host': rec.host_tri_id, 'guest':rec.guest_tri_id }

            if match_team:
                match_team.tri_id = ptns[pos]
            else:
                vals = {'match_id':rec.id,
                        'position':pos,
                        'tri_id': ptns[pos].id }

                match_team.create(vals)

    line_ids = fields.One2many('og.match.line','match_id', help='all deals in this match')

    @api.model
    def create(self,vals):
        #should be set deal_ids in round before create match in round
        match = super(Match,self).create(vals)

        for deal in match.deal_ids:
            self.env['og.match.line'].create({'match_id': match.id, 'deal_id': deal.id})

        if not vals.get('name'):
            round = match.round_id
            name = round.game_id.name + ',' + str(round.number)
            name = name + ',' + match.host_id.name + ' vs ' + match.guest_id.name
            match.name = name
        
        return match


class MatchTeam(models.Model):
    """ Technical Model"""
    
    _name = "og.match.team"
    _description = "Match Team"
    _order = 'id desc'
    
    name = fields.Char(related='team_id.name')
    match_id = fields.Many2one('og.match', string='Match', ondelete='cascade')
    tri_id  = fields.Many2one('og.team.round.info', string='TeamRoundInfo', ondelete='restrict')
    team_id = fields.Many2one('og.team', related='tri_id.team_id')
    opp_team_id = fields.Many2one('og.team', compute='_compute_opp')
    position = fields.Selection([('host','Host'), ('guest','Guest')], default='host')

    _sql_constraints = [
        ('match_position_uniq', 'unique (position,match_id)', 'The match have host and guest team!')
    ]
    
    @api.multi
    def _compute_opp(self):
        for rec in self:
            rec.opp_team_id  = {'host': rec.match_id.guest_id,
                                'guest':rec.match_id.host_id }.get(rec.position)
    

class MatchLine(models.Model):
    """ 
    A match have some deals, readonly
    """
    
    _name = "og.match.line"
    _description = "Match Line"

    name = fields.Char('Name' )

    match_id = fields.Many2one('og.match', required=True, ondelete='cascade')
    deal_id = fields.Many2one('og.deal', required=True, ondelete='restrict')

    host_id  = fields.Many2one(related='match_id.host_id')
    guest_id = fields.Many2one(related='match_id.guest_id')

    _sql_constraints = [
        ('match_deal_uniq', 'unique (match_id,deal_id)', 'One deal played once time in a match!')
    ]

