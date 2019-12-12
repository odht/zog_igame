import ODOO from './odoojs/odoojs/odoo'
import zog_igame from './odoojs/odoo.addons.zog_igame';
const host = 'http://139.198.21.140:8069'
// const host = 'http://192.168.1.8:8069'

const db = 'TT'
const modules = { zog_igame };
// 需要的模型名
const models = {
        'res.users': ["login", "password", "partner_id", 'team_player_ids'],
        'og.game': ["name", "paymentStatus", "remarks", "notes", "date_from", "date_thru", "phase_ids", "round_ids", "schedule_ids", "deal_ids", "team_ids", "player_ids", "match_ids", "match_type", "table_ids", "board_ids", "state"],
        'og.phase': ["name", "number", "sequence", "game_id", "org_type", "score_type", "score_uom", "round_ids", "team_ids"],
        'og.schedule': ["name", "number", "date_from", "date_thru", "deal_ids", "round_ids"],
        'og.deal': ["name", "number", "dealer", "vulnerable", "card_str", "card_ids", "schedule_id", "game_id", "schedule_ids", "game_ids", "board_ids", "match_ids", "match_line_ids"],
        // 'og.deal.card':[ "deal_id", "name", "suit", "rank", "position"],
        'og.round': ["name", "number", "sequence", "game_id", "schedule_id", "phase_id", "last_in_phase", "date_from", "date_thru", "deal_ids", "team_info_ids", "match_ids", "table_ids", "team_ids", "board_ids"],
        'og.team': ["name", "number", "partner_id", "game_id", "phase_ids", "player_ids", "round_info_ids", "match_team_ids", "rank",],
        'og.team.player': ["name", "partner_id", "team_id", "role", "table_player_ids"],
        'og.team.round.info': ['name', 'number', 'sequence', 'round_id', 'team_id', 'game_id', 'phase_ids', 'match_team_id', 'opp_team_id', 'match_id', 'imp', 'imp_opp', 'vp', 'vp_opp', 'score_uom', 'score_manual', 'score', 'score_open', 'score_close', 'rank_open', 'rank_close'],
        'og.match': ["name", "number", "round_id", "phase_id", "game_id", "deal_ids", "date_from", "date_thru", "host_id", "guest_id", "match_team_ids", "line_ids", "open_table_id", "close_table_id", "table_ids", "deal_count", "imp", "imp_manual", "host_imp", "guest_imp", "vp", "vp_manual", "host_vp", "guest_vp",],
        'og.match.team': ["name", "match_id", "team_id", "opp_team_id", "position", "imp", "imp_opp", "vp", "vp_opp"],
        'og.match.line': ["name", "match_id", "deal_id", "host_id", "guest_id", "open_table_id", "close_table_id", "open_board_id", "close_board_id", "number", "open_declarer", "open_contract", "open_result", "open_ns_point", "open_ew_point", "close_declarer", "close_contract", "close_result", "close_ns_point", "close_ew_point", "point", "host_point", "guest_point", "imp", "host_imp", "guest_imp"],
        'og.table': ["name", "number", "room_type", "match_id", "round_id", "schedule_id", "schedule_number", "phase_id", "game_id", "deal_ids", "date_from", "date_thru", "ns_team_id", "ew_team_id", "west_id", "north_id", "east_id", "south_id", "player_ids", "table_player_ids", "board_ids", "doing_board_id", "state"],
        'og.table.player': ["name", "table_id", "player_id", "team_id", "position"],
        'og.board': ["name", "table_id", "match_id", "host_id", "guest_id", "round_id", "phase_id", "game_id", "deal_id", "number", "sequence", "dealer", "vulnerable", "card_str", "hands", "call_ids", "auction", "declarer", "contract", "openlead", "result", "ns_point", "ew_point", "ns_win", "ew_win", "card_ids", "tricks", "last_trick", "current_trick", "state", "player", "claimer", "claim_result", "host_imp", "guest_imp"],

}
const odoo = new ODOO({ host, db, modules, models })

export default odoo

