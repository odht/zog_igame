# coding: utf-8 -*- coding: UTF-8 -*-


import requests
import json

HOST = 'http://192.168.1.8:8069'
HOST = 'http://192.168.56.105:8069'
SERVER = 'TT'

URI_LOGIN = HOST + '/json/user/login'
URI_REGISTER = HOST + '/json/user/register'
URI_RESET_PASSWORD = HOST + '/json/user/reset/password'

URI_API       = HOST + '/json/api'


def ret(r):
    print 'status_code:', r.status_code
    print 'raw:', r.raw.read()
    print 'content:', r.content
    #print 'text:', r.text
    print 'headers:', r.headers

def t1(host=HOST):
    headers = {"content-type": "application/json" ,"credentials": "include"  }
    uri = host + '/json/test1'
    params = {}
    data = {}
    rspd = requests.post(uri,params=params,
                      data=json.dumps(data),
                      headers=headers)
                      
    ret(rspd)

print('t1')
#t1()

def jsonrpc(uri, data=None, params=None, sid=None, client=None):
        headers = {"content-type": "application/json"  }
        data1 = {"jsonrpc":"2.0",
                "method":"call",
                "id":123,
                "params":data and data or {}
                }
        
        params1 = params and params.copy() or {}
        if sid:                      
            params1.update( {'session_id':usid} )

        
        if not client:
            client=requests
        
        rspd = client.post(uri,params=params1,
                          data=json.dumps(data1),
                          headers=headers)
        #print rspd
        #ret(rspd)
        
        content = json.loads(rspd.content)
        res = content.get('result',{})
        
        error = content.get('error',{})
        if error:
            print uri, data, sid
            print error
            
            
            return None

        return json.loads(rspd.content).get('result',{})
        

def execute(sid, model, method, *args, **kwargs ):
    return jsonrpc(URI_API,{'model':model, 'method': method, 'args': args, 'kwargs': kwargs},sid=sid )

api = execute
        
class UserSudo(object):
    def login(self,user,psw,db=SERVER):
        """  check ok uid
        """
        result = jsonrpc(URI_LOGIN, {'db': db,'login':user, 'password':psw, 'type':'account'} )
        
        return result
        #return result.get('sid',None)

    def register(self,user,psw, db=SERVER):
        """  sudo(), create(), uid
        """
        return jsonrpc(URI_REGISTER, {'db': db,'login':user, 'password':psw} )

    def reset_password(self, user,newpsw, db=SERVER):
        """  sudo(), write(), uid
        """
        return jsonrpc(URI_RESET_PASSWORD, {'db': db,'login':user, 'password':newpsw} )


def get_user():
    print('usid')
    result = UserSudo().login('admin','123')
    usid = result.get('sid',None)
    print(usid)

    uid = result.get('uid',None)
    print(uid, type(uid) )
    
    return usid, uid


def search_one(model, domain):
    ids = execute(usid, model, 'search', domain, limit=1)
    return ids and ids[0] or None

def find(model, domain, record=None ):
    ids = execute(usid, model, 'search', domain, limit=1)
    #print 'find',model, domain, record, ids

    if not ids:
        id = execute(usid, model, 'create', record )
        print 'create, id=',model, id
        return id
    
    id = ids[0]
    print 'write, id=',model, id
    execute(usid, model, 'write', id, record )
    return id


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


