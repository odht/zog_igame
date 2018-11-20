# coding: utf-8 -*- coding: UTF-8 -*-


import requests
import json

HOST = 'http://192.168.56.105:8069'
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


from data import records,  round_turn

def game_one():
    rec =records['og.game'][0]
    domain = [('name','like',rec['name'])]
    game_id = find('og.game', domain, record=rec  )
    
    return game_id

def schedule_one(rec):
    rec = rec.copy()
    rec['game_id'] = game_id
    
    model = 'og.schedule'
    domain = [('number','=',rec['number']),('game_id','=',game_id) ]

    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass
    

def schedule_multi():
    for rec in records['og.schedule']:
        schedule_one(rec)

def deal_one(rec):
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
    

def deal_multi():
    for rec in records['og.deal']:
        deal_one(rec)

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

def round_one(rec):
    
    phase_id = rec['phase_id']
    schedule_id = rec['schedule_id']
    
    domain = [('number','=',phase_id),('game_id','=',game_id) ]
    phase_id = search_one('og.phase', domain )
    
    domain = [('number','=',schedule_id),('game_id','=',game_id) ]
    schedule_id = search_one('og.schedule', domain )

    
    rec = rec.copy()
    rec['phase_id'] = phase_id
    rec['schedule_id'] = schedule_id
    
    model = 'og.round'
    domain = [('phase_id','=',phase_id),('schedule_id','=',schedule_id) ]

    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass

def round_multi():
    for rec in records['og.round']:
        round_one(rec)


def team_one(rec):
    phase_ids = rec.get('phase_ids',[])
    
    if phase_ids:
        domain = [('number','in',phase_ids),('game_id','=',game_id) ]
        phase_ids = execute(usid, 'og.phase', 'search', domain )


    rec = rec.copy()
    rec['game_id'] = game_id
        
    rec['phase_ids'] = [(6,0,phase_ids)]
    
    model = 'og.team'
    domain = [('number','=',rec['number']),('game_id','=',game_id) ]

    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass

def team_multi():
    for rec in records['og.team']:
        team_one(rec)


def tri_one(rec):
    team_id = rec['team_id']
    round_id = rec['round_id']
    model = 'og.team.round.info'
    domain = [('round_id','=',round_id),('team_id','=',team_id) ]

    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass

def tri_circle_multi():
    domain = [('org_type','in',['circle']),('game_id','=',game_id) ]
    phases = execute(usid, 'og.phase', 'search_read', domain, ['round_ids'])
    for phase_index, phase in enumerate(phases)  :
        round_ids = phase['round_ids']
        rounds = execute(usid, 'og.round', 'read', round_ids, ['number','team_ids'])
        
        
        for round in rounds:
            team_ids = round['team_ids']
            teams = execute(usid, 'og.team', 'search_read', 
                            [('id','in',team_ids)], ['number'], order='number')
            
            
            pos_nums = dict((team, index+1) for index, team in enumerate(
                                round_turn[len(teams)][round['number']-1]))
            
            for vals in [ { 'round_id': round['id'], 
                            'team_id': team['id'],
                            'number': pos_nums[index+1] + phase_index * len(teams)
                          } for index, team in enumerate(teams) ]:
                          
                tri_one(vals)
                pass
                print vals
            

def tri_manule_one(rec):
    team_id = rec['team_id']
    phase_id = rec['phase_id']
    schedule_id = rec['schedule_id']
    
    number = rec['number']
    
    domain = [('number','=',team_id),('game_id','=',game_id) ]
    team_id = search_one('og.team', domain )
    
    domain = [('number','=',phase_id),('game_id','=',game_id) ]
    phase_id = search_one('og.phase', domain )
    
    domain = [('number','=',schedule_id),('game_id','=',game_id) ]
    schedule_id = search_one('og.schedule', domain )
    
    domain = [('schedule_id','=',schedule_id),('phase_id','=',phase_id) ]
    round_id = search_one('og.round', domain )
    
    
    vals = {
        'number': rec['number'],
        'round_id':round_id,
        'team_id': team_id
    }
    
    model = 'og.team.round.info'
    domain = [('round_id.schedule_id','=',schedule_id),('number','=',rec['number']) ]

    id = find(model, domain, record=vals )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass

def tri_manule_multi():
    for rec in records['og.team.round.info']:
        tri_manule_one(rec)
    


def match_one(rec):
    host_tri_id = rec['host_tri_id']
    guest_tri_id = rec['guest_tri_id']
    round_id = rec['round_id']
    model = 'og.match'
    
    domain = [('tri_id','=',host_tri_id),('position','=','host' ) ]
    match_teams_host  = execute(usid, 'og.match.team', 'search_read', domain , ['match_id'])
    match_ids_host = [ mt['match_id'][0] for mt in match_teams_host ]
    
    domain = [('tri_id','=',guest_tri_id),('position','=','guest' ) ]
    match_teams_guest = execute(usid, 'og.match.team', 'search_read', domain , ['match_id'])
    match_ids_guest = [ mt['match_id'][0] for mt in match_teams_guest ]
    
    match_ids = match_ids_host + match_ids_guest
    
    domain = [('id','in',match_ids) ]
    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass

def match_multi():
    
    domain = [('game_id','=',game_id )]
    
    tris = execute(usid, 'og.team.round.info', 'search_read', 
                   domain, ['number','round_id','team_id','match_id'],
                   order='round_id, number')
    hosts = [{'round_id': tri['round_id'][0], 
              'host_tri_id': tri['id'],
             } for index, tri in enumerate(tris) if index % 2 == 0  ]
    
    guests= [{'round_id': tri['round_id'][0], 
              'guest_tri_id': tri['id'],
              'number': tri['number']
             } for index, tri in enumerate(tris) if index % 2 == 1 ]
    
    
    guests = dict( (index, guest) for index, guest in enumerate(guests) )
    
    
    for vals in [ { 'round_id': host['round_id'], 
                    'host_tri_id':  host['host_tri_id'] , 
                    'guest_tri_id': guests[index]['guest_tri_id'],
                    'number': guests[index]['number'] / 2 ,
                   } for index, host in enumerate(hosts) ]:
        match_one(vals)
        pass
        print vals


def table_one(rec):
    match_id = rec['match_id']
    room_type = rec['room_type']

    model = 'og.table'
    domain = [('match_id','=',match_id),('room_type','=',room_type ) ]
    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass

def table_multi():
    domain = [('game_id','=',game_id ),   ]
    matchs = execute(usid, 'og.match', 'search_read', domain, ['number'] )
    
    for vals in [ {'match_id': match['id'], 'number': match['number'] + 100, 'room_type': 'open' } for match in matchs ] + [
                  {'match_id': match['id'], 'number': match['number'] + 200, 'room_type': 'close'} for match in matchs ]:
        table_one(vals)
    


def res_users_one(rec):
    model = 'res.users'
    domain = [('login','=',rec['login']) ]
    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass

def res_users_multi():
    
    for rec in records['res.users']:
        res_users_one(rec)
    

def team_player_one(rec):
    partner_id = rec['partner_id']
    team_id = rec['team_id']

    domain = [('name','=',partner_id ),   ]
    partner_id = search_one( 'res.partner', domain )
    
    print partner_id

    domain = [('number','=',team_id ), ('game_id','=',game_id)  ]
    team_id = search_one( 'og.team', domain )

    print team_id
    
    model = 'og.team.player'
    domain = [('partner_id','=',partner_id ), ('team_id','=',team_id )]
    
    vals = { 'partner_id': partner_id, 'team_id': team_id }
    id = find(model, domain, record=vals )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass

def team_player_multi():

    for rec in records['og.team.player']:
        team_player_one(rec)
    

def table_player_one(rec):
    table_id = rec['table_id']
    position = rec['position']
    model = 'og.table.player'
    domain = [('table_id','=',table_id ),('position','=',position )   ]
    id = find(model, domain, record=rec )
    print id
    if id:
        #print execute(usid, model, 'read', id)
        pass


def table_player_multi():
    domain = [('game_id','=',game_id) ]
    
    tables = execute(usid, 'og.table', 'search_read', domain, ['number'] )
    
    def fn(tno):
        dm = [('name','=',tno)]
        return search_one( 'og.team.player', dm )
    
    for table in tables:
        vals = {
            'table_id':  table['id'],
            'player_id': fn(table['number']),
            'position':  'S',
        }
        
        table_player_one(vals)
    

game_id = game_one()
schedule_multi()
deal_multi()
phase_multi()
round_multi()
team_multi()
tri_circle_multi()
tri_manule_multi()
match_multi()

table_multi()   
res_users_multi()
team_player_multi()
table_player_multi()
"""
"""

def input_score():
    print('usid')
    result = UserSudo().login('101','101.101')
    
    print result
    
    usid = result['sid']
    uid = result['uid']
    
    res = execute(usid, 'res.users', 'read', uid, 
      ['name', 'doing_table_ids', 'team_player_ids', 'todo_table_ids'] )
    
    print res

input_score()