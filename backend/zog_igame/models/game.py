# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

import logging

_logger = logging.getLogger(__name__)

class Deal(models.Model):
    _inherit = "og.deal"
    schedule_id = fields.Many2one('og.schedule', string='Schedule')
    game_id = fields.Many2one('og.game', related='schedule_id.game_id')


class Game(models.Model):
    """
    """
    _name = "og.game"
    _description = "Ientelligent Game"
    _parent_store = True
    _order = 'parent_left'

    name = fields.Char('Name', required=True, index=True, copy=False, default='Game')
    date_game = fields.Datetime('Game Date', required=True, 
        index=True, copy=False, default=fields.Datetime.now,
        help="game date")

    game_type = fields.Selection([
        ('bridge','Bridge'),
        ('chess', 'Chess'),
        ('go','Go'),
        ('ddz','Doudizhu'),
    ], required=True, default='bridge'    )

    match_type = fields.Selection([('team', 'Team'),
                                   ('pair', 'Pair') ],default='team')

    org_type = fields.Selection([
        ('items',    'By Items'),  #  go or chess or bridge or ddz
        ('stages',   'By Stages'),
        ('groups',   'By Groups'),
        ('circle',   'Circle'),
        ('swiss',    'Swiss'), ],default='swiss')

    score_type = fields.Selection([ ('IMP','IMP'),
                                    ('MP', 'MP'), ], default='IMP')

    score_uom = fields.Selection([
        ('IMP','IMP'),
        ('MP', 'MP'),
        ('VP', 'VP'),
        ('BAM','BAM'),
    ], compute='_compute_score_uom',
    inverse='_inverse_score_uom', default='IMP')

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


    state = fields.Selection([
        ('draft', 'Draft'),
        ('conformed', 'Confirmed'),
        ('done', 'Locked'),
        ('cancel', 'Cancelled')
        ], string='Status', readonly=True, 
        index=True, copy=False, default='draft')

    notes = fields.Text('Notes')

    parent_id = fields.Many2one('og.game', string='Parent Game', index=True, 
        domain=['org_type','not in', ['swiss','circle']], ondelete='restrict')
    parent_left = fields.Integer(string='Left parent', index=True)
    parent_right = fields.Integer(string='Right parent', index=True)
    sequence = fields.Integer(default=10, help="Sequence of Children")
    child_ids = fields.One2many('og.game', 'parent_id', string='Child Game')

    phase_ids = fields.One2many('og.phase','game_id',string='Phases')
    
    schedule_ids = fields.One2many('og.schedule','game_id',string='Schedules')

    deal_ids = fields.Many2many('og.deal',string='Deals', compute = '_compute_deal')

    @api.multi
    def _compute_deal(self):
        for rec in self:
            rec.deal_ids = rec.schedule_ids.mapped('deal_ids')


class GamePhase(models.Model):
    _name = "og.phase"
    _description = "Game Phase"
    _order = 'sequence, name'

    name = fields.Char('Name', required=True )
    sequence = fields.Integer()
    game_id = fields.Many2one('og.game','Game', required=True, ondelete='cascade',
        domain=[('org_type','in', ['swiss','circle'])] )

class Schedule(models.Model):
    _name = "og.schedule"
    _description = "Schedule"
    _order = 'number'

    date_from = fields.Datetime('Date From', required=True, 
        index=True, copy=False, default=fields.Datetime.now )
        
    date_thru = fields.Datetime('Date Thru', required=True, 
        index=True, copy=False, default=fields.Datetime.now )

    _sql_constraints = [
        ('check_date', "CHECK( date_thru > date_from )",  'date_thru > date_from.'),
    ]

    game_id = fields.Many2one('og.game','Game', required=True, ondelete='cascade')
    name = fields.Char()
    number = fields.Integer('Number', default=1, required=True)

    deal_ids = fields.Many2many('og.deal',string='Deals', required=True, ondelete='restrict')

class GameRound(models.Model):
    _name = "og.round"
    _description = "Round"
    _order = 'sequence, name'

    phase_id = fields.Many2one('og.phase', string='Phase', required=True, ondelete='restrict')
    schedule_id = fields.Many2one('og.schedule', string='Schedule', required=True, ondelete='restrict')
    game_id = fields.Many2one('og.game', related='phase_id.game_id')

    date_from = fields.Datetime(related='schedule_id.date_from' )
    date_thru = fields.Datetime(related='schedule_id.date_thru' )

    name = fields.Char()
    sequence = fields.Integer()
    number = fields.Integer()

    deal_ids = fields.Many2many('og.deal',string='Deals', 
                                related='schedule_id.deal_ids')

