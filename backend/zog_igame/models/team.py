# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

POSITIONS = [
        ('-',  'Neednot'),
        ('NS', 'NS'),
        ('EW', 'EW'),
        ('N', 'North'),
        ('E', 'East'),
        ('S', 'South'),
        ('W', 'West'),
    ]

class Game(models.Model):
    _inherit = "og.game"
    team_ids = fields.One2many('og.team', 'game_id', string='Teams')
    
class GamePhase(models.Model):
    _inherit = "og.phase"
    team_ids = fields.Many2many('og.team')

class GameRound(models.Model):
    _inherit = "og.round"
    team_info_ids = fields.One2many('og.team.round.info','round_id', string='Teams Info')


class GameTeam(models.Model):
    _name = "og.team"
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
    phase_ids = fields.Many2many('og.phase')

    player_ids = fields.One2many('og.team.player', 'team_id', string='Players')

    round_info_ids = fields.One2many('og.team.round.info', 'team_id', string='Rounds Info')


class GameTeamPlayer(models.Model):
    _name = "og.team.player"
    _description = "Team Player"
    _order = 'id desc'

    _inherits = {'res.partner': 'partner_id'}

    team_id = fields.Many2one('og.team', string='Team', required=True, ondelete='cascade')
    partner_id = fields.Many2one('res.partner', string='Partner', required=True, 
        ondelete='restrict', domain=[['is_company','!=',True]])

    role = fields.Selection([
        ('coach',      'Coach'),
        ('leader',  'Leader'),
        ('player',     'Player')
    ], string='Role', default='player')


class GameTeamRoundInfo(models.Model):
    _name = "og.team.round.info"
    _description = "Team Round Infomation"

    name = fields.Char()
    round_id = fields.Many2one('og.round', string='Round', required=True, ondelete='cascade')
    team_id = fields.Many2one('og.team', string='Team', required=True, ondelete='restrict')

    game_id = fields.Many2one('og.game', related='team_id.game_id')
    phase_id = fields.Many2one('og.phase', related='round_id.phase_id')

    number = fields.Integer('Number', default=1)
    sequence = fields.Integer('Sequence', default=1)

