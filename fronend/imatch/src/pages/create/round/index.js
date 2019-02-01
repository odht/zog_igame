import React, { Component } from 'react';
import TableForm from '@/component/tableForm';
import router from 'umi/router';
import { Button } from 'antd';
import odoo from '../../../odoo-rpc/odoo';
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
    routerGo = () => {
        const { location: { state: { game_id } } } = this.props
        router.push({
            pathname: '/create/schedule',
            state: {
                game_id: game_id,
            }
        })
    }
    state = {
        sche: []
    }
    componentDidMount() {
        this.getSche()
    }
    getSche = async () => {
        const { location: { state: { game_id, phase_id } } } = this.props
        const domain = [['id', '>=', '0'], ['game_id', '=', game_id]]
        const fields = { id: null, name: null }
        const dataSource = await odoo.env('og.schedule').search_read(domain, fields)
        this.setState({
            sche: dataSource
        })
    }
    createArgs = (edit, data) => {
        console.log(data);
        if (edit.sche) {
            const namearray = data.map(item => item.schedule_id.name);
            if (namearray.indexOf(edit.sche) > -1) {
                alert('同一赛段的不同轮次比赛不能放在同一赛程')
                return {}
            } else {
                return { ...edit }
            }
        } else {
            return { ...edit }
        }
    }
    valueChange = (edit, data) => {
        console.log(edit);
        const scheName = edit.sche
        const { location: { state: { game_id, phase_id } } } = this.props
        if (scheName) {
            const names = data.filter(item => item.id !== edit.id).map(item => item.schedule_id.name)
            console.log(names);
            if (names.indexOf(scheName) <= -1) {
                const sche = this.state.sche.filter(item => item.name === scheName) || [{}]
                edit.schedule_id = sche[0].id || undefined
                edit.phase_id = phase_id
            }else{
                alert('同一赛段的不同轮次比赛不能放在同一赛程')
            }
        }
        return edit                                       
    }
    render() {
        const view = this.view
        const { location: { state: { game_id, phase_id } } } = this.props
        console.log(game_id);
        const columns = [
            {
                title: '轮次名',
                dataIndex: 'name',
            },
            {
                title: '赛程',
                dataIndex: 'schedule_id',
                render: (text, record) => {
                    return (
                        <>
                            <a href="javascript:;" onClick={() => this.routerGo(record)} style={{ marginRight: '10px' }}>{record.schedule_id.name}</a>
                        </>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                edit: true,
                render: (text, record, context) => {
                    return (
                        <>
                            <a href="javascript:;" onClick={() => this.view(record)} style={{ marginRight: '10px' }}>队伍对抗管理</a>
                        </>
                    )
                },
            }
        ]
        const list = [
            {
                label: '轮次名',
                input: {
                    type: 'input'
                },
                attribute: 'name'
            },
            {
                label: '赛程选择',
                input: {
                    type: 'select',
                    data: this.state.sche.map(item => item.name)
                },
                attribute: 'sche'
            },
        ]
        const fields = {
            name: null,
            schedule_id: null
        }
        const domain = [['id', '>=', '0'], ['game_id', '=', game_id], ['phase_id', '=', phase_id]]
        return (
            <TableForm
                list={list}
                columns={columns}
                model={"og.round"}
                fields={fields}
                domain={domain}
                valueChange={this.valueChange}
                createArgs={this.createArgs}
                formAddTitle={'创建轮次'}
                addTitle={'创建轮次'}
                formEditTitle={'编辑轮次'}
                {...this.props} >
            </TableForm>
        )
    }
}
export default Phase