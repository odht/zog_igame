import React from 'react';
import { Table } from 'antd';
import { Link } from 'dva/router';

const ResultDataTable = ({ matchData, state }) => {
    const columns = [{
        title: "对阵结果",
        children: [{
            title: "桌",
            dataIndex: "number",
            render: (text, record) => {
                return <Link to={{
                    pathname: '/details/grade/graresult/round',
                    state: { ...state, matchData: record },
                }}>
                    {text}
                </Link>;
            }
        }, {
            title: "完成",
            dataIndex: "deal_ids",
            render:(text,record)=>{
               return `${record.deal_ids.length}`
            }
        }, {
            title: "主队",
            dataIndex: "host_id",
            render: (text, record) => {
                return <Link to={{ pathname: `/details/grade/graresult/teamMatch`, state, search: `?team_id=${record.host_id[0]}`, }}>{record.host_id[1]}</Link>;
            }
        }, {
            title: "客队",
            dataIndex: "guest_id",
            render: (text, record) => {
                return <Link to={{ pathname: '/details/grade/teamMatch', state, search: `?team_id=${record.guest_id[0]}` }}>{record.guest_id[1]}</Link>;
            }
        }, {
            title: "IMPS",
            children: [{
                title: "主队",
                dataIndex: "host_imp",
            }, {
                title: "客队",
                dataIndex: "guest_imp",
            }]
        }, {
            title: "VPs",
            children: [{
                title: "主队",
                dataIndex: "host_vp",
            }, {
                title: "客队",
                dataIndex: "guest_vp",
            }]
        }]
    }]

    // let dataSource = [];
    // if (matchData && matchData.length > 0) {
    //     matchData.map(item => {
    //         console.log(item)
    //     })
    // }
    return (
        matchData ?
            <Table
                rowKey={record => record.id}
                pagination={false}
                size='middle'
                columns={columns}
                dataSource={matchData}
                bordered
            /> : '暂无数据'
    )
}

export default ResultDataTable;