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


class Table(models.Model):
    _name = "og.table"
    _description = "Table"
    _order = 'match_id,room_type, number'

    """ 
    @api.model
    def create(self,vals):
        table = super(Table,self).create(vals)
        if not vals.get('name'):
            table.name = table.room_type + ',' + table.match_id.name

        return table
    """

    _sql_constraints = [
        ('match_open_close_uniq', 'unique (room_type,match_id)', 'The match have one open table and one close table !')
    ]
    
    name = fields.Char('Name', compute='_compute_name' )
    
    @api.multi
    def _compute_name(self):
        for rec in self:
            rec.name = rec.room_type + ',' + str(rec.match_id.number) + ',' + rec.match_id.name
    
    
    number = fields.Integer(default=1 )
    room_type = fields.Selection([('open','Open' ), ('close','Close')], default='open')

    match_id = fields.Many2one('og.match', string='Match', ondelete='restrict')
    round_id = fields.Many2one('og.round', related='match_id.round_id')
    schedule_id = fields.Many2one('og.schedule', related='round_id.schedule_id')
    phase_id = fields.Many2one('og.phase', related='round_id.phase_id')
    game_id = fields.Many2one('og.game', related='phase_id.game_id')

    schedule_number = fields.Integer( string='Schedule Number', related='schedule_id.number' )

    date_from = fields.Datetime(related='round_id.date_from')
    date_thru = fields.Datetime(related='round_id.date_thru')

    deal_ids  = fields.Many2many('og.deal', string='Deals', related='round_id.deal_ids' )

    ns_team_id = fields.Many2one('og.team', compute='_compute_team')
    ew_team_id = fields.Many2one('og.team', compute='_compute_team')

    @api.multi
    def _compute_team(self):
        for rec in self:
            teams = {'open.NS' : rec.match_id.host_id,
                     'open.EW' : rec.match_id.guest_id,
                     'close.NS': rec.match_id.guest_id,
                     'close.EW': rec.match_id.host_id,
                     }
            
            rec.ns_team_id = teams[rec.room_type + '.NS' ]
            rec.ew_team_id = teams[rec.room_type + '.EW' ]

    # pair game
    ns_pair_id = fields.Many2one('og.team')
    ew_pair_id = fields.Many2one('og.team')


    # 4 player in table
    east_id = fields.Many2one('og.team.player', compute='_compute_player'
        #, inverse='_inverse_player_east'
        )
    west_id = fields.Many2one('og.team.player', compute='_compute_player'
        #, inverse='_inverse_player_west'
        )
    north_id = fields.Many2one('og.team.player', compute='_compute_player'
        #, inverse='_inverse_player_north'
        )
    south_id = fields.Many2one('og.team.player', compute='_compute_player'
        #, inverse='_inverse_player_south'
        )
                
    table_player_ids = fields.One2many('og.table.player','table_id',help='Technical field')
    player_ids = fields.Many2many('og.team.player', compute='_compute_player')

    @api.multi
    def _compute_player(self):
        def _get(pos):
            return rec.table_player_ids.filtered(lambda p: p.position in pos ).player_id

        for rec in self:
            rec.east_id  = _get('E')
            rec.west_id  = _get('W')
            rec.north_id = _get('N')
            rec.south_id = _get('S')
            rec.player_ids = rec.table_player_ids.mapped('player_id')

    """ 
    @api.onchange('east_id', 'west_id', 'north_id', 'south_id')
    def _inverse_player_east(self):
        self._inverse_player('E')

    @api.onchange('east_id', 'west_id', 'north_id', 'south_id')
    def _inverse_player_west(self):
        self._inverse_player('W')

    @api.onchange('east_id', 'west_id', 'north_id', 'south_id')
    def _inverse_player_north(self):
        self._inverse_player('N')

    @api.onchange('east_id', 'west_id', 'north_id', 'south_id')
    def _inverse_player_south(self):
        self._inverse_player('S')

    def _inverse_player(self,pos):
        for rec in self:
            table_player = rec.table_player_ids.filtered(lambda s: s.position==pos)

            ptns = {'N': rec.north_id,
                    'E': rec.east_id,
                    'S': rec.south_id,
                    'W': rec.west_id}

            if table_player:
                table_player.player_id = ptns[pos]
            elif ptns[pos]:
                vals = {'table_id':rec.id,
                        'position':pos,
                        'player_id': ptns[pos].id }

                table_player.create(vals)

    """

class TablePlayer(models.Model):
    """
    Technical model
    """
    _name = "og.table.player"
    _description = "Table Player"

    name = fields.Char('Name', related = 'player_id.name' )

    table_id = fields.Many2one('og.table', ondelete='cascade')
    player_id = fields.Many2one('og.team.player', ondelete='restrict')
    partner_id = fields.Many2one('res.partner', related='player_id.partner_id')
    team_id = fields.Many2one('og.team', related = 'player_id.team_id')
    position = fields.Selection(POSITIONS, string='Position', default='S')

    _sql_constraints = [
        ('table_position_uniq', 'unique (position,table_id)', 'The table have NESW 4 position !')
    ]


class GameTeamPlayer(models.Model):
    _inherit = "og.team.player"
    table_player_ids = fields.One2many('og.table.player','player_id')

class Partner(models.Model):
    _inherit = "res.partner"
    
    team_player_ids = fields.One2many('og.team.player','partner_id' )

    todo_table_ids = fields.One2many('og.table', compute='_get_table')
    done_table_ids = fields.One2many('og.table', compute='_get_table')

    doing_table_ids = fields.One2many('og.table', compute='_get_table')
    
    @api.multi
    def _get_table(self):
        for rec in self:
            
            table_ids = rec.team_player_ids.mapped('table_player_ids').mapped('table_id')
            
            rec.todo_table_ids = table_ids.filtered(
                    lambda tbl: tbl.state in [
                           'open', 'todo','doing','done'
                       ]).sorted('schedule_number')
                    
            rec.done_table_ids = table_ids.filtered(
                    lambda tbl: tbl.state == 'close').sorted('date_from')
            
            for game in rec.todo_table_ids.mapped('game_id'):
                doings = rec.todo_table_ids.filtered(
                    lambda tbl: tbl.game_id == game).sorted('schedule_number')
                if doings:
                    rec.doing_table_ids += doings[0]
            
            


