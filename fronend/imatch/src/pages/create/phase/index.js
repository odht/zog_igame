import React, { Component } from 'react';
import TableForm from '@/component/tableForm';
import router from 'umi/router';
import { Button } from 'antd';
class Phase extends Component {
    view = (record) => {
        const { location: { state: { game_id } } } = this.props
        router.push({
            pathname: '/create/team',
            state: {
                game_id: game_id,
                phase_id: record.id,
            }
        })
    }
    views = (record) => {
        const { location: { state: { game_id } } } = this.props
        router.push({
            pathname: '/create/round',
            state: {
                game_id: game_id,
                phase_id: record.id,
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
                title: '编号',
                dataIndex: 'number',
            },
            {
                title: '赛程名',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: 'action',
                edit: true,
                render: (text, record, context) => {
                    return (
                        <>
                            <a href="javascript:;" onClick={() => this.view(record)} style={{ marginRight: '10px' }}>队伍管理</a>
                            <a href="javascript:;" onClick={() => this.views(record)} style={{ marginRight: '10px' }}>轮次管理</a>
                        </>
                    )
                },
            }
        ]
        const list = [
            {
                label: '赛段名',
                input: {
                    type: 'input'
                },
                attribute: 'name'
            },
            {
                label: '编号',
                input: {
                    type: 'input'
                },
                attribute: 'number'
            },
        ]
        const fields = {
            name: null,
            number:null
        }
        const domain = [['id', '>=', '0'], ['game_id', '=', game_id]]
        return (
            <TableForm
                list={list}
                columns={columns}
                model={"og.phase"}
                fields={fields}
                domain={domain}
                createArgs={this.createArgs}
                formAddTitle={'创建赛段'}
                addTitle={'创建赛段'}
                formEditTitle={'编辑赛段'}
                {...this.props} >
            </TableForm>
        )
    }
}
export default Phase