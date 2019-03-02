/**
 * title: 赛事管理 - 智赛桥牌
 * icon: form
 */
import React, { useEffect } from 'react';
import { Button, Divider, Radio, Table } from 'antd'
import router from 'umi/router'

const RadioGroup = Radio.Group
function toCreate(){
	router.push('/sponsor/match/newMatch')
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

const TableData = (props) => {
	const columns = [{
		title: "比赛名称",
		dataIndex: "name"
	}, {
		title: "开始时间",
		dataIndex: "date-from"
	}, {
		title: "结束时间",
		dataIndex: "date-thus"
	}, {
		title: "创建者",
		dataIndex: "creat"
	}, {
		title: "状态",
		dataIndex: "status"
	}, {
		title: "交费",
		dataIndex: "isMoney"
	}, {
		title: '操作',
		dataIndex: 'operation',
		render: () => <a href="javascript:;">管理</a>
	},]
	return (
		<>
			<Table
				columns={columns}
				bordered
				style={{
					marginTop:24,
					width:'55%'
				}}
			/>
		</>
	)
}

export default (props) => {
	return (
		<div>
			<Button onClick={toCreate}>新建比赛</Button>
			<Divider style={{ height: 1.5 }} />
			<Checked />
			<TableData />
		</div>
	)
}

