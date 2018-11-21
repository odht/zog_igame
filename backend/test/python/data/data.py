# coding: utf-8 -*- coding: UTF-8 -*-


records = {}

records['og.game'] = [{'name': '2018石家庄赛', 'date_from': '2018-11-24','date_thru': '2018-11-25'}]

records['og.schedule'] = [
  {'name': 'Day1.1', 'number': 11, 'date_from': '2018-11-24 08:40','date_thru': '2018-11-24 10:15'},
  {'name': 'Day1.2', 'number': 12, 'date_from': '2018-11-24 10:30','date_thru': '2018-11-24 12:05'},
  {'name': 'Day1.3', 'number': 13, 'date_from': '2018-11-24 13:10','date_thru': '2018-11-24 14:45'},
  {'name': 'Day1.4', 'number': 14, 'date_from': '2018-11-24 15:00','date_thru': '2018-11-24 16:35'},
  {'name': 'Day1.5', 'number': 15, 'date_from': '2018-11-24 16:50','date_thru': '2018-11-24 18:25'},
  {'name': 'Day2.1', 'number': 21, 'date_from': '2018-11-25 08:30','date_thru': '2018-11-25 10:05'},
  {'name': 'Day2.2', 'number': 22, 'date_from': '2018-11-25 10:20','date_thru': '2018-11-25 11:55'},
  {'name': 'Day2.3', 'number': 23, 'date_from': '2018-11-25 13:00','date_thru': '2018-11-25 14:35'},
  {'name': 'Day2.4', 'number': 24, 'date_from': '2018-11-25 14:50','date_thru': '2018-11-25 16:25'},
]

#card_str = 'AKQ.AKQ.AKQ.AKQ2 JT9.JT9.JT92.JT9 876.8762.876.876 5432.543.543.543'
card_str = '876.AKQ.AKQ.AKQ2 JT9.JT9.JT92.JT9 AKQ.8762.876.876 5432.543.543.543'
deal_count = 12
sch_num = [ s['number'] for s in records['og.schedule'] ]
records['og.deal'] = [{'number': num, 'schedule_id': sn, 'card_str': card_str
                      } for sn in sch_num for num in range(1,deal_count+1) ]


records['og.phase'] = [
  {'name': 'A组循环赛', 'number': 11, 'org_type':'circle' },
  {'name': 'B组循环赛', 'number': 12, 'org_type':'circle' },
  {'name': '半决赛',    'number': 21, 'org_type':'manual' },
  {'name': '56排位赛',  'number': 22, 'org_type':'manual'  },
  {'name': '保级赛',    'number': 23, 'org_type':'manual'  },
  {'name': '决赛',      'number': 31, 'org_type':'manual'  },
  {'name': '34决赛',    'number': 32, 'org_type':'manual'  },
  {'name': '保级附加赛', 'number': 33, 'org_type':'manual'  },
]


records['og.round'] = [
  {'name': 'A组第1轮', 'number': 1, 'sequence': 11, 'phase_id': 11, 'schedule_id': 11  },
  {'name': 'B组第1轮', 'number': 1, 'sequence': 12, 'phase_id': 12, 'schedule_id': 11  },
  {'name': 'A组第2轮', 'number': 2, 'sequence': 11, 'phase_id': 11, 'schedule_id': 12  },
  {'name': 'B组第2轮', 'number': 2, 'sequence': 12, 'phase_id': 12, 'schedule_id': 12  },
  {'name': 'A组第3轮', 'number': 3, 'sequence': 11, 'phase_id': 11, 'schedule_id': 13  },
  {'name': 'B组第3轮', 'number': 3, 'sequence': 12, 'phase_id': 12, 'schedule_id': 13  },
  {'name': 'A组第4轮', 'number': 4, 'sequence': 11, 'phase_id': 11, 'schedule_id': 14  },
  {'name': 'B组第4轮', 'number': 4, 'sequence': 12, 'phase_id': 12, 'schedule_id': 14  },
  {'name': 'A组第5轮', 'number': 5, 'sequence': 11,      'phase_id': 11, 'schedule_id': 15  },
  {'name': 'B组第5轮', 'number': 5, 'sequence': 12,      'phase_id': 12, 'schedule_id': 15  },
  {'name': '半决赛第1节',    'number': 1, 'sequence': 21, 'phase_id': 21, 'schedule_id': 21  },
  {'name': '56排位赛第1节',  'number': 1, 'sequence': 22, 'phase_id': 22, 'schedule_id': 21  },
  {'name': '保级赛第1轮',    'number': 1, 'sequence': 23, 'phase_id': 23, 'schedule_id': 21  },
  {'name': '半决赛第2节',    'number': 2, 'sequence': 21, 'phase_id': 21, 'schedule_id': 22  },
  {'name': '56排位赛第2节',  'number': 2, 'sequence': 22, 'phase_id': 22, 'schedule_id': 22  },
  {'name': '保级赛第2轮',    'number': 2, 'sequence': 23, 'phase_id': 23, 'schedule_id': 22  },
  {'name': '决赛第1节',      'number': 1, 'sequence': 31, 'phase_id': 31, 'schedule_id': 23  },
  {'name': '34决赛第1节',    'number': 1, 'sequence': 32, 'phase_id': 32, 'schedule_id': 23  },
  {'name': '保级附加赛第1节', 'number': 1, 'sequence': 33, 'phase_id': 33, 'schedule_id': 23  },
  {'name': '决赛第2节',      'number': 2, 'sequence': 31, 'phase_id': 31, 'schedule_id': 24  },
  {'name': '34决赛第2节',    'number': 2, 'sequence': 32, 'phase_id': 32, 'schedule_id': 24  },
  {'name': '保级附加赛第2节', 'number': 2, 'sequence': 33, 'phase_id': 33, 'schedule_id': 24  },
]

records['og.team'] = [
  {'name': '爱好队',   'number': 1, 'phase_ids': [11] },
  {'name': '晴天队',   'number': 2, 'phase_ids': [11] },
  {'name': '河北蓝地', 'number': 3, 'phase_ids': [11] },
  {'name': '快乐桥牌', 'number': 4, 'phase_ids': [11] },
  {'name': '沧州龙兴', 'number': 5, 'phase_ids': [11] },
  {'name': '鼎峰队',   'number': 6, 'phase_ids': [11] },
  {'name': '伊特队',   'number': 7, 'phase_ids': [12] },
  {'name': '智云队',   'number': 8, 'phase_ids': [12] },
  {'name': '漳河队',   'number': 9, 'phase_ids': [12] },
  {'name': '613队',   'number': 10,'phase_ids': [12] },
  {'name': 'IPTV队',  'number': 11,'phase_ids': [12] },
  {'name': '宏鸿集团', 'number': 12,'phase_ids': [12] },
  {'name': 'Admins',  'number': 99},
]




round_turn = {}
round_turn[6] = [ 
  [2,4,3,5,1,6],
  [3,1,5,4,6,2],
  [1,4,2,5,3,6],
  [5,1,3,2,6,4],
  [1,2,3,4,5,6],
]


records['res.users'] = [
  {'login': '101', 'name': '101', 'email': '101', 'password':'101.101'},
  {'login': '102', 'name': '102', 'email': '102', 'password':'102.102'},
  {'login': '103', 'name': '103', 'email': '103', 'password':'103.103'},
  {'login': '104', 'name': '104', 'email': '104', 'password':'104.104'},
  {'login': '105', 'name': '105', 'email': '105', 'password':'105.105'},
  {'login': '106', 'name': '106', 'email': '106', 'password':'106.106'},
  {'login': '201', 'name': '201', 'email': '201', 'password':'201.201'},
  {'login': '202', 'name': '202', 'email': '202', 'password':'202.202'},
  {'login': '203', 'name': '203', 'email': '203', 'password':'203.203'},
  {'login': '204', 'name': '204', 'email': '204', 'password':'204.204'},
  {'login': '205', 'name': '205', 'email': '205', 'password':'205.205'},
  {'login': '206', 'name': '206', 'email': '206', 'password':'206.206'},

]


records['og.team.player'] = [
  {'partner_id': '101', 'team_id': 99},
  {'partner_id': '102', 'team_id': 99},
  {'partner_id': '103', 'team_id': 99},
  {'partner_id': '104', 'team_id': 99},
  {'partner_id': '105', 'team_id': 99},
  {'partner_id': '106', 'team_id': 99},
  {'partner_id': '201', 'team_id': 99},
  {'partner_id': '202', 'team_id': 99},
  {'partner_id': '203', 'team_id': 99},
  {'partner_id': '204', 'team_id': 99},
  {'partner_id': '205', 'team_id': 99},
  {'partner_id': '206', 'team_id': 99},
]

