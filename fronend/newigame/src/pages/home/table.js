import React, { Component } from 'react'
import { connect } from 'dva';
import { lookup } from '@/utils/tools';

@connect(({ odooData }) => ({ odooData }))
export default class MyTableList extends Component {
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
            const doing_table_id = UserData[0].doing_table_id[0];
            dispatch({
                type: 'ogTable/read',
                payload: { id: doing_table_id }
            }).then(() => {
                const { odooData: { ogTable } } = this.props;
                const tableData = lookup(doing_table_id, ogTable);
                
            })
        })
    }
    render() {
        return (
            <div>MyTableList</div>
        )
    }
}