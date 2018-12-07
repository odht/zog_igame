import React, { Component } from 'react'
import { connect } from 'dva';
import { Link } from 'dva/router';
import { lookup } from '@/utils/tools';
import { Table } from 'antd';

@connect(({ odooData }) => ({ odooData }))
export default class MyTableList extends Component {
    state = {
        tableData: [],
        loading: true,
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const sid = localStorage.getItem('tonken');
        const uid = parseInt(localStorage.getItem('uid'));
        dispatch({
            type: 'resUsers/read',
            payload: { id: uid }
        }).then(() => {
            const { odooData: { resUsers } } = this.props;
            const UserData = lookup(uid, resUsers);
            const doing_table_ids = UserData[0].doing_table_ids;
            dispatch({
                type: 'ogTable/read',
                payload: { id: doing_table_ids }
            }).then(() => {
                const { odooData: { ogTable } } = this.props;
                const tableData = lookup(doing_table_ids, ogTable);
                this.setState({
                    tableData: tableData,
                    loading: false,
                })
            })
        })
    }
    render() {
        const {
            tableData,
            loading,
        } = this.state;
        let gameName = [];
        if (tableData && tableData.length > 0) {
            gameName = tableData
        }
        const tableColumns = [{
            title: '比赛名称',
            dataIndex: 'game_id',
            render: (text, record) => {
                return <Link
                    to={{
                        pathname: 'home/score',
                        search: `?table_id=${record.id}`
                    }}
                >{record.game_id[1]}</Link>
            }
        }]
        return (
            <div>
                <Table
                    loading={loading}
                    style={{ background: '#fff', minHeight: '59.5vh' }}
                    rowKey={row => row.id}
                    pagination
                    dataSource={gameName}
                    columns={tableColumns}
                />
            </div>
        )
    }
}