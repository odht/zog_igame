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
    _order = 'number'

    name = fields.Char('Name' )
    number = fields.Integer(default=1 )
    room_type = fields.Selection([
        ('open', 'Open' ),
        ('close','Close')], string='Room Type', default='open')

    match_id = fields.Many2one('og.match', string='Match', ondelete='restrict')
    pair_round_id = fields.Many2one('og.game.round', string='Pair Round')
    round_id = fields.Many2one('og.game.round', string='Round',
                                compute='_get_round')
    game_id = fields.Many2one('og.game', related='round_id.game_id')

    date_from = fields.Datetime(related='round_id.date_from')
    date_thru = fields.Datetime(related='round_id.date_thru')
    state = fields.Selection(related='round_id.state')

    @api.multi
    def _get_round(self):
        for rec in self:
            rec.round_id = rec.match_id and rec.match_id.round_id or (
                           rec.pair_round_id and rec.pair_round_id or None)

    deal_ids  = fields.Many2many('og.deal', string='Deals', related='round_id.deal_ids' )
    board_ids = fields.One2many('og.board', 'table_id', string='Boards')
    board_id = fields.Many2one('og.board', compute='_compute_board',
        help="The board played now")
    
    @api.multi
    @api.depends('board_ids','deal_ids')
    def _compute_board(self):
        for rec in self:
            rec.board_id = rec._get_board()
    
    def _get_board(self):
        bd = self.board_ids.filtered(lambda bd: bd.state not in ['done','cancel'])
        if bd:
            return bd[0]
        
        numbers = self.board_ids.mapped('number')
        deal_no = numbers and max(numbers) or 0
        deals = self.deal_ids.filtered(lambda deal: deal.number > deal_no).sorted('number')
        if not deals:
            return self.env['og.board']
        deal = deals[0]
        return self.env['og.board'].create({'deal_id': deal.id, 'table_id':self.id})

    state = fields.Selection([
        ('draft',  'Draft'),
        ('todo',  'Todo'),
        ('doing', 'Doing'),
        ('done',  'Done'),
        ('cancel', 'Cancelled')
    ], string='Status', compute='_compute_state')

    @api.multi
    @api.depends('board_ids','deal_ids')
    def _compute_state(self):
        for rec in self:
            rec.state = rec._get_state()

    def _get_state(self):
        bd_num = self.board_ids.mapped('number')
        dl_num = self.deal_ids.mapped('number')

        if not dl_num:
            return 'draft'

        if not bd_num:
            return 'todo'
        
        bd_num = list(set(bd_num))
        dl_num = list(set(dl_num))
        
        list.sort(bd_num)
        list.sort(dl_num)
        
        if cmp(dl_num, bd_num) > 0:
            return bd_num and 'doing' or 'todo'
        
        bd = self.board_ids.filtered(lambda bd: bd.state not in ['done','cancel'])
        return bd and 'doing' or 'done'

            

    ns_team_id = fields.Many2one('og.game.team', compute='_compute_team')
    ew_team_id = fields.Many2one('og.game.team', compute='_compute_team')

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
    ns_pair_id = fields.Many2one('og.game.team')
    ew_pair_id = fields.Many2one('og.game.team')

    #table_partner_ids = fields.Many2many('res.partner','table_id')
    #player_user_ids = fields.Many2many('res.users','table_id')

    # 4 player in table
    east_id = fields.Many2one('og.game.team.player', 
                compute='_compute_player', inverse='_inverse_player_east')
    west_id = fields.Many2one('og.game.team.player',
                compute='_compute_player', inverse='_inverse_player_west')
    north_id = fields.Many2one('og.game.team.player',
                compute='_compute_player', inverse='_inverse_player_north')
    south_id = fields.Many2one('og.game.team.player',
                compute='_compute_player', inverse='_inverse_player_south')
    table_player_ids = fields.One2many('og.table.player','table_id')
    player_ids = fields.Many2many('og.game.team.player', compute='_compute_player')


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
            else:
                vals = {'table_id':rec.id,
                        'position':pos,
                        'player_id': ptns[pos].id }

                table_player.create(vals)


class TablePlayer(models.Model):
    _name = "og.table.player"
    _description = "Table Player"

    name = fields.Char('Name', related = 'player_id.name' )

    table_id = fields.Many2one('og.table', required=True, ondelete='cascade')
    player_id = fields.Many2one('og.game.team.player', required=True, ondelete='restrict')
    partner_id = fields.Many2one('res.partner', related='player_id.partner_id')
    team_id = fields.Many2one('og.game.team', related = 'player_id.team_id')
    position = fields.Selection(POSITIONS, string='Position', default='-')

class GameTeamPlayer(models.Model):
    _inherit = "og.game.team.player"
    table_player_ids = fields.One2many('og.table.player','player_id')

class Partner(models.Model):
    _inherit = "res.partner"
    
    team_player_ids = fields.One2many('og.game.team.player','partner_id' )

    todo_table_ids = fields.One2many('og.table', compute='_get_table')
    done_table_ids = fields.One2many('og.table', compute='_get_table')
    
    @api.multi
    def _get_table(self):
        for rec in self:
            
            table_ids = rec.team_player_ids.mapped('table_player_ids').mapped('table_id')
            
            rec.todo_table_ids = table_ids.filtered(
                    lambda tbl: tbl.state in ['todo','doing']).sorted('date_from')
                    
            rec.done_table_ids = table_ids.filtered(
                    lambda tbl: tbl.state == 'done').sorted('date_from')
