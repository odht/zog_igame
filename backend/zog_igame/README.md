
controllers 是使用 redis 的例子, 已放弃该方法

og.game
1. parent_id, child_ids, 父子结构, 大比赛套小比赛
2. 末端的比赛是 org_type in [circle, swiss]
3. 比赛类型 match_type 有 队式赛(team)和双人赛(pair)

4. 以下 5-9 条介绍 team 赛
5. 包括多个小组 group_ids
6. 包括多个轮次 round_ids
7. 包括多只参赛队 team_ids
8. 赛事所打过的牌组 deal_ids = round_ids.deal_ids
9. 
10. 以下 11-16 条介绍 pair 赛
11. ...
12. 所有的牌桌 table_ids
13. ...


og.game.group
1. 小组属于某个 game
2. 一个小组包含多个 赛队

og.game.round
1. 轮次属于某个 game
2. 一个包括多个牌组 deal_ids

og.game.team
1. 赛队属于某个比赛
2. 赛队继承自 partner
3. 赛队有多个队员 og.game.team.player
4. 赛队被分配在某个小组 group_id
5. line_ids 各轮次明细
5. score0 =  sum( line_ids.score )
5. 成绩 score = score0 + score_manual
6. 排名 rank, 计算列, 根据 score 排序

og.game.team.player
1. 牌手属于某个赛队
2. 牌手继承自 partner
3. 牌手在赛队中有自己的角色

og.game.team.line
1. 赛队的成绩明细
2. 某个轮次 round_id
3. vp0 = env[og.match.team].search(match_id,team_id).vp
3. 总成绩 score = vp0 + score_manual
4. rank 计算列, 当前轮次累计成绩排名

og.deal
1. 牌张组成 card_ids
2. game_id, round_id, 该副牌首次出现在哪次比赛
3. name = 牌号 + 发牌人 + 局况
4. card_str: 牌张分步, 字符串

og.match
1. round_id, 属于某个轮次
2. deal_ids = round_ids.deal_ids
3. 有主队和客队, host_id, guest_id
3. host_id, guest_id 是计算列, 来自于 match_team_ids
3. 设置 host_id, guest_id 时, 反写在 match_team_ids 中
4. 有开闭室两张桌子 open_table_id, close_table_id
5. imp = sum(deals) + imp_manual
5. vp = imp2vp(imp) + vp_manual
6. 通过 设置 imp_manual, 调整成绩

og.match.team
1. 对应 og.match 的 host_id, guest_id
2. team_id ,reference  og.game.team
3. vp = match_id.vp
4. 仅仅作为汇总计算的基础表, 
5. 通过设置 match 的 host guest, 编辑该表

og.match.line
0. 创建 match 时自动创建 line
0. 查询用, 不可编辑
1. 对应 一个 match 的 某一副牌
2. match_id, deal_id 是 业务主键
3. 通过 match 的 open_table_id, close_table_id,
3. 以及 deal_id 获取 open_board_id, close_board_id
4. 计算每副牌的分差, diff = ( open_board_id.point - close_board_id.point )
4. 转换为 imp =point2imp( diff )

og.table
1. 若是队式赛, match_id, 某个 match
1. 若是双人赛, pair_round_id, 某个轮次
2. round_id, 属于那个轮次
2. round_id = pair_round_id or match_id.round_id
3. deal_ids = round_id.deal_ids
4. 队式赛, NS / EW 根据 match_id 的 host 和 guest 计算而得
5. 双人赛, NS / EW 根据 人工设置
6. NSEW 牌手入座, 候选是

og.board
1. table_id, 在某张牌桌上完成
2. deal_id, 打的是那副牌
3. card_ids, 牌张组成, 以及打牌顺序
4. call_ids, 叫牌过程
4. declarer + contract = fn(call_ids, declarer_manual + contract_manual)
5. result = fn(card_ids, result_manual)
6. point = fn(result, point_manual)

og.board.call
1. 叫牌过程

og.board.card
1. board_id 哪副牌
2. deal_card_id  哪张牌
3. number 打出顺序


og.channel
1. 名称: name = "og.channel"
2. 通过 mail.channel 收发消息. many2one: mail.channel
3. message_post = env[mail.channel].message_post( id, subject, body)
3. 将 game/table 有关信息, 转为 mail.channel 的 subject, body, 发送消息
4. message_get = env[mail.channel].read( id, [subject, body] )
4. 读取 mail.channel] 的 subject, body, 转为 game/table 信息
5. 群发消息到全 game 和 table, 需要建立一个 mail.channel, 
5. 将 game.partner 和 table.partner 加入该频道


http.route('/longpolling/igame', type="json", auth="public")

1. 继承自 odoo.addons.bus.controllers.main.BusController
2. BusController.poll(channels, last, options)
2. 通过 BusController 的 poll 方法, 收取消息
3. 获取消息后, 查找对应的 og.channel,
3. 通过 env[og.channel].message_get 获取 game/table 信息
4. 对消息重新整理后, 送到客户端

