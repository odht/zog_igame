# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

import logging
_logger = logging.getLogger(__name__)


from .bridge_tools import PASS, DBL, RDB
from .bridge_tools import partner, lho
from .bridge_tools import cmp_gt_call


class Board(models.Model):
    _inherit = "og.board"

    @api.multi
    def bid(self, pos, call, agreement, notes):
        self.ensure_one()
        
        if self.state != 'bidding':
            return (-11, 'no bidding')
        
        ret = self._check_call(pos, call)
        if ret:
            return ret

        nums = self.call_ids.mapped('number')
        num  = 1+(nums and max(nums) or 0)
        vals = {'name':call, 'pos': pos,
                'board_id':self.id, 'number': num, 'agreement':agreement, 'notes':notes}

        self.call_ids.create1(vals)


        dclr,contract,rank,trump,risk = self.call_ids._compute_contract()
        self.contract = contract
        self.declarer = dclr
        
        if contract== PASS:
            self.state = 'done'
            self.result = 0
            
        elif contract and dclr:
            self.state = 'openlead'
        
        return 0


    def _check_call(self, pos, call):
        if self.contract:
            return (-1,'Bid End')

        if self.bidder != pos:
            return (-2,'Wrong Bidder')

        if not call:
            return (-90,'No call')

        call = call.upper()

        risk = {'PASS':PASS, 'X':DBL, 'XX':RDB}
        if call in risk:
            call = risk[call]

        else:
            if not call[0].isdigit():
                return (-91,'Bad Call')

            rank = int(call[0])
            if not rank in range(1,8):
                return (-92,'Bad Call')

            if len(call) < 2:
                return (-93,'Bad Call')

            if not call[1] in 'CDHSN':
                return (-93,'Bad Call')

            if call[1] in 'N':
                if len(call) < 3:
                    return (-95,'Bad Call')
                elif call[2] != 'T':
                    return (-96,'Bad Call')
                else:
                    pass
            else:
                pass

        if call == PASS:
            return 0


        #auction = [c.name for c in self.call_ids]
        auction = self.call_ids.mapped('name')

        if call == RDB:
            if not auction:
                return (-10,'Cant bid xx at the 1st position')
            if auction[-1] not in [DBL,PASS]:
                return (-11,'Cant bid xx after opp not x')
            if auction[-1] == DBL:
                return 0

            if len(auction)<4:
                return (-12,'Cant bid xx')
            if auction[-2] != PASS:
                return (-13,'Cant bid xx after partner bid')
            if auction[-3] != DBL:
                return (-14,'Cant bid xx after opp not x')

            return 0

        if call == DBL:
            if not auction:
                return (-20,'Cant bid x at the 1st position')
            if auction[-1] in [DBL,RDB]:
                return (-21,'Cant bid x after x or xx')
            if auction[-1] != PASS:
                return 0
            if len(auction)<3:
                return (-22,'Cant bid x after rho bid Pass')
            if auction[-2] != PASS:
                return (-23,'Cant bid x after partner call')
            if auction[-3] in [PASS,DBL,RDB]:
                return (-24,'Cant bid x after opp bid x or xx')

            return 0


        for ac in auction[::-1]:
            if ac in [PASS,DBL,RDB]:
                continue
            if not cmp_gt_call(call, ac):
                return ( -31, 'The Call must over the last call')

        return 0



    @api.multi
    def get_random_call(self):
        import random
        rank_list = [1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,5,5,6,7]
        random.shuffle(rank_list)
        rank = rank_list[0]

        suit = 'CDHSN'[random.randint(0,4)]
        
        suit = (suit=='N') and 'NT' or suit

        risk_list = [         '' for i in range(0,6)
                    ] + [ 'Pass' for i in range(0,6)
                    ] + [ 'x','xx']

        random.shuffle(risk_list)
        risk = risk_list[0]
        call = str(rank) + suit
        return risk and risk or call


