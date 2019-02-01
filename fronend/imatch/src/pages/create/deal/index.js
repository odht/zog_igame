import React, { Component } from 'react';
import TableForm from '@/component/tableForm';
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
        const { location: { state: { game_id ,schedule_id} } } = this.props
        const obj={
            schedule_ids:[[4,schedule_id,false]]
        }
        return {...edit,...obj}
    }
    render() {
        const view = this.view
        const { location: { state: { game_id ,schedule_id} } } = this.props
        console.log(game_id);
        const columns = [
            {
                title: '牌号',
                dataIndex: 'number',
            },

            {
                title: '牌组',
                dataIndex: 'card_str',
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
                label: '牌号',
                input: {
                    type: 'input'
                },
                attribute: 'number'
            },
            // {
            //     label: '牌组',
            //     input: {
                    
            //     },
            //     attribute: 'card_str'
            // }
        ]
        const fields = {
            number: null,
            card_str:null,
        }
        const domain = [['id', '>=', '0'], ['schedule_ids', 'in', [schedule_id]]]
        return (
            <TableForm
                list={list}
                columns={columns}
                model={"og.deal"}
                fields={fields}
                domain={domain}
                createArgs={this.createArgs}
                formAddTitle={'创建牌组'}
                addTitle={'创建牌组'}
                formEditTitle={'编辑牌组'}
                {...this.props} >
            </TableForm>
        )
    }
}
export default Schedule