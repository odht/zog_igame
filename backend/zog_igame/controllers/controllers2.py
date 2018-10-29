# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.



import logging
_logger = logging.getLogger(__name__)


from odoo import http

from odoo.http import request
from odoo.service import security
from odoo.service import model

import redis

def get_message(table_id):
    red = redis.StrictRedis(host='localhost', port=6379, db=6)
    pubsub = red.pubsub()
    #pubsub.subscribe('table' + str(table_id) )
    pubsub.subscribe('chat')
    for message in pubsub.listen():
        data = bytes(message['data']).decode('utf8')
        # if 'close' in data:   # 这里可以完成 断开操作。
        #     print("llllllllllllll")
        #     data = 'id:close\n'
        #     return data
        ds = [  ord(d) for d in data ]
        _logger.error('123456789=%s--%s', type(data),ds )
        data = 'data: %s\n\n' % (data and data or '122323')

        yield data

    return 1

class GameBrg(http.Controller):
    @http.route('/game/bridge/stream/<int:table_id>',
                 type='http', auth='none', cors='*',csrf=False)
    def stream(self, table_id,**kw):
         #user = request.env.user
         headers = [('Content-type','text/event-stream')]
         data = get_message(table_id)
         response = request.make_response(data, headers)
         return response


    @http.route('/game/bridge/play/<int:table_id>', 
                 type='http', auth='none',cors='*',csrf=False)
    def play(self, table_id,**kw):
         #user = request.env.user
         # pos, card =E, SA
         # self.env[og.borad].play(pos, card)
         # player  = self.env[og.borad].player
         # tricks  = self.env[og.borad].tricks
         #msg =  user.name + ','+ str(kw)
         msg = str(kw)
         red = redis.StrictRedis(host='localhost', port=6379, db=6)
         red.publish('chat', msg)
         return str(1)

         #return str(game_id) + '===='+str(uid)+str(kw) 
         #return "Hello, world"

    @http.route('/game/bridge/login',type='json', auth='none', cors='*', csrf=False )
    def login(self,**kw):
        json = http.request.jsonrequest

        #if not request.uid:
        #if request.uid and json.get('sid'):
        #    session = http.root.session_store.get(json['sid'])
        #    return { 'sid': session.sid }

        db = json['server']
        user = json['user']
        password = json['password']
        uid = http.request.env['res.users'].authenticate(
                     db,user,password,None )
        if not uid:return False


        session = http.request.session
        session.db = db
        session.uid = uid
        session.login = user
        session.session_token = uid and security.compute_session_token(session)
        session.context = http.request.env['res.users'].context_get() or {}
        session.context['uid'] = uid
        session._fix_lang(session.context)
        http.root.session_store.save(session)
        return { 'sid': session.sid }




    def check_session(self,sid):
        try:
            session = http.root.session_store.get(sid)
            if(security.check_session(session)):
                return session
        except:
            return False



    @http.route('/game/bridge/api',type='json', auth='none', cors='*', csrf=False )
    def getgame(self,**kw):
        json = http.request.jsonrequest
        session = self.check_session(json['sid'])
        if not session:
            return {'message：':'AccessDenied'}

        db = session.db
        uid = session.uid
        user = http.request.env['res.users'].sudo().browse(uid)
        model_name = json['model']
        method=json['method']
        args = json.get('args',() )
        kw = json.get('kw',{})

        ret = model.execute_kw(db,uid, model_name, method, args, kw)

        #obj = http.request.env['ogi.game.brg'].sudo()


        #ret = getattr(obj,method).()
        return ret









