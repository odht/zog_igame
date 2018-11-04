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
    team_ids = fields.One2many('og.team', 'game_id', string='Teams',
        help='all teams regitered in this game.')
    
class GamePhase(models.Model):
    _inherit = "og.phase"
    team_ids = fields.Many2many('og.team', help='all teams assigned in this phase.')

class GameRound(models.Model):
    _inherit = "og.round"
    team_info_ids = fields.One2many('og.team.round.info','round_id',
        string='Teams Info', help='all teams score in this round.')

class GameTeam(models.Model):
    """
    A team inherit from a partner.
    A team have some players.
    A team register in a game.
    A team assigned to some phase.
    A team play in same round, every round score in round info.
    """
    
    _name = "og.team"
    _description = "Game Team"
    _order = 'id desc'
    _inherits = {'res.partner': 'partner_id'}
    
    # name field inherit from res.partner
    #name = fields.Char()

    partner_id = fields.Many2one('res.partner', required=True, ondelete='cascade')
    game_id = fields.Many2one('og.game', string='Game', ondelete='cascade')
    phase_ids = fields.Many2many('og.phase')
    player_ids = fields.One2many('og.team.player', 'team_id', string='Players')
    round_info_ids = fields.One2many('og.team.round.info', 'team_id', string='Rounds Info')

    _sql_constraints = [
        ('name_game_uniq', 'unique (name,game_id)', 'The team name is unique in a game!')
    ]
    
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


class GameTeamPlayer(models.Model):
    _name = "og.team.player"
    _description = "Team Player"
    _order = 'id desc'

    _inherits = {'res.partner': 'partner_id'}

    # name and user_ids field inherit from res.partner
    #name = fields.Char()
    #user_ids = fields.One2many()

    team_id = fields.Many2one('og.team', string='Team', required=True, ondelete='cascade')
    partner_id = fields.Many2one('res.partner', string='Partner', required=True, 
        ondelete='restrict', domain=[['is_company','!=',True]])

    default_user_id = fields.Many2one('res.users')

    role = fields.Selection([
        ('coach',      'Coach'),
        ('leader',  'Leader'),
        ('player',     'Player')
    ], string='Role', default='player')

    @api.model
    def create(self,vals):
        default_user_id = vals.get('default_user_id')
        if not default_user_id:
            partner_id = vals.get('partner_id')
            if partner_id:
                partner = self.partner_id.browse(partner_id)
                if partner.user_ids:
                    vals['default_user_id'] = partner.user_ids[0]
        
        return super(GameTeamPlayer,self).create(vals)


    """ 
    @api.multi
    def _check_player_in_one_team(self):
        for rec in self:
            if not rec.team_id.game_id:
                continue
            
            players = rec.team_id.game_id.team_ids.mapped('player_ids').filtered(
                lambda plr: plr.partner_id == rec.partner_id)
            players = players.filtered( lambda plr: plr != rec)
            
            if players:
                return False
                
        return True

    _constraints = [
        (_check_player_in_one_team, 'Player in one team', []),
    ]
    """

class GameTeamRoundInfo(models.Model):
    """
    the relation for team and round.
    """
    
    _name = "og.team.round.info"
    _description = "Team Round Infomation"

    name = fields.Char()
    round_id = fields.Many2one('og.round', string='Round', required=True, ondelete='cascade')
    team_id = fields.Many2one('og.team', string='Team', required=True, ondelete='restrict')

    game_id = fields.Many2one('og.game', related='team_id.game_id')
    phase_id = fields.Many2one('og.phase', related='round_id.phase_id')

    last_in_phase = fields.Boolean(related='round_id.last_in_phase')

    number = fields.Integer('Number', default=1)
    sequence = fields.Integer('Sequence', default=1)

    _sql_constraints = [
        ('round_team_uniq', 'unique (round_id,team_id)', 'The team is unique in a round!'),
    ]
