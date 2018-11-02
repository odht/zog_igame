# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

from .tools import point2imp, imp2vp


class Match(models.Model):
    _inherit = "og.match"

    open_table_id  = fields.Many2one('og.table', compute='_compute_table' )
    close_table_id = fields.Many2one('og.table', compute='_compute_table' )

    table_ids = fields.One2many('og.table','match_id')

    @api.multi
    def _compute_table(self):
        def fn(room):
            return rec.table_ids.filtered(lambda s: s.room_type == room)

        for rec in self:
            rec.open_table_id  = fn('open')
            rec.close_table_id = fn('close')

    deal_count = fields.Integer(compute='_compute_imp',help='used for IMP 2 VP')

    bam = fields.Integer(compute='_compute_imp')
    host_bam  = fields.Integer(compute='_compute_imp')
    guest_bam = fields.Integer(compute='_compute_imp')

    imp = fields.Integer(compute='_compute_imp')
    imp_manual = fields.Integer(default=0)
    host_imp  = fields.Integer(compute='_compute_imp')
    guest_imp = fields.Integer(compute='_compute_imp')

    vp = fields.Float(compute='_compute_imp')
    vp_manual = fields.Float()

    host_vp  = fields.Float(compute='_compute_imp')
    guest_vp = fields.Float(compute='_compute_imp')

    @api.multi
    def _compute_imp(self):
        for rec in self:
            bam = sum(rec.line_ids.mapped('bam') )
            rec.bam = bam
            rec.host_bam  = bam
            rec.guest_bam = -bam

            imp = sum(rec.line_ids.mapped('imp') )
            host_imp = sum(rec.line_ids.mapped('host_imp') )
            guest_imp = sum(rec.line_ids.mapped('guest_imp') )
            
            impm = rec.imp_manual
            imp = imp + impm
            rec.imp = imp 
            rec.host_imp  = host_imp + (impm>0 and impm or 0)
            rec.guest_imp = guest_imp + (impm<0 and -impm or 0)
            #rec.deal_count = len(rec.line_ids)
            rec.deal_count = len(rec.deal_ids)
            vp = imp2vp(imp, rec.deal_count)
            vp = vp + rec.vp_manual
            vp = (vp>20) and 20 or vp
            vp = (vp<-20) and -20 or vp
            
            rec.vp = vp
            rec.host_vp  = vp
            rec.guest_vp  = 20 - vp


class MatchTeam(models.Model):
    _inherit = "og.match.team"

    vp = fields.Float(compute='_compute_score')
    bam = fields.Float(compute='_compute_score')

    @api.multi
    def _compute_score(self):
        def _fn(pos,match):
            return {'host': lambda m: (m.host_vp, m.host_bam),
                    'guest':lambda m: (m.guest_vp,m.guest_bam) }[pos](match)

        for rec in self:
            rec.vp,rec.bam =  _fn(rec.position,rec.match_id)

class MatchLine(models.Model):
    _inherit = "og.match.line"

    open_table_id  = fields.Many2one(related='match_id.open_table_id')
    close_table_id = fields.Many2one(related='match_id.close_table_id')

    open_board_id = fields.Many2one('og.board',compute='_compute_board')
    close_board_id = fields.Many2one('og.board',compute='_compute_board')

    @api.multi
    def _compute_board(self):
        def _fn(tbl,deal):
            return tbl.board_ids.filtered(lambda b: b.deal_id == deal)

        for rec in self:
            rec.open_board_id  = _fn(rec.open_table_id, rec.deal_id)
            rec.close_board_id = _fn(rec.close_table_id, rec.deal_id)

    open_declarer = fields.Selection(related='open_board_id.declarer')
    open_contract = fields.Selection(related='open_board_id.contract')
    open_result   = fields.Integer(  related='open_board_id.result')
    open_result2  = fields.Char(     related='open_board_id.result2')
    open_point    = fields.Integer(  related='open_board_id.point')
    open_ns_point = fields.Integer(  related='open_board_id.ns_point')
    open_ew_point = fields.Integer(  related='open_board_id.ew_point')

    close_declarer = fields.Selection(related='close_board_id.declarer')
    close_contract = fields.Selection(related='close_board_id.contract')
    close_result   = fields.Integer(  related='close_board_id.result')
    close_result2  = fields.Char(     related='close_board_id.result2')
    close_point    = fields.Integer(  related='close_board_id.point')
    close_ns_point = fields.Integer(  related='close_board_id.ns_point')
    close_ew_point = fields.Integer(  related='close_board_id.ew_point')

    point = fields.Integer(compute='_compute_point')
    host_point =  fields.Integer(compute='_compute_point')
    guest_point = fields.Integer(compute='_compute_point')

    bam = fields.Integer(compute='_compute_point')
    host_bam =  fields.Integer(compute='_compute_point')
    guest_bam = fields.Integer(compute='_compute_point')

    imp = fields.Integer(compute='_compute_point')
    host_imp  = fields.Integer(compute='_compute_point')
    guest_imp = fields.Integer(compute='_compute_point')

    @api.multi
    def _compute_point(self):
        for rec in self:
            point = rec.open_board_id.point - rec.close_board_id.point
            rec.point = point
            rec.host_point  = point>0 and point or 0
            rec.guest_point = point<0 and point or 0

            bam = point != 0 and (point>0 and 1 or -1 ) or 0
            rec.bam = bam
            rec.host_bam = bam
            rec.guest_bam = -bam

            imp = point2imp(point)
            rec.imp = imp
            rec.host_imp  = imp>0 and imp or 0
            rec.guest_imp = imp<0 and -imp or 0

