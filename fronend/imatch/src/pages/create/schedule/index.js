import React, { Component } from 'react';
import TableForm from '@/component/tableForm';
import router from 'umi/router';
import { Button } from 'antd';
class Schedule extends Component {
    view = (record) => {
        const { location: { state: { game_id } } } = this.props
        router.push({
            pathname: '/create/deal',
            state: {
                game_id: game_id,
                schedule_id: record.id
            }
        })
    }
    createArgs=(edit)=>{
        const { location: { state: { game_id } } } = this.props
        return {...edit,game_id}
    }
    render() {
        const view = this.view
        const { location: { state: { game_id } } } = this.props
        console.log(game_id);
        const columns = [
            {
                title: '赛程名',
                dataIndex: 'name',
            },

            {
                title: '开始时间',
                dataIndex: 'date_from',
            },
            {
                title: '结束时间',
                dataIndex: "date_thru",
            },
            {
                title: '操作',
                dataIndex: 'action',
                edit: true,
                render: (text, record, context) => {
                    return (
                        <>
                            <a href="javascript:;" onClick={() => this.view(record)} style={{ marginRight: '10px' }}>添加牌组</a>
                        </>
                    )
                },
            }
        ]
        const list = [
            {
                label: '赛程名',
                input: {
                    type: 'input'
                },
                attribute: 'name'
            },
            {
                label: '赛程时间',
                input: {
                    type: 'date'
                },
                attribute: ['date_from', 'date_thru']
            }
        ]
        const fields = {
            name: null,
            date_from: null,
            date_thru: null,
        }
        const domain = [['id', '>=', '0'], ['game_id', '=', game_id]]
        return (
            <TableForm
                list={list}
                columns={columns}
                model={"og.schedule"}
                fields={fields}
                domain={domain}
                createArgs={this.createArgs}
                formAddTitle={'创建赛程'}
                addTitle={'创建赛程'}
                formEditTitle={'编辑赛程'}
                {...this.props} >
            </TableForm>
        )
    }
}
export default Schedule