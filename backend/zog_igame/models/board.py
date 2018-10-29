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
    round_id = fields.Many2one('og.game.round', related='table_id.round_id')
    game_id = fields.Many2one('og.game', related='round_id.game_id')

    deal_id = fields.Many2one('og.deal', required=True, ondelete='restrict')
    card_str = fields.Char(related='deal_id.card_str')


    name   = fields.Char('Name', related='deal_id.name' )
    # compute name = 2 NS S 1Hx -3
    
    number = fields.Integer(related='deal_id.number' )
    dealer = fields.Selection(related='deal_id.dealer' )
    vulnerable = fields.Selection(related='deal_id.vulnerable' )

    hands = fields.Char(compute='_compute_hands')
    @api.multi
    def _compute_hands(self):
        def fn(cards, pos):
            cs = cards.filtered(lambda card: card.pos == pos and card.number == 0
                               ).sorted('id')
            
            # filtered , only  on hand
            
            return [card.name for card in cs ]
            
        for rec in self:
            rec.hands = json.dumps([
                fn(rec.card_ids,'W'),
                fn(rec.card_ids,'N'),
                fn(rec.card_ids,'E'),
                fn(rec.card_ids,'S'),
            ])

    call_ids = fields.One2many('og.board.call','board_id')
    bidder   = fields.Selection(POSITIONS,compute='_compute_call')
    auction  = fields.Char(compute='_compute_call')
    @api.multi
    @api.depends('call_ids','dealer')
    def _compute_call(self):
        for rec in self:
            cs = rec.call_ids
            rec.bidder = cs and lho(cs[-1].pos) or rec.dealer
            
            nn = rec.dealer and 'WNES'.index(rec.dealer) or 0

            auction = [ None for i in range( nn % 4) 
                      ] + [ cd.name for cd in rec.call_ids]
                      
            rec.auction = json.dumps(auction)

    declarer   = fields.Selection(POSITIONS )
    contract =  fields.Selection(CONTRACTS )
    
    contract_rank = fields.Integer(compute='_compute_contract2')
    contract_trump = fields.Selection(TRUMPS,compute='_compute_contract2')
    contract_risk =  fields.Selection(RISKS,compute='_compute_contract2')

    openleader = fields.Selection(POSITIONS,compute='_compute_contract2')
    dummy      = fields.Selection(POSITIONS,compute='_compute_contract2')
            
    @api.multi
    @api.depends('declarer','contract')
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

    player = fields.Selection(POSITIONS,compute='_compute_player')
    tricks =  fields.Char(compute='_compute_trick')
    last_trick =  fields.Char(compute='_compute_trick')
    current_trick=fields.Char(compute='_compute_trick')

    def _get_tricks(self):
        """All Played Cards """
        cs = self.card_ids.filtered(lambda c: c.number)
        ts = list( set([ c.trickno for c in cs] ) )
        ts.sort()
        return [ cs.filtered(lambda c: c.trickno==t) for t in ts]

    @api.multi
    def get_tricks(self):
        return self._get_tricks()

    @api.multi
    @api.depends('card_ids' )
    def _compute_trick(self):
        def fn(trick):
            num = trick and 'WNES'.index( trick[0].pos ) or 0
            trick = [None for i in range(num)] + [ t.name for t in trick]
            return json.dumps(trick)
        
        for rec in self:
            ts = rec._get_tricks()
            rec.last_trick = fn(ts and len(ts)>=2 and ts[-2] or [])
            rec.current_trick  = fn(ts and ts[-1] or [])
            rec.tricks = [ fn(trick) for trick in ts]
            

    @api.multi
    @api.depends('declarer','card_ids','state')
    def _compute_player(self):
        def fn(rec):
            ts = rec._get_tricks()
            ct = ts and ts[-1] or None

            if not ct:
                dclr = rec.declarer
                return dclr and lho(dclr) or None
            elif len(ct)<4:
                ct = [c for c in ct]
                ct.sort(key=lambda c: c.number)
                return lho(ct[-1].pos)
            else:
                return ct.get_winner(rec.contract_trump)

        for rec in self:
            if rec.state == 'bidding':
                rec.player = rec.bidder
            elif rec.state == 'openlead':
                dclr = rec.declarer
                rec.player = dclr and lho(dclr) or None
            elif rec.state in ['playing','claiming','claiming.LHO','claiming.RHO']:
                rec.player = fn(rec)
            else:
                rec.player = None

    ns_win = fields.Integer(compute='_compute_win')
    ew_win = fields.Integer(compute='_compute_win')

    @api.multi
    @api.depends('card_ids')
    def _compute_win(self):
        for rec in self:
            ns, ew = rec._get_win()
            rec.ns_win = ns
            rec.ew_win = ew

    def _get_win(self):
        ts = self._get_tricks()

        def fn(trick):
            w = trick.get_winner(self.contract_trump)
            if not w:
                return 0, 0
            return w in 'NS' and (1,0) or (0,1)

        nsew = [ fn(t) for t in ts ]
        ns = sum( [ win[0] for win in nsew ] )
        ew = sum( [ win[1] for win in nsew ] )

        return ns, ew

    claimer = fields.Selection(POSITIONS)
    claim_result = fields.Integer()
    
    ns_claim  = fields.Integer(compute='_compute_claim')
    ew_claim  = fields.Integer(compute='_compute_claim')

    @api.multi
    @api.depends('claimer','claim_result')
    def _compute_claim(self):
        for rec in self:
            ns, ew = rec._get_claim()
            rec.ns_claim  = ns
            rec.ew_claim  = ew

    def _get_claim(self):
        dclr, opp, ns, ew = 0, 0, 0, 0

        if not self.claimer:
            return ns, ew

        rest = 13 - self.ns_win - self.ew_win
        fst, scd = self.claim_result, rest - self.claim_result

        ns, ew = self.claimer in 'NS' and (fst, scd) or (scd, fst)
        return ns, ew


    trick_count = fields.Integer(compute='_compute_trick_cnt')

    @api.multi
    @api.depends('ns_win','ew_win', 'ns_claim', 'ew_claim')
    def _compute_trick_cnt(self):
        for rec in self:
            cnt = rec.ns_win + rec.ew_win
            if rec.claimer and rec.state == 'done':
                cnt += rec.ns_claim + rec.ew_claim
            rec.trick_count = cnt

    result = fields.Integer()
    result2 = fields.Char(compute='_compute_result2')

    @api.multi
    @api.depends('contract','declarer', 'trick_count', 'result')
    def _compute_result2(self):
        def fn(rec):
            if not rec.contract:
                return None

            if rec.contract == PASS:
                return 'All Pass'

            if rec.trick_count<13:
                return None
                
            if rec.result is None:
                return None

            rslt = rec.result

            rslt2 = rslt == 0 and '=' or ((rslt>0 and '+' or '') + str(rslt) )

            rslt2 = rec.declarer and rec.contract and (
                    rec.declarer + ' ' + rec.contract + ' ' + rslt2
                    ) or None
                    
            return rslt2

        for rec in self:
            rec.result2 = fn(rec)

    point = fields.Integer(compute='_compute_point')
    ns_point = fields.Integer(compute='_compute_point')
    ew_point = fields.Integer(compute='_compute_point')

    @api.multi
    @api.depends('contract','declarer', 'result')
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

