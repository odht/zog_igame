# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

import logging

_logger = logging.getLogger(__name__)

class Deal(models.Model):
    _inherit = "og.deal"
    schedule_id = fields.Many2one('og.schedule', string='Schedule Created by', 
        help='the deal is created by this schedule')

    schedule_ids = fields.Many2many('og.schedule', string='Schedules played in', 
        help='the deal is played in these schedules')
        
    game_ids = fields.Many2many('og.game', compute='_compute_game')
    
    @api.multi
    def _compute_game(self):
        for rec in self:
            rec.game_ids = rec.schedule_ids.mapped('game_id')


class Game(models.Model):
    """
    A game is BIG game with many small phase game.
    """
    _name = "og.game"
    _description = "Ientelligent Game"
    
    """
    #_parent_store = True
    #_order = 'parent_left'
    parent_id = fields.Many2one('og.game', string='Parent Game', index=True, 
        domain=['org_type','not in', ['swiss','circle']], ondelete='restrict')
    parent_left = fields.Integer(string='Left parent', index=True)
    parent_right = fields.Integer(string='Right parent', index=True)
    sequence = fields.Integer(default=10, help="Sequence of Children")
    child_ids = fields.One2many('og.game', 'parent_id', string='Child Game')
    
    """

    name = fields.Char('Name', required=True, index=True, copy=False, default='Game')
    date_from = fields.Date('Date From', required=True, default=fields.Date.today )
    date_thru = fields.Date('Date Thru', required=True, default=fields.Date.today )

    game_type = fields.Selection([('bridge','Bridge')], required=True, default='bridge')
    match_type = fields.Selection([('team', 'Team'), ('pair', 'Pair') ],default='team')
    org_type = fields.Selection([('circle','Circle'), ('swiss','Swiss')],default='swiss')

    score_type = fields.Selection([('IMP','IMP'),('MP', 'MP')], default='IMP',
        help='For Team match, IMP:VP, MP:BAM')

    score_uom = fields.Selection([('IMP','IMP'), ('MP', 'MP'), 
                                  ('VP', 'VP'),  ('BAM','BAM')], 
                compute='_compute_score_uom', 
                inverse='_inverse_score_uom', default='IMP',
                help='( VP,BAM) for team match, IMP,MP for pair match')

    @api.multi
    def _inverse_score_uom(self):
        ds = {'IMP':'IMP','MP': 'MP', 'VP': 'IMP','BAM':'MP'}
        for rec in self:
            rec.score_type = ds[rec.score_uom]

    @api.multi
    def _compute_score_uom(self):
        fns = {
            'team': lambda t: {'IMP': 'VP','MP':'BAM'}[t],
            'pair': lambda t: t
        }

        for record in self:
            record.score_uom = fns[record.match_type](record.score_type)

    #TBD, no used now
    state = fields.Selection([ ('draft', 'Draft'), ('conformed', 'Confirmed'),
                               ('done', 'Locked'), ('cancel', 'Cancelled')], 
        string='Status', readonly=True, index=True, copy=False, default='draft',
        help='TBD' )

    notes = fields.Text('Notes')
    
    phase_ids = fields.One2many('og.phase','game_id',string='Phases')
    schedule_ids = fields.One2many('og.schedule','game_id',string='Schedules')
    round_ids = fields.One2many('og.round','game_id',string='Rounds')
    deal_ids = fields.Many2many('og.deal',string='Deals', compute = '_compute_deal')

    @api.multi
    def _compute_deal(self):
        for rec in self:
            rec.deal_ids = rec.schedule_ids.mapped('deal_ids')


class GamePhase(models.Model):
    """
    A phase is a small game with some teams, all teams are ranked in this phase
    """
    _name = "og.phase"
    _description = "Game Phase"
    _order = 'sequence, name'

    name = fields.Char('Name', required=True )
    number = fields.Integer(help="The sorted number for the phase in a game.") 
    sequence = fields.Integer(help="no used")
    game_id = fields.Many2one('og.game','Game', required=True, ondelete='cascade')
    round_ids = fields.One2many('og.round','phase_id',string='Rounds' )


class Schedule(models.Model):
    """
    All schedules in a game is sort by clock.  
    """
    _name = "og.schedule"
    _description = "Schedule"
    _order = 'number'

    game_id = fields.Many2one('og.game','Game', required=True, ondelete='cascade')
    name = fields.Char()
    number = fields.Integer('Number', default=1, required=True, 
        help='the sorted number for the schedule in a game')
        
    date_from = fields.Datetime('Date From', required=True, default=fields.Datetime.now )
    date_thru = fields.Datetime('Date Thru', required=True, default=fields.Datetime.now )

    round_ids = fields.One2many('og.round','phase_id',string='Rounds' )
    deal_ids = fields.Many2many('og.deal',string='Deals')

    _sql_constraints = [
        ('check_date', "CHECK( date_thru > date_from )",  'date_thru > date_from.'),
    ]


class GameRound(models.Model):
    """
    A phase have some rounds. A round is scheduled in a schedule.
    """
    _name = "og.round"
    _description = "Round"
    _order = 'sequence, name'

    phase_id = fields.Many2one('og.phase', string='Phase', required=True, ondelete='restrict')
    schedule_id = fields.Many2one('og.schedule', string='Schedule', required=True, ondelete='restrict')
    game_id = fields.Many2one('og.game', related='phase_id.game_id')
    
    last_in_phase = fields.Boolean(help='last round in a phase')

    date_from = fields.Datetime(related='schedule_id.date_from' )
    date_thru = fields.Datetime(related='schedule_id.date_thru' )

    name = fields.Char()
    number = fields.Integer(help='the sorted number in the phase')
    sequence = fields.Integer(help='the sorted number in the schedule')

    deal_ids = fields.Many2many('og.deal',string='Deals', related='schedule_id.deal_ids')

    _sql_constraints = [
        ('number_phase_uniq', 'unique (phase_id,number)', 'The round number is unique in a phase!'),
    ]
