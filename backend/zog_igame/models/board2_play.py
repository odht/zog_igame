# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

from .bridge_tools import PASS
from .bridge_tools import partner, lho, rho

import logging
_logger = logging.getLogger(__name__)

import random

class Board(models.Model):
    _inherit = "og.board"

    @api.multi
    def play(self,pos,card):
        self.ensure_one()
        
        ret, ccdd = self._check_play(pos, card)
        if ret:
            return ret, ccdd

        ccdd.number = 1 + max(self.card_ids.mapped('number') )
        
        if not self.openlead:
            self.openlead = self._get_openlead()
        
        if self.state in ['openlead']:
            self.state = 'playing'
        
        if self.trick_count>=13:
            self.state = 'done'
            self.result = self._get_result()
        
        return 0

    def _check_play(self, pos, card):
        if self.state not in ['openlead', 'playing']:
            return -11, 'state is not playing or openlead'

        if not ( self.contract and self.declarer):
            return (-1,'bidding, not Play ')

        if self.trick_count>=13:
            return (-2,'Play End')

        if pos==self.dummy:
            return (-3,'Dummy cant play')

        if pos==self.declarer and self.player==self.dummy:
            pos = self.dummy

        if self.player != pos:
            return (-4,'Wrong Player')

        ts = self._get_tricks()
        ct = ts and ts[-1] or []
        ct = [c for c in ct]
        ct.sort(key=lambda c: c.number)
        suit = ct and len(ct)<4 and ct[0].suit or None

        if suit and suit != card[0]:
            if self.card_ids.filtered(
                    lambda c: (c.suit==suit and c.pos==pos
                              ) and not c.number ):
                return (-5,'Wrong suit' )

        cs = self.card_ids.filtered(
                lambda c: (c.name==card and c.pos==pos
                          ) and not c.number)

        if not cs:
            return (-5, 'No card')

        return (0, cs[0])

    def _get_openlead(self):
            ts = self._get_tricks()
            t1 = ts and ts[0] or []
            t1 = [c for c in t1]
            t1.sort(key=lambda c: c.number)
            return t1 and t1[0].name or None

    def _get_result(self):
            if not self.contract or self.contract == PASS or self.trick_count<13:
                return 0

            rslt = self.ns_win + self.ns_claim
            rslt = (self.declarer in 'NS' and [rslt] or [13-rslt] )[0]
            rslt -= (self.contract_rank + 6)
            return rslt

    @api.multi
    def claim(self,pos,num):
        """ 
        num :  the number to get from unplayed tricks by pos
        """
        self.ensure_one()

        ret = self._check_claim(pos, num)
        if ret:
            return ret

        self.claimer = pos
        self.claim_result = num
        self.state = 'claiming'

        #if self.trick_count>=13:
        #    self.state = 'claiming'
        #    #self.result = self._get_result()

        return 0

    def _check_claim(self,pos, num):
        if self.state not in ['playing']:
            return -11, 'state is not playing'

        if self.claimer:
            return (-1,'Claim again.')
            
        if pos != self.declarer:
            return (-1,'Claimed by Decalrer please.')

        rest = 13 - (self.ns_win + self.ew_win)
        if num<0:
            return (-1,'Claimed num must >0')
        if num>rest:
            return (-1,'Claimed num too big')

        if not pos:
            return (-2,'Claimed position is wrong')

        if pos in [self.dummy]:
            return (-3,'Claimed position is dummy')
        return 0

    @api.multi
    def claim_ok(self,pos, ok=None):
        """ claim ok, not ok """
        if self.state not in ['claiming','claiming.LHO','claiming.RHO']:
            return -3, 'state not in claiming'
        
        if not pos:
            return -1, 'not pos'
        if pos not in 'WNES':
            return -2, 'not pos'
        
        if not self.declarer:
            return -4, 'not declarer'
            
        dclr = self.declarer
        
        if pos not in [lho(dclr), rho(dclr)]:
            return -5, 'not pos'
        
        if not ok:
            self.state = 'playing'
        
        opp = {lho(dclr):'LHO', rho(dclr):'RHO'}[pos]
        
        if self.state in ['claiming']:
            self.state = 'claiming,' + opp
            return 0
            
        if opp == self.state.split(',')[1]:
            return -6, 'claim ok again'

        self.state = 'done'
        self.result = self._get_result()
        
        return 0

    @api.multi
    def undo(self):
        #self.refresh()
        if self.claimer:
            return self._undo_claim()

        cs = [c for c in self.card_ids if c.number]
        if cs:
            return self._undo_play()
        elif self.call_ids:
            return self._undo_bid()

        return 0

    def _undo_claim(self):
        self.claimer = None
        self.claim_result = 0
        #self.refresh()
        return 1

    def _undo_play(self):
        cs = [c for c in self.card_ids if c.number]
        if not cs:
            return 0
        cs.sort(key=lambda c: c.number)
        cs[-1].number = 0
        #self.refresh()
        return 1

    def _undo_bid(self):
        if not self.call_ids:
            return None
        self.call_ids.sorted(key=lambda c: c.number)

        self.call_ids[-1].unlink()
        #self.refresh()
        return 1


    @api.multi
    @api.returns('self')
    def get_random_card(self):
        import random

        pos = self.player
        ts = self._get_tricks()
        ct = ts and ts[-1] or []
        ct = [c for c in ct]
        ct.sort(key=lambda c: c.number)
        suit = ct and len(ct)<4 and ct[0].suit or None

        cards = self.card_ids.filtered(
             lambda card: card.pos == pos and not card.number)

        cs = [c for c in cards if c.suit == suit ]

        if cs:
            card = cs[ random.randint(0,len(cs)-1 )]
        else:
            cs  = cards
            card = cs and cs[ random.randint(0,len(cs)-1) 
                            ] or self.env['og.board.card']

        return card

    @api.multi
    def get_random_claim(self):
        ps = [ p for p in 'NESW' if p != self.dummy ]
        random.shuffle(ps)
        pos = ps[0]
        rest = 13 - self.ns_win - self.ew_win
        rst = random.randint(rest - rest//5 ,rest)
        if pos == self.declarer:
            rst = rst
        else:
            rst = rest - rst
        return pos, rst

    @api.multi
    def get_random_play(self):
        self.refresh()
        r2 = [0]+[ i for i in range(60)]
        random.shuffle(r2 )
        if r2[0]:
            card = self.get_random_card()
            pos = card.pos
            pos = pos==self.dummy and self.declarer or pos
            return 1, pos, card.name
        else:
            pos, claim = self.get_random_claim()
            return 0, pos, claim



