import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import './team.css';
import { connect } from 'dva';
import { lookup } from '@/utils/tools';
import odoo from '@/odoo-rpc/odoo';


const columns = [{
	title: '队号',
	dataIndex: 'id',
	key: 'id',
	align: 'center',
	width: '7%'
},{
	title: '队名',
	dataIndex: 'name',
	key: 'name',
	align: 'center',
	width: '16%'
},{
	title: '领队',
	dataIndex: 'leader',
	key: 'leader',
	align: 'center',
	width: '9%'
},{
	title: '教练',
	dataIndex: 'coach',
	key: 'coach',
	align: 'center',
	width: '9%'
},{
	title: '队员',
	dataIndex: 'players',
	key: 'players',
	align: 'center',
	width: '52%'
},{
	title: '编辑',
	dataIndex: 'modify',
	key: 'modify',
	align: 'center',
	width: '7%',
	render: () => (<a>编辑</a>)
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
			name:null,
			player_ids:{
				id:null,
				name:null,
				role:null
			},
		}
		const cls=odoo.env('og.team');
		const dataSource=await cls.read(team_ids,fields);
		console.log('====== 赛队数据 ------',dataSource);
		
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
