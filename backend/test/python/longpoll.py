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
        headers = {"content-type": "application/json" }
        if sid:                      
            headers.update( {"X-Openerp-Session-Id":sid} )

        params1 = params and params.copy() or {}
        data1 = {"jsonrpc":"2.0",
                "method":"call",
                "id":123,
                "params":data and data or {}
                }
        
        if not client:
            client=requests
        
        rspd = client.post(uri,params=params1,
                          data=json.dumps(data1),
                          headers=headers)
        #ret(rspd)
        #print( 'rspd=', rspd)
        return json.loads(rspd.content).get('result',{})

def execute(sid, model, method, *args, **kwargs ):
    return jsonrpc(URI_API,{'model':model, 'method': method, 'args': args, 'kwargs': kwargs},sid=sid )

api = execute

class UserSudo(object):
    def login(self,user,psw,db=SERVER):
        """  check ok uid
        """
        result = jsonrpc(URI_LOGIN, {'db': db,'login':user, 'password':psw, 'type':'account'} )
        return result.get('sid',None)

    def register(self,user,psw, db=SERVER):
        """  sudo(), create(), uid
        """
        return jsonrpc(URI_REGISTER, {'db': db,'login':user, 'password':psw} )

    def reset_password(self, user,newpsw, db=SERVER):
        """  sudo(), write(), uid
        """
        return jsonrpc(URI_RESET_PASSWORD, {'db': db,'login':user, 'password':newpsw} )
        
print('usid')
#usid = UserSudo().login('admin','123')
usid = UserSudo().login('A13','123')
print(usid)


print( 't4 msg poll')
def t4(host=HOST):
    client = requests.session()

    uri = host + '/longpolling/igame'

    last = 0
    while(1):
        print 12312312313
        
        data = {"channels":[],"last":last }
        rslt = jsonrpc(uri,data=data,client=client, sid=usid )
        
        if not rslt:
            print( last )

        for r in rslt:
            #print( r )
            print( 'last, newid,channel:',last, r['id'], r['channel'])
            print( r.get('msg') )

        
        ids = [  r['id'] for r in rslt ] 
        last =  ids and (  max( ids ) ) or last


t4()
