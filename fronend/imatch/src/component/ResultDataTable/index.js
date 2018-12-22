import React from 'react';
import { Table } from 'antd';
import { Link } from 'dva/router';

const ResultDataTable = ({ matchData, state, loading }) => {
    console.log(matchData)
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
            render: (text, record) => {
                let borad1 = 0;
                let borad2 = 0;
                const table_ids = record.table_ids;
                console.log(table_ids)
                table_ids[0].board_ids.map(item => {
                    if (item.state === 'done') {
                        borad1++
                    }
                })
                table_ids[1].board_ids.map(item => {
                    if (item.state === 'done') {
                        borad2++
                    }
                })
                // record.table_ids.map(deal => {
                //     if (deal.board_ids.map(board => board.state !== 'done')) {
                //         return null;
                //     } else {
                //         m++
                //     }
                // })
                return borad1 > borad2 ? borad2 : borad1
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
                return <Link to={{ pathname: '/details/grade/graresult/teamMatch', state, search: `?team_id=${record.guest_id[0]}` }}>{record.guest_id[1]}</Link>;
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
                render: (text) => {
                    return text.toFixed(2);
                }
            }, {
                title: "客队",
                dataIndex: "guest_vp",
                render: (text) => {
                    return text.toFixed(2);
                }
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
        <Table
            loading={loading}
            rowKey={record => record.id}
            pagination={false}
            size='middle'
            columns={columns}
            dataSource={matchData ? matchData.sort((number1, number2) => {
                return number1.number - number2.number
            }) : []}
            bordered
        />
    );
}

export default ResultDataTable;