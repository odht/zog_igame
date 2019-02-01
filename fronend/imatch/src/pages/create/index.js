import React, { Component } from 'react';
import TableForm from '@/component/tableForm';
import {Button} from 'antd';
import router from 'umi/router';
class Team extends Component {
    view = (record) => {
        router.push({
            pathname:'/create/schedule',
            state:{
                game_id:record.id
            }
        })
    }
    views = (record) => {
        router.push({
            pathname:'/create/phase',
            state:{
                game_id:record.id
            }
        })
    }
    render() {
        const view = this.view
        const columns = [
            {
                title: '比赛名称',
                dataIndex: 'name',
            },
            {
                title: '报名截止时间',
                dataIndex: 'endtime',

            },
            {
                title: '开始时间',
                dataIndex: 'date_from',
            },
            {
                title: '结束时间',
                dataIndex: "date_thru",
            },
            // {
            //     title:'承办单位',
            //     dataIndex:'unit'
            // },
            // {
            //     title:'协办单位',
            //     dataIndex:'sunit'
            // }, {
            //     title:'裁判',
            //     dataIndex:'referee'
            // }, {
            //     title:'仲裁',
            //     dataIndex:'arbitration'
            // }, {
            //     title:'联系人',
            //     dataIndex:'concet'
            // },
            // {
            //     title:'电话',
            //     dataIndex:'phone'
            // },
            {
                title: '操作',
                dataIndex: 'action',
                edit: true,
                render: (text, record, context) => {
                    return (
                        <>
                            <a href="javascript:;" onClick={() => this.view(record)} style={{ marginRight: '10px' }}>赛程管理</a>
                            <a href="javascript:;" onClick={() => this.views(record)} style={{ marginRight: '10px' }}>赛段管理</a>
                        </>
                    )
                },
            }
        ]
        const list = [
            {
                label: '赛队名称',
                input: {
                    type: 'input'
                },
                attribute: 'name'
            },
            {
                label: '比赛时间',
                input: {
                    type: 'date'
                },
                attribute: ['date_from', 'date_thru']
            }, {
                label: '截止时间',
                input: {
                    type:'date'
                },
                attribute: 'endtime'
            },
            {
                label: '主办方',
                input: {
                    type: 'input'
                },
                attribute: 'host'
            },
            {
                label: '承办单位',
                input: {
                    type: 'input'
                },
                attribute: 'unit'
            },
            {
                label: '裁判',
                input: {
                    type: 'input'
                },
                attribute: 'referee'
            },
            {
                label: '仲裁',
                input: {
                    type: 'input'
                },
                attribute: 'arbitration'
            },
            {
                label: '联系人',
                input: {
                    type: 'input'
                },
                attribute: 'concet'
            }
            ,
            {
                label: '电话',
                input: {
                    type: 'input'
                },
                attribute: 'phone'
            }
        ]
        const fields = {
            name: null,
            date_from: null,
            date_thru: null,
            notes: null,
        }
        return (
            <TableForm
                list={list}
                columns={columns}
                model={"og.game"}
                fields={fields}
                formAddTitle={'创建比赛'}
                addTitle={'创建比赛'}
                formEditTitle={'编辑比赛'}
                {...this.props} >
                <Button
                 onClick={this.click}
                 type="primary"
                 style={{ marginBottom: 16,  marginLeft: '55px' }}>
                    创建赛程
                </Button>
            </TableForm>
        )
    }
}
export default Team