# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

from .tools import point2imp

POSITIONS = [
        ('-',  'Neednot'),
        ('NS', 'NS'),
        ('EW', 'EW'),
        ('N', 'North'),
        ('E', 'East'),
        ('S', 'South'),
        ('W', 'West'),
    ]

class GameTeam(models.Model):
    _name = "og.game.team"
    _description = "Game Team"
    _order = 'id desc'
    _inherits = {'res.partner': 'partner_id'}

    @api.model
    def create(self,vals):
        vals['is_company'] = True
        return super(GameTeam,self).create(vals)

    @api.multi
    def unlink(self):
        ptn = self.mapped('partner_id')
        ret = super(GameTeam,self).unlink()
        ptn.unlink()
        return ret

    partner_id = fields.Many2one('res.partner', required=True, ondelete='cascade')

    game_id = fields.Many2one('og.game', string='Game', ondelete='cascade')
    group_id = fields.Many2one('og.game.group')
    number = fields.Integer('Number', default=1)

    score = fields.Float(compute='_compute_score' )
    score_manual = fields.Float(default=0 )
    score_uom = fields.Selection(related='game_id.score_uom')
    
    #TBD rank 2018-10-23
    #rank = fields.Integer()
    #ns_rank = fields.Integer()
    #ew_rank = fields.Integer()

    player_ids = fields.One2many('og.game.team.player', 'team_id', string='Players')
    roundinfo_ids = fields.One2many('og.game.team.round.info', 'team_id', string='Rounds Info')

    @api.multi
    def _compute_score(self):
        for rec in self:
            rec.score = rec.score_manual + sum( rec.roundinfo_ids.mapped('score') )


class GameTeamPlayer(models.Model):
    _name = "og.game.team.player"
    _description = "Game Team Player"
    _order = 'id desc'

    _inherits = {'res.partner': 'partner_id'}

    team_id = fields.Many2one('og.game.team', string='Team', required=True, ondelete='cascade')
    partner_id = fields.Many2one('res.partner', string='Partner', required=True, 
        ondelete='restrict', domain=[['is_company','!=',True]])

    role = fields.Selection([
        ('coach',      'Coach'),
        ('leader',  'Leader'),
        ('player',     'Player')
    ], string='Role', default='player')


class GameTeamRoundInfo(models.Model):
    _name = "og.game.team.round.info"
    _description = "Team Round Infomation"


    name = fields.Char()
    team_id = fields.Many2one('og.game.team', string='Team', required=True, ondelete='restrict')
    game_id = fields.Many2one('og.game', related='team_id.game_id')

    #For Team Match
    group_id = fields.Many2one('og.game.group', related='team_id.group_id')
    round_id = fields.Many2one('og.game.round', string='Round', required=True, ondelete='restrict')
    match_id = fields.Many2one('og.match', string='Match', ondelete='cascade')

    #For Pair Match
    #position = fields.Selection(related='team_id.position')
    #table_id = fields.Many2one('og.table')
    #deal_id = fields.Many2one('og.deal')
    #board_id = fields.Many2one('og.board',compute='_compute_board')
    #@api.multi
    #def _compute_board(self):
    #    for rec in self:
    #        rec.board_id = rec.table_id.board_ids.filtered(
    #            lambda b: b.deal_id == rec.deal_id )

    score = fields.Float(compute='_compute_score')
    score_manual = fields.Float(default=0)
    score_uom = fields.Selection(related='team_id.score_uom')
    #rank = fields.Integer()
    #ns_rank = fields.Integer()
    #ew_rank = fields.Integer()

    @api.multi
    def _compute_score(self):
        def fn_team(rec):
            p = rec.match_id.match_team_ids.filtered(
                    lambda s: s.team_id == rec.team_id )
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

