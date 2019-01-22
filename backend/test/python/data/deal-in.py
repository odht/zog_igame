# coding: utf-8 -*- coding: UTF-8 -*-
from rpc import get_user,execute
from tools import search_one, find
import json


def read_deal(file_name):
    with open(file_name) as file:
        deals = {}
        deal = {}
        for line in file:
            ln= line.strip()
            if ln and ln[0]=='[' and ln[-1]==']':
                ln1 = ln[1:-1]
                key,value = ln1.split(' ',1)
                if key in ['Board']:
                    deal[key] = int(value[1:-1])
                if key in ['Deal']:
                    v = value[1:-1]
                    pos, hands0 = v.split(':',1)
                    hands = hands0.split()
                    i='NESWNESW'.index(pos)
                    i=(4-i)%4
                    hs = [ hands[ii%4] for ii in range(i,i+4) ]
                    deal[key]= ' '.join( hs )
            else:
                if deal:
                    pass
                    deals[deal['Board']] = deal['Deal']
                    
        return deals


deal_files = {
    11: '20181123.1.pbn',
    12: '20181123.2.pbn',
    13: '20181123.1.pbn',
    14: '20181123.2.pbn',
    15: '20181123.1.pbn',
    21: '20181123.2.pbn',
    22: '20181123.1.pbn',
    23: '20181123.2.pbn',
    24: '20181123.1.pbn',
}

usid, uid = get_user()

from data import records,  round_turn

def game_one():
    rec =records['og.game'][0]
    domain = [('name','like',rec['name'])]
    game_id = find('og.game', domain, record=rec  )
    
    return game_id


def og_deal_update_one(rec):
    schedule_id = rec['schedule_id']
    domain = [('number','=',schedule_id),('game_id','=',game_id) ]
    schedule_id = search_one('og.schedule', domain  )

    rec = rec.copy()
    
    rec['schedule_id'] = schedule_id
    rec['schedule_ids'] = [(6, 0, [schedule_id])]
    
    model = 'og.deal'
    domain = [('number','=',rec['number']),('schedule_id','=',schedule_id) ]

    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)

        deal = execute(usid, model, 'read', id, ['board_ids','cards'])[0]
        cards = json.loads(deal['cards'] )

        def fn(card):
            card['number'] = 0
            return card
        
        cards = json.dumps([ fn(card) for card in cards ])

        for board_id in deal['board_ids']:
            find('og.board',[['id','=',board_id]],{'cards':cards})

        #execute(usid, 'og.board', 'write', deal['board_ids'], cards )


        pass


def og_deal_update():
    for schedule_num, deal_file in deal_files.items():
        deals = read_deal(deal_file)
        for i in range(1,13):
            vals = {
                'schedule_id': schedule_num,
                'number':   i,
                'card_str': deals[i]
            }
            
            og_deal_update_one(vals)
    
game_id = game_one()

og_deal_update()


