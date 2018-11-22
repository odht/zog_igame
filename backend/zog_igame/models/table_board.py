# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class GameRound(models.Model):
    _inherit = "og.round"
    table_ids = fields.Many2many('og.table', compute='_compute_table')

    @api.multi
    def _compute_table(self):
        for rec in self:
            matchs = rec.match_ids
            open  = matchs.mapped('open_table_id')
            close = matchs.mapped('close_table_id')
            rec.table_ids = open | close

    state = fields.Selection([
        ('draft',  'Draft'),
        ('todo',  'Todo'),
        ('doing', 'Doing'),
        ('done',  'Done'),
        ('cancel', 'Cancelled')
    ], string='Status', compute='_compute_state')

    @api.multi
    def _compute_state(self):
        for rec in self:
            rec.state = rec._get_state()

    def _get_state(self):
        ts = self.table_ids
        if not ts:
            return 'draft'
        
        tts = ts.filtered(lambda t: t.state not in ['done','cancel'])
        if not tts:
            return 'done'
        
        tts = ts.filtered(lambda t: t.state in ['doing'])
        return tts and 'doing' or 'todo'



class Table(models.Model):
    _inherit = "og.table"

    @api.model
    def create(self,vals):
        table = super(Table,self).create(vals)
        deals = table.deal_ids
        for deal in deals:
            board_vals = {'table_id': table.id,'deal_id':deal.id }
            table.board_ids.create(board_vals)
        
        return table

    
    state = fields.Selection([
        ('todo',  'Todo'),
        ('done',  'Done'),
    ], string='Status' , compute='_compute_state' )

    @api.multi
    def _compute_state(self):
        for rec in self:
            rec.state = rec._get_state()

    def _get_state(self):
        bd = self.board_ids.filtered(lambda bd: bd.state not in ['done','cancel'])
        return bd and 'todo' or 'done'


    board_ids = fields.One2many('og.board', 'table_id', string='Boards')
    doing_board_id = fields.Many2one('og.board', compute='_compute_board' )
    
    @api.multi
    def _compute_board(self):
        for rec in self:
            rec.doing_board_id = rec._get_board()

    def _get_board(self):
        board = self.board_ids.filtered(
            lambda bd: bd.state not in ['done','cancel']).sorted('sequence')

        if board:
            return board[0]

""" 

class Board(models.Model):
    _inherit = "og.board"

    @api.multi
    def write(self,vals):
        ret = super(Board,self).write(vals)

        if vals.get('state'):
            self.table_id._compute_state()

        return ret
"""
