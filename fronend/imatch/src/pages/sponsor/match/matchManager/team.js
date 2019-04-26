/**
 * title: 参赛队 - 智赛桥牌
 * index: 2
 */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Table } from 'antd'
import odoo from '../../../../odoo-rpc/odoo';
async function change() {

}
export default (props) => {
    const columns = [{
        title: "队伍编号",
        dataIndex: 'number',
        align: "center"
    }, {
        title: "队名",
        dataIndex: 'name',
        align: "center"
    }, {
        title: "领队/教练",
        dataIndex: 'phase_is',
        align: "center",
        render: (text, row, index) => {
            const leader = row.player_ids.find(item => item.role === "leader")
            const coach = row.player_ids.find(item => item.role === "coach")
            console.log(leader ? 1 : 2)
            return (
                <>{(leader ? leader.name : "") + " " + (coach ? coach.name : "")}</>
            )
        }
    }, {
        title: "队员",
        dataIndex: 'phase_ids',
        align: "center",
        render: (text, row, index) => {
            return (
                <>{row.player_ids.reduce((pre, cur) => pre + " " + cur.name, '')}</>
            )
        }
    }, {
        title: "操作",
        dataIndex: "action",
        align: "center",
        render: (text, record) => {
            return (
                <>
                    <a href="javascript:void 0" style={{marginRight:15}}>修改名单</a>
                    <a href="javascript:void 0">删除</a>
                </>
            )
        }
    }]
    const [data, setData] = useState([]);
    const getData = async () => {
        const cls = odoo.env('og.team');
        const domain = [['game_id', '=', Number(localStorage.game)]]
        const fields = {
            name: null,
            number: null,
            player_ids: {
                name: null,
                role: null
            }
        }
        const data = await cls.search_read(domain, fields)
        setData(data)
        console.log(data)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div style={{}}>
            <Button type="primary" style={{ marginBottom: 20 }} onClick={change}>添加队</Button>
            <Table columns={columns} dataSource={data} bordered rowKey={row => row.id} />
        </div>
    )
}