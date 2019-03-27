# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

import logging

_logger = logging.getLogger(__name__)

from .arrange_tools import circle_arrange

class Game(models.Model):
    _inherit = "og.game"

    @api.multi
    def game_circle(self,vals):

        # 小组即phase的编号
        number      = len(self.phase_ids)+1
        # 每个赛段的起始时间
        dates = vals['dates']
        # table起始number
        table_num   = vals['table_num']
        # 参赛队
        team_ids    = vals['team_ids']
        # 参赛队数据，用来生成循环赛开闭室参数
        new_team_ids = team_ids.copy()
        # 当队伍数量为奇数时用#补全，功能待开发
        if(len(team_ids)%2==1):
            return (-1,'The number of teams must be even')
        '''
        if(len(team_ids)%2==1):
            new_team_ids.append('#')
        '''

        # 循环赛明细数据
        data = circle_arrange(new_team_ids)
        open_table_data = data[0]
        close_table_data = data[1]

        #print('open_table_data:::',open_table_data)

        # 新创建的分组参数
        phase_val = {
            'game_id'   :   self.id,
            'name'      :   vals['name'],
            'org_type'  :   vals['org_type'],
            'round_time':   vals['time'],
            'team_ids'  :   [(6,0,team_ids)],
            'number'    :   number,
            'sequence'  :   number
        }
        phase = self.phase_ids.create(phase_val)
        #print('createPhase:::::',phase)

        # 用开室数据的长度循环，生成schedule，round，match
        for i in range(len(open_table_data.copy())):

            # 赛程参数
            schedule_val = {
                'game_id'   :   self.id,
                'name'      :   'schedule'+str(i+1),
                'number'    :   i+1,
                'date_from' :   dates[i][0],
                'date_thru' :   dates[i][1]
            }
            #print('schedule_val::::',schedule_val)
            schedule = self.schedule_ids.create(schedule_val)
            #print('createSchedule::::',schedule)
            schedule_id = schedule.id
            deal_ids = []
            # 创建deal
            for index in list(range(vals['deal_num'])):
                deal = schedule.deal_ids.create({'number':index+1})
                print('createDeal:::',deal)
                deal_ids.append(deal.id)
            # 把创建的deal关联到schedule
                #schedule.write({'deal_ids':[(4,deal.id,0)]})
            #print('deal_ids:::',deal_ids)
            schedule.write({'deal_ids':[(6,0,deal_ids)]})

            # 轮次参数
            round_val = {
                'name'          :   'round'+str(i+1),
                'phase_id'      :   phase.id,
                'schedule_id'   :   schedule_id,
                'number'        :   i+1,
                'sequence'      :   i+1
            }
            oneRound = self.round_ids.create(round_val)
            #print('oneRound:::',oneRound)
            round_id = oneRound.id

            for index1 in range(len(open_table_data[i])):
                # TBD：队伍的数量为奇数时，如何带份？
                '''
                print(open_table_data[i][index1])   # 开室第一组对抗的第一个队伍id
                print(close_table_data[i][index1])  # 开室第一组对抗的第二个队伍id
                '''
                host_tri_val = {
                    'name'      :   'tri'+str(index1+1),
                    'round_id'  :   round_id,
                    'team_id'   :   open_table_data[i][index1][0]
                }
                #print('host_tri_val::::::::',host_tri_val)
                # 主队team_round_info，为创建match服务
                HostTri = self.env['og.team.round.info'].create(host_tri_val)
                #print('HostTri:::',HostTri)
                guest_tri_val = {
                    'name'      :   'tri'+str(index1+1),
                    'round_id'  :   round_id,
                    'team_id'   :   open_table_data[i][index1][1]
                }
                #print('guest_tri_val::::',guest_tri_val)
                # 客队team_round_info，为创建match服务
                GuestTri = self.env['og.team.round.info'].create(guest_tri_val)
                #print('GuestTri:::',GuestTri)

                match_val = {
                    'number'        :   index1+table_num[0],
                    'round_id'      :   round_id,
                    'host_tri_id'   :   HostTri.id,
                    'guest_tri_id'  :   GuestTri.id
                }
                #print('match_val::::',match_val)
                # 创建match
                match = oneRound.match_ids.create(match_val)
                #print('match:::',match)

                # 创建table
                open_table_val = {
                    'number'    :   index1+table_num[0],
                    'match_id'  :   match.id,
                    'room_type' :   'open'
                }
                close_table_val = {
                    'number'    :   index1+table_num[0],
                    'match_id'  :   match.id,
                    'room_type' :   'close'
                }
                open_table = match.table_ids.create(open_table_val)
                close_table = match.table_ids.create(close_table_val)
                #print('tables:::',open_table,close_table)

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
                # 创建频道，此时没有table_player，因此，channel里的成员也是空，用户进入牌桌后手动添加成员
                open_table_channel = open_table.channel_ids.create(open_table_channel_val)
                close_table_channel = close_table.channel_ids.create(close_table_channel_val)
                # 把频道id添加到table，已自动完成，下面这两行代码不用写
                #open_table.write({'channel_ids':[(6,0,[open_table_channel.id])]})
                #close_table.write({'channel_ids':[(6,0,[close_table_channel.id])]})

                #print('channel::::',open_table_channel,close_table_channel)

        #print(fields.Date.today)
        return 0

class Table(models.Model):
    _inherit = "og.table"

    @api.multi
    # vals:table_id,partner_id,team_id,pos(NSEW)
    def sit_down(self,vals):
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
            return (-1,'Not joining any team')

        #import pdb;pdb.set_trace()

        if( ((pos in ['S','N']) and (team_id != ns_id)) or ((pos in ['E','W']) and (team_id != ew_id)) ):
            return (-3,'In the wrong position')
        res = self._check(pos,team_player)

        if(res[0]<0):
            return res

        members = channel.channel_last_seen_partner_ids
        # 如果牌手不在channel里，把他添加进去
        if(vals['partner_id'] not in [m.partner_id.id for m in members]):
            channel.write({
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


    def _check(self,pos,team_player):
        p_id = ''
        if(pos=='S'):
            p_id = self.south_id.id
        if(pos=='N'):
            p_id = self.north_id.id
        if(pos=='E'):
            p_id = self.east_id.id
        if(pos=='W'):
            p_id = self.west_id.id
        if(not p_id):
            return (1,'')
        if(p_id!=team_player.id):
            return(-2,'Seats have been used')
        table_player = self.table_player_ids.search([('player_id', '=', p_id),('table_id','=',self.id)])
        return (0,{'player_id':table_player.id})



    @api.multi
    def leave(self,vals):

        # 从牌桌移除player，暂时不用此功能
        #self.write({'table_player_ids':[(2,vals['player_id'],0)]})

        channel = self.channel_ids.mail_channel_id
        members = channel.channel_last_seen_partner_ids
        for member in members:
            if(vals['partner_id']==member.partner_id.id):
                # 将用户从消息频道里移除
                res = channel.write({
                    'channel_last_seen_partner_ids' :   [(2,member.id,0)]
                })
        pass

class Table(models.Model):
    _inherit = "og.table.player"

    # 在线状态
    online = fields.Boolean(compute='_compute_online')
    @api.multi
    def _compute_online(self):
        for rec in self:
            members = self.table_id.channel_ids.mail_channel_id.channel_last_seen_partner_ids
            rec.online = True if rec.partner_id.id in [m.partner_id.id for m in members] else False
        


