# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

def circle_arrange(team_ids):

    # 参赛队id
    teams = team_ids
    # 参赛队数量
    match_amount = len(teams)


    # 轮次 = 参赛队数量 - 1
    turns = match_amount - 1

    # 桌数 （分为 开室闭室，同时进行，因此只要考虑 一个房间即可）
    tables = int(match_amount/2)

    # 开闭室赛程
    openroom = []
    closeroom = []


    def arrange():
        t = teams.copy();
        t1 = teams.pop(0)

        for i in range(turns):
            _t1 = t[:tables]
            _t2 = t[tables:]
            _t2.reverse()
            _t11 = _t1.copy()
            _t22 = _t2.copy()
            openroom.append([])
            closeroom.append([])
            for j in range(tables):
                openroom[i].append((_t1.pop(),_t2.pop()))

            for j in range(tables):
                closeroom[i].append((_t22.pop(),_t11.pop()))

            #print("\n")
            teams.append(teams.pop(0))
            t = teams.copy()
            t.insert(0,t1)
    
    arrange()
    return [openroom,closeroom]
