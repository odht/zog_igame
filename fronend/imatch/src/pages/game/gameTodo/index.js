import React, { Component } from 'react';
import styles from './index.less';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { deepCopy, turnData } from '@/utils/tools';
import odoo from '@/odoo-rpc/odoo';

const columns = [
	{
		title: '赛事名称',
		dataIndex: 'gameName',
		key: 'gameName',
		width: 150,
		align:'center',
		render: (text, record) => {
			console.log(text,record);
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
		title: '主办单位',
		dataIndex: 'host',
		key: 'host',
		width: '25%',
		align:'center'
	},
	{
		title: '时间',
		dataIndex: 'timeSpace',
		key: 'timeSpace',
		width: '35%',
		align:'center'
	}, {
		title: '类型',
		dataIndex: 'match_type',
		key: 'match_type',
		width: '20%',
		align:'center',
		render:(text, record) => {
			console.log(text);
			if (text === 'team') {
				return "队式赛"; 
			} else {
				return "双人赛";
			}
		}
	},
	//  {
	// 	title: '备注',
	// 	dataIndex: 'ps',
	// 	key:'ps',
	// 	width: '20%',
	// 	align:'center'
	// },
]


class TeamList extends Component {
	state = {
		gameDataArr: [],
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
			team_ids: null,
			match_type: null
		}
		const originDataSource = await Game.search_read(domain, fields);
		// console.log(originDataSource);
		const dataSource = turnData(deepCopy(originDataSource))
		// console.log('---dataSource',dataSource);
		// console.log(dataSource[0].notes);
		var gameArr = [];
		dataSource.forEach(element => {
			// console.log(element);
			const gameInfo = JSON.parse(element.notes);
			gameInfo["gameName"] = element.name;
			gameInfo["match_type"] = element.match_type;
			gameInfo["timeSpace"] = element.date_from + ' ~ ' + element.date_thru;
			gameInfo["date_from"] = element.date_from;
			gameInfo["date_thru"] = element.date_thru;
			gameInfo["id"] = element.id;
			gameInfo["team_ids"] = element.team_ids;
			// console.log(gameInfo);
			
			gameArr.push(gameInfo);
		});
		console.log(gameArr);
		await this.setState({
			gameDataArr:gameArr,
			loading: false
		})
	}

	render() {
		const { loading, gameDataArr } = this.state;
		return (
			<div >
				<Table
					className={styles.tableBox}
					// bordered
					loading={loading}
					rowKey={row => row.id}
					columns={columns}
					dataSource={gameDataArr}
					pagination={{
						showQuickJumper: true,
						showSizeChanger: true,
						pageSizeOptions: ['10', '15', '20'],
					}}
				/>
			</div>)
	}
}


export default TeamList
