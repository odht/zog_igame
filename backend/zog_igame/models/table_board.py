# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

class Table(models.Model):
    _inherit = "og.table"

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

            
