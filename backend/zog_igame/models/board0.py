# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


from odoo import api, fields, models

import json

from .bridge_tools import PASS, DBL, RDB, CALLS
from .bridge_tools import POSITIONS
from .bridge_tools import TRUMPS,RISKS,CONTRACTS
from .bridge_tools import SUITS,RANKS,CARDS
from .bridge_tools import partner, lho
from .bridge_tools import get_point

def get_winner( cur_trick, trump ):
        ct = cur_trick

        if len(ct)<4:
            return None

        def cmp_gt_card( first, second, trump):
            def index(rank):
                return '23456789TJQKA'.index(rank)

            if first.name[0] == second.name[0]:
                return index(first.name[1]) > index(second.name[1])
            else: 
                return first.name[0] == trump

        wincard = ct[0]
        for card in ct[1:]:
            ret = cmp_gt_card(card, wincard, trump)
            if ret:
                wincard = card

        return wincard.pos




class Board(models.Model):
    _inherit = "og.board"

    call_ids = fields.One2many('og.board.call','board_id')
    bidder   = fields.Selection(POSITIONS,compute='_compute_call')
    auction  = fields.Char(compute='_compute_call')
    
    @api.multi
    def _compute_call(self):
        for rec in self:
            cs = rec.call_ids
            rec.bidder = cs and lho(cs[-1].pos) or rec.dealer
            
            nn = rec.dealer and 'WNES'.index(rec.dealer) or 0

            auction = [ None for i in range( nn % 4) 
                      ] + [ cd.name for cd in rec.call_ids]
                      
            rec.auction = json.dumps(auction)

    player = fields.Selection(POSITIONS,compute='_compute_player')
    tricks =  fields.Char(compute='_compute_trick')
    last_trick =  fields.Char(compute='_compute_trick')
    current_trick=fields.Char(compute='_compute_trick')

    def _get_tricks(self):
        """All Played Cards """
        cards = json.loads(self.cards)
        cs = [card for card in cards if card.number]
        
        def fn(card):
            num = card.number
            return num and (num-1)//4 + 1 or 0
        
        ts = list( set([ fn(c) for c in cs] ) )
        ts.sort()
        return [ [c for c in cs if fn(c)==t]  for t in ts]
        

    """

    def _get_tricks2(self):
        #All Played Cards
        cs = self.card_ids.filtered(lambda c: c.number)
        ts = list( set([ c.trickno for c in cs] ) )
        ts.sort()
        return [ cs.filtered(lambda c: c.trickno==t) for t in ts]
    """

    @api.multi
    def get_tricks(self):
        return self._get_tricks()

    @api.multi
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
                #return ct.get_winner(rec.contract_trump)
                return get_winner(ct, rec.contract_trump)
                

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
    def _compute_win(self):
        for rec in self:
            ns, ew = rec._get_win()
            rec.ns_win = ns
            rec.ew_win = ew

    def _get_win(self):
        ts = self._get_tricks()

        def fn(trick):
            #w = trick.get_winner(self.contract_trump)
            w = get_winner(trick, rec.contract_trump)
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
    def _compute_trick_cnt(self):
        for rec in self:
            cnt = rec.ns_win + rec.ew_win
            if rec.claimer and rec.state == 'done':
                cnt += rec.ns_claim + rec.ew_claim
            rec.trick_count = cnt


