# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

import json

from .bridge_tools import POSITIONS
from .bridge_tools import SUITS,RANKS,CARDS
from .bridge_tools import VULNERABLES

def get_random_deal():
    import random
    cards = [ suit+rank for suit in 'SHDC' for rank in 'AKQJT98765432']
    random.shuffle(cards)

    def fn(index):
        hand = cards[13*index:13*index+13]
        def f1(hand,index,suit):
            hcs = [ 'AKQJT98765432'.index(card[1])
                    for card in hand if card[0] == suit ]
            hcs.sort()
            return ''.join( [ 'AKQJT98765432'[i] for i in hcs ] )

        return '.'.join( [ f1(hand,index,suit) for suit in 'SHDC' ] )

    return ' '.join( [  fn(index) for index in range(4)  ] )

def _string2cards(name):
    return [ ('SHDC'[j] + rank, 'NESW'[i]) 
              for i, hand  in enumerate( name.split(' ')) 
              for j, ranks in enumerate( hand.split('.'))
              for rank  in ranks
            ]

class Deal(models.Model):
    """
    
    """
    _name = "og.deal"
    _description = "Deal"
    _order = 'number'

    @api.model
    def _default_cards(self):
        return get_random_deal()

    number = fields.Integer(default=1 ,required=True )
    dealer = fields.Selection(POSITIONS, compute='_compute_name')
    vulnerable = fields.Selection(VULNERABLES, compute='_compute_name')
    name = fields.Char('Name', compute='_compute_name')

    card_str = fields.Char(compute ='_compute_cards', inverse='_inverse_cards',
        default=_default_cards, required=True, 
        help='Full Deal')

    #cards = fields.Char(help='replace card_ids')
    
    card_ids = fields.One2many('og.deal.card', 'deal_id', string='Cards',
        help=""" Technical field. A deal have 52 card.
            card_str is used to set or get all cards. """)
        
    notes = fields.Text('Notes')

    @api.multi
    def _compute_name(self):
        vuls = ['NO','NS','EW','BO']
        for rec in self:
            n = rec.number
            rec.dealer = 'NESW'[ (n - 1) % 4 ]
            rec.vulnerable = vuls[((n-1) % 4 + (n-1)//4) % 4]
            rec.name = str(n) + ',' + rec.dealer + ',' + rec.vulnerable

    @api.multi
    def _compute_cards(self):
        """, the format is 
        AKQ.AKQ.AKQ.AKQ2 JT9.JT9.JT92.JT9 876.8762.876.876 5432.543.543.543
        4 hands splited by space order by NESW
        4 suits splited by dot order by SHDC        
        """
        
        def fn2(suitcard):
            suitcard.sort(key=lambda r: 'AKQJT98765432'.index(r.rank) )
            return ''.join([c.rank for c in suitcard])

        def fn1(hand):
            return '.'.join([ fn2([c for c in hand if c.suit==suit
                                   ]) for suit in 'SHDC' ])

        for rec in self:
            #cards = json.loads(rec.cards)
            
            #rec.card_str =' '.join([fn1([c for c in rec.card_ids if c.pos==pos
            #                         ]) for pos in 'NESW' ])
            
            
            rec.card_str =' '.join([fn1([c for c in rec.card_ids if c.pos==pos
                                     ]) for pos in 'NESW' ])

    @api.multi
    def _inverse_cards(self):
        for rec in self:
            for cd in _string2cards(rec.card_str):
                card = rec.card_ids.filtered(lambda c: c.name==cd[0])
                if card:
                    card.pos = cd[1]
                else:
                    card.create({'name':cd[0],'pos':cd[1],
                                 'deal_id': rec.id })

    @api.multi
    def unlink(self):
        for rec in self:
            if rec.env['og.round'].search([['deal_ids','in', rec.ids ]]):
                return None
        
        return super(Deal, self).unlink()


class DealCard(models.Model):
    """
    A deal have 52 card. Don't modify record in this model. 
    """
    _name = "og.deal.card"
    _description = "Deal Card"

    deal_id = fields.Many2one('og.deal', required=True, ondelete='cascade')
    name = fields.Selection(CARDS, help='suit and rank')
    suit = fields.Selection(SUITS,compute='_compute_suit_rank')
    rank = fields.Selection(RANKS,compute='_compute_suit_rank')
    position  = fields.Selection(POSITIONS, help='the position dealed to with this card.')
    pos  = fields.Selection(POSITIONS, related = 'position', help='no used.')

    @api.multi
    def _compute_suit_rank(self):
        for rec in self:
            rec.suit = rec.name[0]
            rec.rank = rec.name[1]

