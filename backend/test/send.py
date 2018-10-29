# coding: utf-8 -*- coding: UTF-8 -*-

import requests
import json

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
        #ret(rspd)
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

    def register(self,user,psw, db=SERVER):
        """  sudo(), create(), uid
        """
        return jsonrpc(URI_REGISTER, {'db': db,'login':user, 'password':psw} )

    def reset_password(self, user,newpsw, db=SERVER):
        """  sudo(), write(), uid
        """
        return jsonrpc(URI_RESET_PASSWORD, {'db': db,'login':user, 'password':newpsw} )
    
print('usid')
usid = UserSudo().login('admin','123').get('sid',None)
print(usid)


print( 't3 msg post' )

def t3(host=HOST):
    headers = {"content-type": "application/json"  }
    
    uri = host + '/web/dataset/call_kw/mail.channel/message_post'
    uri = host + '/web/dataset/call_kw'
    uri = host + '/json/api'
    
    
    msg_bid = {
        'uid':1,
        'board_id': 2,
        'table_id': 1,
        'state': 'bidding',
        'bidder': 'E',
        'call_ids':[1,2,3,4],
    }
    
    msg_play = {
        'uid':1,
        'board_id': 2,
        'table_id': 1,
        'state': 'playing',
        'call_ids':[1,2,3,4],
        'declarer': 'E',
        'contract': '2NTxx',
        'player': 'E',
        'last_trick':[1,2,3],
        'current_trick':[1,2,3],
        'win': 2,
        'opp_win': 2
        
    }
    
    
    data ={
                        #"model":"mail.channel",
                        "model":"og.channel",
                        "method":"message_post",
                        "args":[10],
                        "kwargs":{
                                  #"message_type":"comment",
                                  #"subtype":"mail.mt_comment",
                                  "subject":"game",
                                  "body":json.dumps( msg_bid ),
                                  }
                      }
    

    return jsonrpc(uri,data=data,sid=usid )

#print  t3()

print( 't4 bid then msg post' )

class BaseModel(object):
    def __init__(self,sid,bd_id=None):
        self.sid = usid
        self.id = bd_id

    def read(self):
        rec = execute(self.sid,self.model,"read",self.id,self.fields)
        for field in self.fields:
            setattr(self, field, rec[0][field])
        return rec

    def search(self,domain=[]):
        rec = execute(self.sid,self.model,"search",domain)
        return rec

    def search_read(self,domain=[]):
        rec = execute(self.sid,self.model,"search_read",domain, self.fields)
        for field in self.fields:
            setattr(self, field, rec[0][field])
        return rec
        
    def name_search(self,name):
        rec = execute(self.sid,self.model,"name_search",name )
        self.read()
        return rec
        
    def create(self,vals):
        return execute(self.sid,self.model,"create",vals)
        
    def write(self,vals):
        return execute(self.sid,self.model,"write", self.id, vals)
        
    def unlink(self):
        return execute(self.sid,self.model,"create", self.id)

class Partner( BaseModel ):
    model = "res.partner"
    fields = ['name']

class User( BaseModel ):
    model = "res.users"
    fields = ['name','todo_table_ids','done_table_ids']

class Game( BaseModel ):
    model = "og.game"
    fields = ['name','group_ids','round_ids','team_ids','deal_ids']
    
class GameGroup( BaseModel ):
    model = "og.game.group"
    fields = ['name','game_id','team_ids']

class GameRound( BaseModel ):
    model = "og.game.round"
    fields = ['name','number','game_id','date_from','date_thru','deal_ids','match_ids']

class Deal( BaseModel ):
    model = "og.deal"
    fields = ['name','number','card_str','game_id','round_id','dealer','vulnerable',
           'card_ids','board_ids']

class GameTeam( BaseModel ):
    model = "og.game.team"
    fields = ['name','number','game_id','group_id','player_ids',
        'roundinfo_ids',
        'score','score_manual','score_uom']

class GameTeamPlayer( BaseModel ):
    model = "og.game.team.player"
    fields = ['name','team_id','role']

class GameTeamRoundInfo( BaseModel ):
    model = "og.game.team.round.info"
    fields = ['name','team_id','game_id','group_id','round_id','match_id',
        'score','score_manual','score_uom']

class Match( BaseModel ):
    model = "og.match"
    fields = ['name','number','game_id','round_id','group_id',
        'host_id','guest_id','match_team_ids',
        'table_ids','open_table_id','close_table_id',
        'line_ids',
        'host_imp','guest_imp','imp_manual',
        'host_vp','guest_vp','vp_manual',
        ]

class MatchTeam( BaseModel ):
    model = "og.match.team"
    fields = ['name','match_id','team_id','position','vp']

class MatchLine( BaseModel ):
    model = "og.match.line"
    fields = ['name','match_id','deal_id','host_id','guest_id',
        'open_table_id','close_table_id', 
        'open_board_id','close_board_id',
        'open_declarer', 'open_contract', 'open_result', 'open_point', 'open_ns_point', 'open_ew_point',
        'close_declarer','close_contract','close_result','close_point','close_ns_point','close_ew_point',
    ]

class Table( BaseModel ):
    model = "og.table"
    fields = ['name','number','room_type','match_id','game_id','round_id',
        'date_from','date_thru','deal_ids', 'board_ids','board_id',
        'ns_team_id','ew_team_id','table_player_ids','player_ids',
        'east_id','west_id','north_id','south_id',
        ]



class TablePlayer( BaseModel ):
    model = "og.table.player"
    fields = ['name','table_id','player_id','position',
        'match_id','partner_id','team_id', ]


class Board( BaseModel ):
    model = "og.board"
    fields = ['number','vulnerable','dealer','hands',
            'auction',
            'declarer',
            'contract',
            'openlead',
            'tricks',
            'last_trick',
            'current_trick',
            'ns_win','ew_win','result','point','ns_point','ew_point',
            'player',
            'state',
            
            ]
    
    def __init__(self,*args):
        super(Board, self).__init__(*args)


    def get_random_call(self):
        return execute(self.sid,self.model,'get_random_call',self.id)
    
    def get_random_play(self):
        return execute(self.sid,self.model,'get_random_play',self.id)
    
    def get_random_claim(self):
        return execute(self.sid,self.model,'get_random_claim',self.id)
    
    
    def bid(self,pos,call):
        return execute(self.sid,self.model,"bid",self.id,pos,call)

    def play(self,pos,card):
        return execute(self.sid,self.model,"play",self.id,pos,card)
        
    def claim(self,pos,num):
        return execute(self.sid,self.model,"claim",self.id,pos,num)
        
    def claim_ok(self,pos):
        return execute(self.sid,self.model,"claim_ok",self.id,pos)

def test_partner():

    ptn = Partner(usid,1)
    print ptn.read()

def test_user():

    self = User(usid,1)
    print self.read()
    print self.name
    
    def create(name):
        self.create({
            'login':name,
            'password': '123',
              'ref':'123',
              'name':name,
              'email':name
        })
    
    print self.search_read( [] )
    
    ret = UserSudo().login('A24','123')
    print(ret)
    
def test_game():
    
    self = Game(usid)
    
    def create(name):
        id = self.create({'name':name})
        self.id = id
        
    def search(name):
        self.id = self.search_read([['name','=',name]] )[0]['id']

    #create('中国赛')
    search('中国赛')
    print self.read()
    print self.name
    
    GroupObj = GameGroup(usid)
    RoundObj = GameRound(usid)
    
    def create_group(game_id,name):
        GroupObj.create({
            'name': name,
            'game_id': game_id
        })
    
    def create_round(game_id,name,number,date_from,date_thru):
        RoundObj.create({
            'game_id': game_id,
            'name': name,
            'number': number,
            'date_from': date_from,
            'date_thru': date_thru,
        })

    #create_group(self.id, 'A')
    #create_round(self.id, '1', 1, '2018-10-26 8:00:00','2018-10-26 11:00:00')
    
    print self.read()
    GroupObj.id = self.group_ids
    RoundObj.id = self.round_ids
    print GroupObj.read()
    print RoundObj.read()

def test_deal():
    game = Game(usid)
    def search_game(name):
        game.id = game.search_read([['name','=',name]] )[0]['id']
    search_game('中国赛')
    
    round = GameRound(usid)
    round.id = game.round_ids[0]
    
    deal = Deal(usid)
    
    def create(round_id, number, cards = None):
        vals = {'round_id': round_id, 'number': number}
        if cards:
            vals['card_str'] = cards
        deal.id = deal.create(vals)
    
    #create(round.id,1)
    #create(round.id,2,'AKQJT98765432... .AKQJT98765432.. ..AKQJT98765432. ...AKQJT98765432')
    #print deal.read()
    #print deal.read()
    
    print deal.search_read()
    deal.id = deal.search()
    print deal.read()
    
def test_round_deal():
    game = Game(usid)
    def search_game(name):
        game.id = game.search_read([['name','=',name]] )[0]['id']
    search_game('中国赛')
    
    round = GameRound(usid)
    round.id = game.round_ids[0]
    
    deal = Deal(usid)
    deal.id = deal.search()
    print deal.read()
    
    round.write({'deal_ids': [(6,0,deal.id)] })
    print round.read()

def test_team():
    game = Game(usid)
    def search_game(name):
        game.id = self.search_read([['name','=',name]] )[0]['id']
    search_game('中国赛')
    
    team = GameTeam(usid)
    
    def create(game_id,name):
        team.id = team.create({'game_id': game_id, 'name': name})
    
    def search(name):
        team.id = team.search_read([['name','=',name]])[0]['id']
    
    #create(game.id, 'A1')
    search( 'A1')
    print team.read()
    
    #create(game.id, 'A2')
    search( 'A2')
    print team.read()
    
def test_team_player():
    game = Game(usid)
    def search_game(name):
        game.id = game.search_read([['name','=',name]] )[0]['id']
    search_game('中国赛')
    
    team = GameTeam(usid)
    def search_team(name):
        team.id = team.search_read([['name','=',name]])[0]['id']
    
    search_team( 'A1')
    
    def create(name):
        player = GameTeamPlayer(usid)
        
        ptn = Partner(usid)
        ptn.id = ptn.name_search(name)[0][0]
        
        player.create({
            'team_id': team.id, 'partner_id': ptn.id, 'role':'player'
        })
    
    for name in ['A11','A12','A13','A14']:
        pass
        #create(name)
    print team.read()
    
    search_team( 'A2')
    for name in ['A21','A22','A23','A24']:
        pass
        #create(name)
    
    print team.read()

def test_set_group():
    game = Game(usid)
    def search_game(name):
        game.id = game.search_read([['name','=',name]] )[0]['id']
    search_game('中国赛')
    

    group = GameGroup(usid)
    group.id = game.group_ids[0]
    
    team = GameTeam(usid)
    team.id = game.team_ids
    #team.write({'group_id': group.id   })
    print team.read()

def test_match():
    game = Game(usid)
    def search_game(name):
        game.id = game.search_read([['name','=',name]] )[0]['id']
    search_game('中国赛')
    
    round = GameRound(usid)
    round.id = game.round_ids[0]

    group = GameGroup(usid)
    group.id = game.group_ids[0]
    
    team = GameTeam(usid)
    team.id = game.team_ids
    
    def create(number,round_id,group_id,host_id,guest_id):
        Match(usid).create({
          'number': number,
          'round_id': round_id,
          'group_id': group_id,
          'host_id': host_id,
          'guest_id': guest_id
        })
    
    #create(1,round.id,group.id,team.id[0],team.id[1])
    
    print round.read()
    print round.match_ids
    print Match(usid,round.match_ids).read()

def test_table():
    game = Game(usid)
    def search_game(name):
        game.id = game.search_read([['name','=',name]] )[0]['id']
    search_game('中国赛')
    
    round = GameRound(usid)
    round.id = game.round_ids[0]
    round.read()
    print round.match_ids
    
    match = Match(usid, round.match_ids[0])
    
    def create(name,number,room_type,match_id):
        Table(usid).create({
            'name': name,
            'number': number,
            'room_type': room_type,
            'match_id': match_id
        })
    
    #create('open.1',1,'open',match.id)
    #create('close.1',1,'close',match.id)
    
    match.read()
    tid = match.table_ids
    print tid
    print Table(usid, tid ).read()

def test_table_player():
    game = Game(usid)
    def search_game(name):
        game.id = game.search_read([['name','=',name]] )[0]['id']
    search_game('中国赛')
    
    round = GameRound(usid)
    round.id = game.round_ids[0]
    round.read()
    
    match = Match(usid, round.match_ids[0])
    match.read()
    
    
    def write(tbl, n,s,e,w):
        tbl.write({
            'north_id': n,
            'south_id': s,
            'east_id': e,
            'west_id': w,
        })
    
    table = Table(usid, match.table_ids[0] )
    table.read()
    team = GameTeam(usid)
    team.id = table.ns_team_id[0]
    team.read()
    n,s,nn,ss = team.player_ids
    
    team.id = table.ew_team_id[0]
    team.read()
    e,w,ee,ww = team.player_ids
    #write(table,n,s,e,w)

    table = Table(usid, match.table_ids[1] )
    table.read()
    team = GameTeam(usid)
    team.id = table.ns_team_id[0]
    team.read()
    nn,ss,n,s = team.player_ids
    
    team.id = table.ew_team_id[0]
    team.read()
    ee,ww,e,w = team.player_ids
    #write(table,n,s,e,w)


    table = Table(usid, match.table_ids[0] )
    print table.read()
    

    table = Table(usid, match.table_ids[0] )
    print table.read()


def test_user_play():
    res = UserSudo().login('A24','123')
    uid = res['uid']
    
    user = User(usid,uid)
    user.read()
    tid = user.todo_table_ids[0]
    table = Table(usid,tid)
    table.read()
    print table.board_id
    
    return table.board_id[0]

def test_board(bdid=None):

    board = Board(usid,bdid)
    self = board

    def bid():
        rec = board.read()
        player = board.player
        call = board.get_random_call()
        print player, call
        print board.bid(player,call)

    def play():
        self.read()
        player = self.player
        flag, pos, card = self.get_random_play()
        print flag, pos, card
        if flag:
            self.play(pos, card)
        else:
            self.claim(pos, card)

    def read():
        self.read()
        print 'deal', self.number, self.vulnerable, self.dealer
        print 'hands',self.hands
        print 'auction',self.auction
        print 'contract',self.declarer, self.contract, self.openlead
        print 'win',self.ns_win, self.ew_win
        print 'tricks', self.tricks
        print 'tricks', self.last_trick,self.current_trick
        print 'result', self.result, self.point, self.ns_point,self.ew_point
        print 'state,player',self.state,self.player

    def claim():
        self.read()
        pos, num = self.get_random_claim()
        pos = self.declarer
        print pos, num
        print self.claim(pos, num)
        self.read()
   
    #claim()
    def claim_ok_lho():
        self.read()
        pos = self.declarer
        print self.claim_ok('S',1)
    
    def claim_ok_rho():
        self.read()
        pos = self.declarer
        print self.claim_ok('N',1)
    
    #claim_ok_lho() 
    #claim_ok_rho() 
    #bid()
    play()
    read()
    
    return self.state

    
bdid = test_user_play()

state = test_board(bdid)
