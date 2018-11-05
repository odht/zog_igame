# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

from .tools import point2imp


class GameTeam(models.Model):
    _inherit = "og.team"

    match_team_ids = fields.One2many('og.match.team','team_id', help='Technical field')
    rank = fields.Integer(help='Game rank')

class GameTeamRoundInfo(models.Model):
    """
    team score in a phase == team score in the last round of the phase
    """
    
    _inherit = "og.team.round.info"

    match_team_id = fields.Many2one('og.match.team', string='Match Team',
        compute='_compute_match', help='Technical field for score')
                                      
    match_id = fields.Many2one('og.match', string='Match',
        related='match_team_id.match_id', help='No used' )

    @api.multi
    def _compute_match(self):
        for rec in self:
            rec.match_team_id = rec.team_id.match_team_ids.filtered(
                     lambda mt: mt.match_id.round_id == rec.round_id )

    score = fields.Float(compute='_compute_score',store=True, readonly=True)
    score_manual = fields.Float(default=0)
    score_uom = fields.Selection(related='phase_id.score_uom')
    
    score_open =  fields.Float( compute='_compute_balance',store=True, readonly=True)
    score_close = fields.Float( compute='_compute_balance',store=True, readonly=True)
    rank_open  = fields.Integer(compute='_compute_rank',store=True, readonly=True)
    rank_close = fields.Integer(compute='_compute_rank',store=True, readonly=True)
    
    @api.multi
    @api.depends('match_team_id.vp','match_team_id.bam','score_manual')
    def _compute_score(self):
        def fn_team(rec):
            p = rec.match_team_id
            rec.score = rec.score_manual + {'IMP':p.vp,'MP':p.bam
                                        }[rec.phase_id.score_type]

        def fn_pair(rec):
            """ 
            board_ids = rec.game_id.table_ids.mapped('board_ids').filtered(
                lambda b: b.deal_id == rec.deal_id and b != rec.board_id )

            def f_mp(b):
                diff = rec.board_id.point - b.point
                return diff != 0 and (diff>0 and 1 or -1) or 0

            def fn_mp(bs):
                return sum( [f_mp(b) for b in bs] ) / len(bs.ids) / 2 + 0.5

            def f_imp(b):
                diff = rec.board_id.point - b.point
                return point2imp(diff)

            def fn_imp(bs):
                return sum( [f_imp(b) for b in bs] ) / len(bs.ids)

            if board_ids:
                st = rec.game_id.score_type
                rec.score = {'IMP':fn_imp,'MP':fn_mp}[st](board_ids)
            """
            pass


        for rec in self:
            g = rec.phase_id
            if g.game_type == 'bridge':
                if g.match_type == 'team' :
                    if g.org_type in ['swiss','circle']:
                        fn_team(rec)
                    else:
                        pass # how to sum score
                elif g.match_type == 'pair':
                    fn_pair(rec)

    @api.multi
    def _compute_balance(self):
        
        for rec in self:
            tris = rec.team_id.round_info_ids.filtered(
                lambda tri: (tri.phase_id == rec.phase_id) and (
                             tri.round_id.number < rec.round_id.number ) )
            
            rec.score_open  = tris and sum( tris.mapped('score') ) or 0
            rec.score_close = rec.score_open + rec.score

    @api.multi
    def _compute_rank(self):
        for rec in self:
            pass

