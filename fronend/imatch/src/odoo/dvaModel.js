import service from '@/services/odooService';
import dvaOdoo from 'dva-odoo';
import dvaOdooGame from './igame'

const models = {
  resUsers: { default: [
    'name', 'login', 'todo_table_ids','done_table_ids'
  ]},

  ogGame: { default: [
    'name','phase_ids','schedule_ids','team_ids','deal_ids'
  ]},

  ogPhase:{ default: [
    'name','number', 'game_id', 'round_ids','team_ids'
  ]},

  ogSchedule:{ default: [
    'name','number','game_id',
    'date_from','date_thru',
    'deal_ids','round_ids'
  ]},

  ogRound:{ default: [
    'name','number','game_id','phase_id','schedule_id',
    'date_from','date_thru',
    'team_info_ids', 'deal_ids','match_ids', 'table_ids',
  ]},

  ogDeal:{ default: [
    'name','number','card_str','game_id','schedule_id',
    'dealer','vulnerable',
    'card_ids','board_ids'
  ]},

  ogTeam: { default: [
    'name','game_id','phase_ids','player_ids',
    'round_info_ids',
    'score','score_manual','score_uom'
  ]},

  ogTeamPlayer: { default: [
    'name','team_id','role'
  ]},

  ogTeamRoundInfo:{ default: [
    'name','number', 'team_id','round_id','game_id','phase_id',
    'match_id',
    'score','score_manual','score_uom'
  ]},

  ogMatch:{ default: [
    'name','number','game_id','round_id','phase_id',
    'deal_ids',
    'date_from', 'date_thru',
    'host_id','guest_id',
    'line_ids',
    'open_table_id','close_table_id',
    'host_imp','guest_imp','imp_manual',
    'host_vp','guest_vp','vp_manual'
  ]},

  ogMatchLine:{ default: [
    'name','match_id','deal_id','host_id','guest_id',
    'open_table_id','close_table_id',
    'open_board_id','close_board_id',
    'number',
    'open_declarer', 'open_contract', 'open_result', 'open_ns_point', 'open_ew_point', 'host_point', 'host_imp',
    'close_declarer','close_contract','close_result','close_ns_point','close_ew_point','guest_point','guest_imp',
  ]},

  ogTable:{ default: [
    'name','number','room_type','match_id','game_id','round_id','phase_id',
    'date_from','date_thru','deal_ids', 'board_ids',
    'ns_team_id','ew_team_id',
    'player_ids', 'east_id','west_id','north_id','south_id',
  ]},

  ogBoard:{ default: [
    'name','deal_id', 'table_id','round_id','phase_id','game_id',
    'number','vulnerable','dealer','hands',
    'declarer', 'contract', 'openlead','result','ns_point','ew_point',
    'auction', 'tricks', 'last_trick', 'current_trick',
    'ns_win','ew_win',
    'claimer','claim_result',
    'player', 'state',
  ]}

}

export default (options) => {
  const { model } = options

  if(model == 'odooData'){
    return dvaOdoo({ inherit: 'odooData' });
  }

  if(model == 'login'){
    return dvaOdoo({
      inherit: 'login',
      service,
    });
  }


  const namespace0 = model.split('.').map(
    item => item.substring(0,1).toUpperCase() + item.substring(1)
  ).join('')

  const namespace = namespace0.substring(0,1).toLowerCase(
      ) + namespace0.substring(1)

  const inherit = model
  return dvaOdoo(dvaOdooGame({
    ...options, namespace, model, inherit, service,
    fields: models[namespace]
  }));

}
