import React, { Component } from 'react';
import { Table, Button, Transfer,message } from 'antd';
import odoo from '../../../odoo-rpc/odoo';
class Team extends Component {
    state = {
        dataSource: [],
        selectedRows: [],
        targetKeys: [],
    }
    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        const { location: { state: { game_id, phase_id } } } = this.props
        const cls = odoo.env('og.team');
        const domain = [['id', '>=', '0'], ['game_id', '=', game_id]]
        const fields = {
            name: null,
            number: null,
            phase_ids: null
        }
        const dataSource = await cls.search_read(domain, fields);
        console.log(dataSource);
        const targetKeys = dataSource.filter(item => item.phase_ids.indexOf(phase_id) > -1).map(item => item.id)
        console.log(targetKeys);
        this.setState({
            dataSource: dataSource,
            targetKeys: targetKeys,
        })
    }
    submit = async() => {
        const { location: { state: { game_id, phase_id } } } = this.props
        const cls = odoo.env('og.phase');
        const { targetKeys } = this.state
        const result = await cls.write(phase_id, { team_ids: [[6, false, targetKeys]] })
        if(!result.code){
            message.success('修改成功');
        }

    }
    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    renderFooter = () => (
        <Button
            size="small"
            style={{ float: 'right', margin: 15 }}
            onClick={this.getMock}
        >
            更新队伍数据
        </Button>
    )

    render() {
        const { dataSource, selectedRows } = this.state;
        const columns = [
            {
                title: '编号',
                dataIndex: 'number',
            },
            {
                title: '队名',
                dataIndex: 'name',
            },
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRows: selectedRows
                })
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        }
        console.log(dataSource, selectedRows)
        return (
            <div style={{ background: "#fff", paddingTop: "15px" }}>
                <Button
                    type="primary"
                    style={{ marginBottom: 16 }}
                    onClick={this.submit}
                >点击提交修改</Button>
                {/* <Table
                    rowKey={row => row.id}
                    columns={columns}
                    bordered={true}
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                /> */}
                <Transfer
                    dataSource={dataSource}
                    rowKey={item => item.id}
                    showSearch
                    listStyle={{
                        width: '400px',
                        height: '600px',
                    }}
                    operations={['添加', '移除',]}
                    targetKeys={this.state.targetKeys}
                    onChange={this.handleChange}
                    render={item => `${item.id}-${item.name}`}
                    footer={this.renderFooter}
                    titles={['所有队伍', '已添加队伍',]}
                    locale={{ itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空', searchPlaceholder: '请输入搜索内容' }}
                >

                </Transfer>
            </div>
        )
    }
}
export default Team