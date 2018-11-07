# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

"""
  
  LHO, UP , RHO, DOWN
  LURD
  WNES
  
  
  state:  bidding  #[ bidding, openleading, playing, 
                   # claiming, claiming.LRO, claiming.RHO, done ]
  number: 2 # [1,2,...16]
  vulnerable: NS  #[NS,EW,NO,BO],  transposition  
  dealer:     E,         transposition  

  auction : [1H, Pass] #, south eye,  transposition
  declarer: S  #          transposition
  contract: 1Hx
  dummy =   N  #          transposition
  
  player =  S  # bidder,openleader, player, transposition

  openlead = None, 'SA'
  hands  = [W N E S]
  
  tricks = [[trick],[trick]]
  last_trick    = [None, None,SA,S9,HA,S7] #[W,N,E,S,W,N,E]
  current_trick = [None,SA,S9]
  ns_win = 1
  ew_win = 2

  claimer,       , transposition
  claimer_result
  ns_claim  = 3
  ew_claim  = 2
  
  result   = -1
  point = 0


"""

from odoo import api, fields, models

import logging
_logger = logging.getLogger(__name__)
import json

from .bridge_tools import PASS, DBL, RDB, CALLS
from .bridge_tools import POSITIONS
from .bridge_tools import TRUMPS,RISKS,CONTRACTS
from .bridge_tools import SUITS,RANKS,CARDS
from .bridge_tools import partner, lho
from .bridge_tools import get_point

class Deal(models.Model):
    _inherit = "og.deal"
    board_ids = fields.One2many('og.board', 'deal_id', string='Boards')


class Board(models.Model):
    _name = "og.board"
    _description = "Board"
    _order = 'number'


    state = fields.Selection([
        ('draft', 'Draft'),
        ('bidding', 'Bidding'),
        ('openlead','Openlead'),
        ('playing', 'Playing'),
        ('claiming', 'Claiming'),
        ('claiming.LHO', 'Claiming.LHO'),
        ('claiming.RHO', 'Claiming.RHO'),
        ('done',    'Done'),
        ('cancel', 'Cancelled')
    ], string='Status', default='bidding')

    table_id = fields.Many2one('og.table', required=True, ondelete='restrict')
    round_id = fields.Many2one('og.round', related='table_id.round_id')
    phase_id = fields.Many2one('og.phase', related='round_id.phase_id')
    game_id = fields.Many2one('og.game', related='phase_id.game_id')

    deal_id = fields.Many2one('og.deal', required=True, ondelete='restrict')
    card_str = fields.Char(related='deal_id.card_str')
    
    match_id = fields.Many2one('og.match', related='table_id.match_id')
    host_id  = fields.Many2one('og.team', related='match_id.host_id')
    guest_id = fields.Many2one('og.team', related='match_id.guest_id')


    _sql_constraints = [
        ('table_deal_uniq', 'unique (deal_id,table_id)', 'a deal play one time in a table!')
    ]

    # compute name = 2 NS S 1Hx -3
    name   = fields.Char('Name', related='deal_id.name' )
    
    number = fields.Integer(related='deal_id.number' )
    dealer = fields.Selection(related='deal_id.dealer' )
    vulnerable = fields.Selection(related='deal_id.vulnerable' )

    hands = fields.Char(compute='_compute_hands')
    @api.multi
    def _compute_hands(self):
        def fn(cards, pos):
            cs = cards.filtered(
                    lambda card: card.pos == pos and card.number == 0).sorted('id')
            
            return [card.name for card in cs ]
            
        for rec in self:
            rec.hands = json.dumps([
                fn(rec.card_ids,'W'),
                fn(rec.card_ids,'N'),
                fn(rec.card_ids,'E'),
                fn(rec.card_ids,'S'),
            ])


    declarer   = fields.Selection(POSITIONS )
    contract =  fields.Selection(CONTRACTS )
    
    contract_rank = fields.Integer(compute='_compute_contract2')
    contract_trump = fields.Selection(TRUMPS,compute='_compute_contract2')
    contract_risk =  fields.Selection(RISKS,compute='_compute_contract2')

    openleader = fields.Selection(POSITIONS,compute='_compute_contract2')
    dummy      = fields.Selection(POSITIONS,compute='_compute_contract2')
            
    @api.multi
    def _compute_contract2(self):
        for rec in self:
            ctrct = rec.contract
            rec.contract_rank  = ctrct and int(ctrct[0]) or 0
            trump = ctrct and ctrct[1] or None
            rec.contract_trump =  trump == 'N' and 'NT' or trump 
            rec.contract_risk = ctrct and ctrct[-2:]=='xx' and RDB or (
                                ctrct and ctrct[-1:]== 'x' and DBL or '')
                                
            dclr = rec.declarer
            rec.dummy = dclr and partner(dclr) or None
            rec.openleader = dclr and lho(dclr) or None
            
    openlead = fields.Selection(CARDS )


    result = fields.Integer()
    result2 = fields.Char(compute='_compute_result2')

    @api.multi
    def _compute_result2(self):
        def fn(rec):
            if rec.state not in ['done']:
                return None

            if rec.contract == PASS:
                return 'All Pass'

            rslt = rec.result
            rslt2 = rslt == 0 and '=' or ((rslt>0 and '+' or '') + str(rslt) )
            rslt2 = rec.declarer and rec.contract and (
                    rec.declarer + ' ' + rec.contract + ' ' + rslt2
                    ) or None
                    
            return rslt2

        for rec in self:
            rec.result2 = fn(rec)

    point = fields.Integer(compute='_compute_point' )
    ns_point = fields.Integer(compute='_compute_point' )
    ew_point = fields.Integer(compute='_compute_point' )

    @api.multi
    def _compute_point(self):
        for rec in self:
            rec.point, rec.ns_point, rec.ew_point = rec._get_point()

    def _get_point(self):
        if self.state != 'done':
            return 0, 0, 0
        
        if self.contract == PASS:
            return 0, 0, 0


        vs = {  'BO': lambda d: 1,
                'NO': lambda d: 0,
                'NS': lambda d: d in 'NS',
                'EW': lambda d: d in 'EW' }

        vul = vs[self.vulnerable](self.declarer)
        rank = self.contract_rank
        trump = self.contract_trump
        risk = self.contract_risk
        num = self.result

        point = get_point(vul,rank,trump,risk,num)


        dclr = point > 0 and point or 0
        opp  = point < 0 and -point or 0
        
        ns, ew = self.declarer in 'NS' and (dclr, opp) or (opp,dclr)
        return point, ns, ew

    card_ids  = fields.One2many('og.board.card','board_id')
    
    @api.model
    def create(self, vals):
        deal = vals.get('deal_id')
        if not deal:
            return 0
        nvs = vals.copy()
        if nvs.get('card_ids'):
            del nvs['card_ids']

        board = super(Board,self).create(nvs)

        for dc in board.deal_id.card_ids:
            cards = {'board_id': board.id,'deal_card_id':dc.id }
            board.card_ids.create(cards)

        return board

