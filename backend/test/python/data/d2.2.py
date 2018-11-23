

from tools import *
   
records['og.team.round.info'] = [
  {'phase_id': 21, 'schedule_id': 22, 'team_id': 1, 'number': 1},
  {'phase_id': 21, 'schedule_id': 22, 'team_id': 6, 'number': 2},
  {'phase_id': 21, 'schedule_id': 22, 'team_id': 7, 'number': 3},
  {'phase_id': 21, 'schedule_id': 22, 'team_id': 8, 'number': 4},
  {'phase_id': 22, 'schedule_id': 22, 'team_id': 2, 'number': 5},
  {'phase_id': 22, 'schedule_id': 22, 'team_id': 9, 'number': 6},
  {'phase_id': 23, 'schedule_id': 22, 'team_id': 4, 'number': 7},
  {'phase_id': 23, 'schedule_id': 22, 'team_id': 5, 'number': 8},
  {'phase_id': 23, 'schedule_id': 22, 'team_id': 10, 'number': 9},
  {'phase_id': 23, 'schedule_id': 22, 'team_id': 11, 'number': 10},
]


def test_d2_1():
    tri_manule_multi()
    match_multi()
    table_multi()   
    table_player_multi()
    
test_d2_1()
