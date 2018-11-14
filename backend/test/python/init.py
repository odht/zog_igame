# coding: utf-8 -*- coding: UTF-8 -*-


import requests
import json

#HOST = 'http://192.168.56.105:8069'
HOST = 'http://192.168.1.8:8069'
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
        #ret(rspd)
        
        content = json.loads(rspd.content)
        
        res = content.get('result',{})
        
        if not res:
            print content.get('error',{})
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
    
print('usid')
result = UserSudo().login('admin','123')

usid = result.get('sid',None)
print(usid)

uid = result.get('uid',None)
print(uid, type(uid) )


print( 't4 get partner doing table' )

def test4(host=HOST):
    headers = {"content-type": "application/json"  }
    uri = host + '/json/api'
    fields = ['team_player_ids','doing_table_id','todo_table_ids']
    #fields = ['name']
    
    data ={ "model":"res.users",
            "method":"read",
            "args": [uid,fields],
            "kwargs":{}
          }
    

    return jsonrpc(uri,data=data,sid=usid )

#print test4()

def find(model, domain, record=None, no_create=None, write=None):
    ids = execute(usid, model, 'search', domain, limit=1)
    #print 'find',model, domain, record, no_create, ids
    if not ids:
        if not no_create:
            id = execute(usid, model, 'create', record )
            print 'create, id=',model, id
            return id
        return None
    
    id = ids[0]
    if write:
        print 'write, id=',model, id
        execute(usid, model, 'write', id, record )
    
    return id


from data import records

def game_one():
    rec =records['og.game'][0]
    domain = [('name','like',rec['name'])]
    game_id = find('og.game', domain, record=rec  )
    
    return game_id

game_id = game_one()

        
def schedule_one(rec):
    rec = rec.copy()
    rec['game_id'] = game_id
    
    model = 'og.schedule'
    domain = [('number','=',rec['number']),('game_id','=',game_id) ]

    id = find(model, domain, record=rec, write=1 )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass
    

def schedule_multi():
    for rec in records['og.schedule']:
        schedule_one(rec)

schedule_multi()

  
def phase_one(rec):
    rec = rec.copy()
    rec['game_id'] = game_id
    
    model = 'og.phase'
    domain = [('number','=',rec['number']),('game_id','=',game_id) ]

    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass

def phase_multi():
    for rec in records['og.phase']:
        phase_one(rec)

phase_multi()

  
def round_one(rec):
    
    phase_id = rec['phase_id']
    schedule_id = rec['schedule_id']
    
    domain = [('number','=',phase_id),('game_id','=',game_id) ]
    phase_id = find('og.phase', domain ,no_create=1)
    
    domain = [('number','=',schedule_id),('game_id','=',game_id) ]
    schedule_id = find('og.schedule', domain ,no_create=1)

    
    rec = rec.copy()
    rec['phase_id'] = phase_id
    rec['schedule_id'] = schedule_id
    
    model = 'og.round'
    domain = [('phase_id','=',phase_id),('schedule_id','=',schedule_id) ]

    id = find(model, domain, record=rec, no_create=0 )
    print id
    if id:
        print execute(usid, model, 'read', id)
        pass

def round_multi():
    for rec in records['og.round']:
        round_one(rec)

round_multi()
