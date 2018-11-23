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

    opp_team_id = fields.Many2one('og.team', related='match_team_id.opp_team_id')

    imp     = fields.Integer(related='match_team_id.imp')
    imp_opp = fields.Integer(related='match_team_id.imp_opp')
    vp      = fields.Float(related='match_team_id.vp')
    vp_opp  = fields.Float(related='match_team_id.vp_opp')
    bam     = fields.Float(related='match_team_id.bam')
    bam_opp = fields.Float(related='match_team_id.bam_opp')

                                      
    match_id = fields.Many2one('og.match', string='Match',
        related='match_team_id.match_id', help='No used' )

    @api.multi
    def _compute_match(self):
        for rec in self:
            rec.match_team_id = rec.team_id.match_team_ids.filtered(
                     lambda mt: mt.match_id.round_id == rec.round_id )

    score = fields.Float(compute='_compute_score' )
    score_manual = fields.Float(default=0)
    score_uom = fields.Selection(related='phase_id.score_uom')
    
    score_open =  fields.Float( compute='_compute_balance' )
    score_close = fields.Float( compute='_compute_balance' )
    rank_open  = fields.Integer(compute='_compute_rank' )
    rank_close = fields.Integer(compute='_compute_rank' )
    
    @api.multi
    def _compute_score(self):
        def fn_team(rec):
            rec.score = rec.score_manual + {
                    'IMP':rec.imp,'MP':rec.bam,
                    'VP':rec.vp, 
                    
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

