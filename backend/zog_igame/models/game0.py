# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

import logging

_logger = logging.getLogger(__name__)

from .arrange_tools import circle_arrange, swiss_arrange

class Game(models.Model):
    _inherit = "og.game"

    @api.multi
    def game_circle(self,vals):
        # table起始number
        table_num   = vals['table_num']
        # 参赛队
        team_ids    = vals['team_ids']
        # 参赛队数据，用来生成循环赛开闭室参数
        new_team_ids = team_ids.copy()

        if(len(team_ids)%2==1):
            new_team_ids.append('#')

        if(vals['org_type']!='circle'):
            return (-2,'Incorrect type of event')

        round_num = vals['round_num']

        # 循环赛明细数据
        data = circle_arrange(new_team_ids)
        open_table_data = data[0]
        #print('open_table_data:::',open_table_data)

        if(round_num != len(open_table_data)):
            return(-3,'The number of rounds is incorrect')

        round_ids = self.create_phase(vals,round_num)
        for i in range(round_num):
            self.create_one_round(round_ids[i],table_num,open_table_data[i])

        #print(fields.Date.today)
        return 0


    @api.multi
    def game_swiss(self,vals):
        # table起始number
        table_num   = vals['table_num']
        # 参赛队
        team_ids    = vals['team_ids']
        # 参赛队数据，用来生成循环赛开闭室参数
        new_team_ids = team_ids.copy()
        if(len(team_ids)%2==1):
            new_team_ids.append('#')

        if(vals['org_type']!='swiss'):
            return (-2,'Incorrect type of event')

        round_num = vals['round_num']
        match_num = len(new_team_ids)//2

        match_data=[]
        for i in range(match_num):
            match_data.append([new_team_ids[i*2],new_team_ids[i*2+1]])

        round_ids = self.create_phase(vals,round_num)

        self.create_one_round(round_ids[0],table_num,match_data)

        return 0

    @api.multi
    def get_arrange_data(self,vals):
        table_num   = vals['table_num']
        #print('table_num::::::::::::',table_num)
        currentRound = self.round_ids.search([('id', '=', vals['round_id'])])
        lastRound = self.round_ids.search([('number', '=', currentRound.number-1),
                                           ('phase_id','=',currentRound.phase_id.id)])
        #infos1 = self.env['og.team.round.info'].search([ ('round_id','=',lastRound.id) ])
        infos = self.env['og.team.round.info'].search([ ('round_id','=',lastRound.id) ])
        #infos = infos1.sorted( key=lambda info: info.rank_close, reverse=True)
        match_data = self._compute_arrange_data(vals)
        new_match_data = []
        for i in range(len(match_data)):
            match = match_data[i]
            #new_match = []
            for team_id in match:
                for info in infos:
                    if info.team_id.id == team_id:
                         #new_match.append({
                         new_match_data.append({
                            'table_number'  :   i+int(table_num[0]),
                            'team'          :   str(info.team_id.number)+'  '+info.team_id.name,
                            'imp'           :   info.imp,
                            'vp'            :   info.vp,
                            'score_manual'  :   info.score_manual
                            })
            #new_match_data.append(new_match)
        return new_match_data


    @api.multi
    def arrange(self,vals):
        table_num = vals['table_num']
        currentRound = self.round_ids.search([('id', '=', vals['round_id'])])
        match_data = self._compute_arrange_data(vals)
        self.create_one_round(currentRound,table_num,match_data)
        return 0


    def _compute_arrange_data(self,vals):
        no_arrange_team_ids = vals['no_arrange_team_ids']
        arrange_team_rank = vals['arrange_team_rank']

        currentRound = self.round_ids.search([('id', '=', vals['round_id'])])
        lastRound = self.round_ids.search([('number', '=', currentRound.number-1),
                                           ('phase_id','=',currentRound.phase_id.id)])

        infos1 = self.env['og.team.round.info'].search([ ('round_id','=',lastRound.id) ])
        #infos = infos1.sorted( key=lambda info: info.rank_close, reverse=True)
        infos = infos1.sorted( key=lambda info: info.rank_close)

        teams =  [ i.team_id.id for i in infos  
                         if (i.team_id.id not in no_arrange_team_ids 
                         and i.rank_close in list(range(arrange_team_rank[0],arrange_team_rank[1]+1)) ) ]
        '''
        team111 =  [ [i.team_id.id,i.team_id.name,i.rank_close] for i in infos  
                         if (i.team_id.id not in no_arrange_team_ids 
                         and i.rank_close in list(range(arrange_team_rank[0],arrange_team_rank[1]+1)) ) ]
        '''
        if len(teams)%2==1:
            teams.append('#')

        done_round = self.round_ids.search([
                        ('phase_id', '=', currentRound.phase_id.id),
                        ('id','<',currentRound.id)])
        rounds = []
        for r in done_round:
            for m in r.match_ids:
                a = tuple([ mm.team_id.id for mm in m.match_team_ids ])
                rounds.append(a)
        datas = swiss_arrange(teams.copy(),rounds)
        match_data = datas[len(datas)-len(teams)//2:]
        '''
        print('teams::::',teams)
        print('teams111:',team111)
        print('rounds:::',rounds)
        print('datas:::',datas)
        print('match_data:::',match_data)
        '''
        return match_data

    def create_phase(self,vals,round_num):
        # 小组即phase的编号
        number      = len(self.phase_ids)+1
        # 每个赛段的起始时间
        dates = vals['dates']
        # 参赛队
        team_ids    = vals['team_ids']
        # 新创建的分组参数
        phase_val = {
            'game_id'   :   self.id,
            'name'      :   vals['name'],
            'org_type'  :   vals['org_type'],
            'round_time':   vals['time'],
            'team_ids'  :   [(6,0,team_ids)],
            'number'    :   number,
            'sequence'  :   number,
            'bye_vp'    :   vals['bye_vp'],
            'bye_imp'   :   vals['bye_imp']
        }
        phase = self.phase_ids.create(phase_val)

        round_ids = []
        for i in range(round_num):
            # 赛程参数
            schedule_val = {
                'game_id'   :   self.id,
                'name'      :   'schedule'+str(i+1),
                'number'    :   i+1,
                'date_from' :   dates[i][0],
                'date_thru' :   dates[i][1]
            }
            schedule = self.schedule_ids.create(schedule_val)
            schedule_id = schedule.id
            deal_ids = []
            # 创建deal
            for index in list(range(vals['deal_num'])):
                deal = schedule.deal_ids.create({'number':index+1})
                #print('createDeal:::',deal)
                deal_ids.append(deal.id)
            # 把创建的deal关联到schedule,自动完成了？
                #schedule.write({'deal_ids':[(4,deal.id,0)]})
            schedule.write({'deal_ids':[(6,0,deal_ids)]})

            # 轮次参数
            round_val = {
                'name'          :   phase.name+'第'+str(i+1)+'轮',
                'phase_id'      :   phase.id,
                'schedule_id'   :   schedule_id,
                'number'        :   i+1,
                'sequence'      :   i+1
            }
            oneRound = self.round_ids.create(round_val)
            round_ids.append(oneRound)
        return round_ids


    def create_one_round(self,oneRound,table_num,match_data):
        for i in range(len(match_data)):
            round_id = oneRound.id

            team_id1 = match_data[i][0]
            team_id2 = match_data[i][1]

            if team_id1 == '#':
                self.env['og.team.round.info'].create({
                    'name'      :   'tri'+str(i+1),
                    'round_id'  :   round_id,
                    'team_id'   :   team_id2
                })
            elif team_id2 == '#':
                self.env['og.team.round.info'].create({
                    'name'      :   'tri'+str(i+1),
                    'round_id'  :   round_id,
                    'team_id'   :   team_id1
                })
            else:
                host_tri_val = {
                    'name'      :   'tri'+str(i+1),
                    'round_id'  :   round_id,
                    'team_id'   :   match_data[i][0]
                }
                HostTri = self.env['og.team.round.info'].create(host_tri_val)
                    #print('HostTri:::',HostTri)
                guest_tri_val = {
                    'name'      :   'tri'+str(i+1),
                    'round_id'  :   round_id,
                    'team_id'   :   match_data[i][1]
                }
                GuestTri = self.env['og.team.round.info'].create(guest_tri_val)
                match_val = {
                    'number'        :   i+table_num[0],
                    'round_id'      :   round_id,
                    'host_tri_id'   :   HostTri.id,
                    'guest_tri_id'  :   GuestTri.id
                }
                match = oneRound.match_ids.create(match_val)
                open_table_val = {
                    'number'    :   i+table_num[0],
                    'match_id'  :   match.id,
                    'room_type' :   'open'
                }
                close_table_val = {
                    'number'    :   i+table_num[0],
                    'match_id'  :   match.id,
                    'room_type' :   'close'
                }
                open_table = match.table_ids.create(open_table_val)
                close_table = match.table_ids.create(close_table_val)
                open_table_channel_val = {
                    'name'      :   open_table.name,
                    'table_id'  :   open_table.id,
                    'type'      :   'player'
                }
                close_table_channel_val = {
                    'name'      :   close_table.name,
                    'table_id'  :   close_table.id,
                    'type'      :   'player'
                }
                open_table_channel = open_table.channel_ids.sudo().create(open_table_channel_val)
                close_table_channel = close_table.channel_ids.sudo().create(close_table_channel_val)


class Table(models.Model):
    _inherit = "og.table"

    @api.multi
    # vals:table_id,partner_id,team_id,pos(NSEW)
    def sit_down1(self,vals):
        #domain = [['partner_id', '=', vals['partner_id']], ['team_id', '=', vals['team_id']]]
        domain = [('partner_id', '=', vals['partner_id']), ('team_id', '=', vals['team_id'])]
        pos = vals['pos']
        team_player = self.player_ids.search(domain)

        channel = self.channel_ids.mail_channel_id

        team_id = vals['team_id']

        ns_id = self.ns_team_id.id
        ew_id = self.ew_team_id.id
        s_id = self.south_id.id
        n_id = self.north_id.id
        e_id = self.east_id.id
        w_id = self.west_id.id

        # 判断牌手是否在某个队伍里
        if(not team_player):
            return (-1,'您还没有加入参赛队')

        #import pdb;pdb.set_trace()
        if( ((pos in ['S','N']) and (team_id != ns_id)) or ((pos in ['E','W']) and (team_id != ew_id)) ):
            return (-3,'您选择了不正确的方位')
        res = self._check(pos,team_player)

        if(res[0]<0):
            return res

        members = channel.sudo().channel_last_seen_partner_ids
        # 如果牌手不在channel里，把他添加进去
        if(vals['partner_id'] not in [m.partner_id.id for m in members]):
            channel.sudo().write({
                'channel_last_seen_partner_ids':[(0,0,{'partner_id':vals['partner_id']})]
            })
        if(res[0]==0):
            return res

        # 座位上添加人（创建table_player）
        table_player_val = {
            'table_id'  :   self.id,
            'player_id' :   team_player.id,
            'position'  :   vals['pos']
        }
        table_player = self.table_player_ids.create(table_player_val)
        return (0,{'player_id':table_player.id})

    @api.multi
    def sit_down(self, vals):
        #import pdb;pdb.set_trace()
        ret = self.sit_down1(vals)
        if ret[0]==0:
            doing_board = self.doing_board_id
            info = doing_board._get_info()
            doing_board.sudo().message_post('join', [vals['pos'],'玩家上线啦'], info)
            '''
            for rec in self:
                doing_board = self.doing_board_id
                info = doing_board._get_info()
                print(111111111111111111)
                print(doing_board.message_post('join', [vals['pos'],'玩家上线啦'], info))
            '''

        return ret



    def _check(self,pos,team_player):
        contrary_tablePlayer_ids = self.match_id.table_ids.filtered(lambda t: t.id !=self.id ).player_ids
        if(team_player in contrary_tablePlayer_ids):
            return(-5,'您已经在相反的房间入座了')
        #原本座位的id
        pos_team_plater_id = ''
        contrary_pos_team_plater_id = ''
        if(pos=='S'):
            pos_team_plater_id = self.south_id.id
            contrary_pos_team_plater_id = self.north_id.id
        if(pos=='N'):
            pos_team_plater_id = self.north_id.id
            contrary_pos_team_plater_id = self.south_id.id
        if(pos=='E'):
            pos_team_plater_id = self.east_id.id
            contrary_pos_team_plater_id = self.west_id.id
        if(pos=='W'):
            pos_team_plater_id = self.west_id.id
            contrary_pos_team_plater_id = self.east_id.id
        if(contrary_pos_team_plater_id==team_player.id):
            return(-4,"您已经在对面方位坐下了")
        if(not pos_team_plater_id):
            return (1,'')
        if(pos_team_plater_id!=team_player.id):
            return(-2,'这个座位已经有人使用了')
        table_player = self.table_player_ids.search(
            [('player_id', '=', pos_team_plater_id),
            ('table_id','=',self.id)]
        )
        return (0,{'player_id':table_player.id})



    @api.multi
    def leave1(self,vals):

        # 从牌桌移除player，暂时不用此功能
        #self.write({'table_player_ids':[(2,vals['player_id'],0)]})
        #import pdb;pdb.set_trace()
        channel = self.channel_ids.mail_channel_id
        members = channel.sudo().channel_last_seen_partner_ids
        print('members::::::::::',members)
        for member in members:
            print('member::::::',member)
            print(vals['partner_id']==member.partner_id.id)
            if(vals['partner_id']==member.partner_id.id):
                # 将用户从消息频道里移除
                print('成功离开')
                res = channel.sudo().write({
                    'channel_last_seen_partner_ids' :   [(2,member.id,0)]
                })
                return 0
        return 1

    @api.multi
    def leave(self,vals):
        res = self.leave1(vals)
        print('res::::',res)
        pos = self.table_player_ids.filtered(lambda tp: tp.id == vals['player_id'] ).position
        if res == 0 :
            doing_board = self.doing_board_id
            info = doing_board._get_info()
            print(doing_board.sudo().message_post('leave', [pos,'玩家下线啦'], info))
            '''
            for rec in self:
                doing_board = self.doing_board_id
                info = doing_board._get_info()
                print(doing_board.message_post('leave', [pos,'玩家下线啦'], info))
            '''
            

class TablePlayer(models.Model):
    _inherit = "og.table.player"

    # 在线状态
    online = fields.Boolean(compute = '_compute_online')
    @api.multi
    def _compute_online(self):
        for rec in self:
            members = rec.table_id.channel_ids.mail_channel_id.sudo().channel_last_seen_partner_ids
            rec.online = True if rec.partner_id.id in [m.partner_id.id for m in members] else False
                       




