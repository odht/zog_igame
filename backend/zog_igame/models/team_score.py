# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

from .tools import point2imp


class GameTeam(models.Model):
    _inherit = "og.team"

    match_team_ids = fields.One2many('og.match.team','team_id')

    score = fields.Float(compute='_compute_score' )
    score_manual = fields.Float(default=0 )
    score_uom = fields.Selection(related='game_id.score_uom')
    
    #TBD rank 2018-10-23
    #rank = fields.Integer()


    @api.multi
    def _compute_score(self):
        for rec in self:
            rec.score = rec.score_manual + sum( rec.round_info_ids.mapped('score') )


class GameTeamRoundInfo(models.Model):
    _inherit = "og.team.round.info"

    match_team_id = fields.Many2one('og.match.team',
                  string='Match Team', compute='_compute_match' )
                                      
    match_id = fields.Many2one('og.match', 
                  string='Match', related='match_team_id.match_id' )

    score = fields.Float(compute='_compute_score')
    score_manual = fields.Float(default=0)
    score_uom = fields.Selection(related='team_id.score_uom')
    #rank = fields.Integer()
    
    @api.multi
    def _compute_match(self):
        for rec in self:
            rec.match_team_id = rec.team_id.match_team_ids.filtered(
                     lambda mt: mt.match_id.round_id == rec.round_id )

    @api.multi
    def _compute_score(self):
        def fn_team(rec):
            #p = rec.match_id.match_team_ids.filtered(
            #        lambda s: s.team_id == rec.team_id )
            p = rec.match_team_id
                    
            rec.score = rec.score_manual + {'IMP':p.vp,'MP':p.bam
                                        }[rec.game_id.score_type]

        def fn_pair(rec):
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


        for rec in self:
            g = rec.game_id
            if g.game_type == 'bridge':
                if g.match_type == 'team' :
                    if g.org_type in ['swiss','circle']:
                        fn_team(rec)
                    else:
                        pass # how to sum score
                elif g.match_type == 'pair':
                    fn_pair(rec)


