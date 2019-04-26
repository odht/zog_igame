/**
 * title: 赛事编排 - 智赛桥牌
 * isNotMenu: true
 */
import React, { useEffect, useState, useRef } from 'react';
import Redirect from 'umi/redirect'
import { Table } from 'antd'
import { connect } from 'dva'
import { Link } from 'umi/link';
import router from 'umi/router';
import odoo from '../../../../odoo-rpc/odoo';

export default connect()((props) => {
    const [data, setData] = useState([])
    const getData = async () => {
        const fields = {
            name: null,
            round_ids: {
                name: null,
                date_from: null,
                date_thru: null,
                phase_id: null,
                number: null,
                match_ids: null
            }
        }
        const domain = [['game_id', '=', Number(localStorage.game)]]
        const cls = odoo.env('og.phase')
        const data = await cls.search_read(domain, fields);
        let roundData = []
        if (data.length > 0) {
            roundData = data.reduce((pre, cur) => {
                return [...pre, ...cur.round_ids]
            }, [])
            setData(roundData)
        }
        console.log(roundData)
    }
    useEffect(() => {
        getData()
    }, [])
    const columns = [{
        title: '日期',
        dataIndex: 'date_from',
        align: "center",
        render: (value, row, index) => {
            const date = row.date_from.split(" ")[0]
            const place = data.filter(item => item.date_from.split(" ")[0] === date && item.phase_id.id === row.phase_id.id)
            const placeIndex = place.findIndex(item => item.id === row.id);
            const obj = {
                children: value.split(" ")[0],
                props: {},
            };
            console.log(placeIndex)
            if (placeIndex !== 0) {
                obj.props.rowSpan = 0
            } else {
                obj.props.rowSpan = place.length
            }
            // These two are merged into above cell
            return obj;
        },
    }, {
        title: '时间',
        align: "center",
        dataIndex: 'data_thus',
        render: (text, row, index) => {
            return (
                <>{row.date_from.split(" ")[1] + " ~ " + row.date_thru.split(" ")[1]}</>
            )
        },
    }, {
        title: '公开团体赛',
        align: "center",
        dataIndex: 'name',
        render: (text, row, index) => {
            return row.match_ids.length > 0 ? text :
                <a herf="#" onClick={() => router.push({ pathname: "/sponsor/match/arrange/detail", state: { round: row } })}>
                    {text}
                </a>



        },
    },];


    return (
        <Table columns={columns} dataSource={data} bordered style={{ backgroundColor: "white" }} rowKey={row => row.id} />
    )
})