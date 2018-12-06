import ODOO from './odoo-rpc'

const host = '/api'
const db = 'TT'
// 需要的模型名
const models = {
        'og.round': ['name', 'id', 'game_id','phase_id'],
        'res.partner': ['name', 'company_id', 'category_id'],
        'res.company': ['name', 'email'],
        'res.country': ['name'],
        'og.deal': ['name', 'card_str', 'board_ids', 'dealer', 'game', 'phase', 'round', 'schedule_id'],
        'og.board': ['name', 'state', 'table_id', 'match_id', 'contract', 'declarer', 'result', 'ns_point', 'ew_point'],
        'og.table': ['name', 'room_type', 'south_id', 'north_id', 'east_id', 'west_id'],
        'og.match': ['name', 'number', 'guest_vp', 'host_vp', 'host_imp', 'guest_imp', 'phase', 'phase_id'],
}
const odoo = new ODOO({ host, db, models })

export default odoo

