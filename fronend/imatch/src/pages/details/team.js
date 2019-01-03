import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import './team.css';
import { connect } from 'dva';
import { lookup } from '@/utils/tools';
import odoo from '@/odoo-rpc/odoo';


const columns = [{
	title: '队名',
	dataIndex: 'name',
	key: 'name',
	align: 'center',
	width: 95
}, {
	title: '',
	dataIndex: 'modify',
	key: 'modify',
	align: 'center',
	width: 95,
	render: () => (<a>修改名单</a>)
}];

class Team extends Component {
	state = {
		dataSource:[],
		loading: true,
	}
	componentWillMount() {
		this.getData()
	}
	getData = async () => {
		const { location: { state: { gameData: { team_ids } } },  } = this.props;
		const fields={
			name:null
		}
		const cls=odoo.env('og.team');
		const dataSource=await cls.read(team_ids,fields);
		await this.setState({
			dataSource,
			loading:false
		})
	}
	render() {
		const { loading ,dataSource} = this.state;
		return (
			<div style={{ margin: '0 auto' }}>
				<Table
					loading={loading}
					bordered={true}
					rowKey={row => row.id}
					columns={columns}
					dataSource={dataSource}
					pagination={{
						showQuickJumper: true,
						showSizeChanger: true,
						pageSizeOptions: ['10', '15', '20'],
					}}
				/>
			</div>)
	}
}

export default Team
