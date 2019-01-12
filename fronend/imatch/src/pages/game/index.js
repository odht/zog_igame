import React, { Component } from 'react';
import { connect } from 'dva'
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { deepCopy, turnData } from '@/utils/tools';
import odoo from '@/odoo-rpc/odoo';

const columns = [
	{
		title: '赛事名称',
		dataIndex: 'name',
		width: 150,
		render: (text, record) => {
			return (
				<Link
					to={{
						pathname: '/details/dhome',
						state: { gameData: record }
					}}
				// target="_black"
				>
					{text}
				</Link>
			)
		}
	},
	{
		title: '举办方',
		dataIndex: 'age',
		width: 150,
	},
	{
		title: '时间',
		dataIndex: 'time',
		width: 150,
	}, {
		title: '类型',
		dataIndex: 'tags',
		width: 150,
	}, {
		title: '备注',
		dataIndex: 'ps',
		width: 150,
	},]
class TeamList extends Component {
	state = {
		dataSource: [],
		loading: true,
	}
	componentDidMount() {
		this.getData()
	}
	getData = async () => {
		const Game = odoo.env('og.game');
		const domain = [['id', '>=', 0]];
		const fields = {
			id: null,
			name: null,
			date_from: null,
			date_thru: null,
			player_ids: {id:null,name:null},
			notes: null,
			team_ids: null
		}
		const originDataSource = await Game.search_read(domain, fields);
		console.log(originDataSource);
		const dataSource = turnData(deepCopy(originDataSource))
		await this.setState({
			dataSource,
			loading: false
		})
	}

	render() {
		const { loading, dataSource } = this.state;
		return (
			<div >
				<Table
					loading={loading}
					rowKey={row => row.id}
					columns={columns}
					dataSource={dataSource}
					pagination={{
						showQuickJumper: true,
						showSizeChanger: true,
						pageSizeOptions: ['10', '15', '20'],
					}}
					scroll={{ y: 300 }} />
			</div>)
	}
}


export default TeamList
