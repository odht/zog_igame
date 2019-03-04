/**
 * title: 赛事管理 - 智赛桥牌
 * icon: form
 */
import React, { useEffect, useState } from 'react';
import { Button, Divider, Radio, Table, Spin } from 'antd'
import router from 'umi/router'
import { parseNotes } from '@/utils/tools'
import odoo from '../../../odoo-rpc/odoo';

const RadioGroup = Radio.Group
function toCreate() {
	router.push('/sponsor/match/newMatch')
}
async function getGameData() {
	const cls = odoo.env('og.game');
	console.log(cls._env, cls._rpc);
	const fields = {
		name: null,
		date_from: null,
		date_thru: null,
		notes: null,
	}
	const dataSource = await cls.search_read([['id', '>=', 0]], fields)
	return dataSource
}
const Checked = (props) => {
	const checked = ['全部', '预审', '预审未过', '比赛中', '备案', '欠费']
	const updateData = (e) => {
		// do something
	}
	return (
		<>
			<span>审核状态：</span>
			<RadioGroup
				onChange={updateData}
			>
				{checked.map((item) => <Radio value={item} key={item}>{item}</Radio>)}
			</RadioGroup>
		</>
	)
}

const TableData = ({dataSource,loading}) => {
	
	const columns = [{
		title: "比赛名称",
		dataIndex: "name"
	}, {
		title: "开始时间",
		dataIndex: "date_from"
	}, {
		title: "结束时间",
		dataIndex: "date_thru"
	}, {
		title: "主办方",
		dataIndex: "host"
	}, {
		title: "状态",
		dataIndex: "status"
	}, {
		title: "交费",
		dataIndex: "isMoney"
	}, {
		title: '操作',
		dataIndex: 'operation',
		render: () => {
			return (
				<>
					<a href="javascript:;" >组织</a>
					<a href="javascript:;" style={{marginLeft:10}}>管理</a>
					<a href="javascript:;"style={{marginLeft:10}}>删除</a>
				</>
			)
		}
	},]

	return (
		<Table
			loading={loading}
			columns={columns}
			bordered
			rowKey={(row) => row.name}
			dataSource={dataSource}
			style={{
				marginTop: 24,
				maxWidth: '90%',
				minWidth: 700,
				backgroundColor: "white"
			}}
		/>
	)
}

export default (props) => {
	const [loading, setLoading] = useState(true)
	const [dataSource, setDataSource] = useState([])
	useEffect(() => {
		getGameData().then((val) => {
			setDataSource(val.map((item) => parseNotes(item)))
			setLoading(false)
		})
	}, [])
	console.log(dataSource);
	return (
		<div>
			<Button onClick={toCreate}>新建比赛</Button>
			<Divider style={{ height: 1.5 }} />
			<Checked />
			<TableData dataSource={dataSource} loading={loading} />
		</div>
	)
}

