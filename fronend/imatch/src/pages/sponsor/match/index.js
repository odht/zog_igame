/**
 * title: 赛事列表 - 智赛桥牌
 * icon: form
 */
import React, { useEffect, useState } from 'react';
import { Button, Divider, Radio, Table, Input, Popconfirm, Tag } from 'antd'
import router from 'umi/router'
import { parseNotes } from '@/utils/tools'
import odoo from '../../../odoo-rpc/odoo';

const RadioGroup = Radio.Group
function toCreate() {
	router.push('/sponsor/match/newMatch')
}
async function deleteGame(text, record, setState) {
	setState((pre) => {
		return {
			...pre,
			loading: true
		}
	})
	const cls = odoo.env('og.game');
	const result = await cls.unlink(record.id)
	if (result) {
		getGameData().then((val) => {
			setState((pre) => {
				return {
					...pre,
					loading: false,
					dataSource: val.map((item) => parseNotes(item))
				}
			})
		})
	}
}
function organization(text, record) {

}
function managerGame(text, record) {
	router.push({
		pathname: '/sponsor/match/matchManager',
		state: {
			game: record
		}
	})
}
async function getGameData(domain) {
	const cls = odoo.env('og.game');
	const fields = {
		name: null,
		date_from: null,
		date_thru: null,
		notes: null,
		state: null,
	}
	const dataSource = await cls.search_read([['id', '>=', 0]], fields)
	return dataSource
}
const Checked = ({ setState }) => {
	const checked = ['审核中', '通过', '未通过']
	const money = ['已缴费', '未缴费']
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
			<span style={{ marginLeft: 50 }}>缴费状态：</span>
			<RadioGroup
				onChange={updateData}
			>
				{money.map((item) => <Radio value={item} key={item}>{item}</Radio>)}
			</RadioGroup>
		</>
	)
}

const TableData = ({ state: { dataSource, loading }, setState }) => {

	const columns = [{
		title: "比赛名称",
		dataIndex: "name",
		align: "center",
	}, {
		title: "开始时间",
		dataIndex: "date_from",
		align: "center",
	}, {
		title: "结束时间",
		dataIndex: "date_thru",
		align: "center",
	}, {
		title: "主办方",
		dataIndex: "host",
		align: "center",
	}, {
		title: "状态",
		dataIndex: "status",
		align: "center",
		render: (text, record) => {
			return (
				<Tag color={record.state === 'draft' ? "blue" : record.state === 'conformed' ? "green" : "red"}>
					{record.state === 'draft' ? '审核中' : record.state === 'conformed' ? "已通过" : "未通过"}
				</Tag>
			)
		}
	}, {
		title: "交费",
		dataIndex: "isMoney",
		align: "center",
	}, {
		title: '操作',
		dataIndex: 'operation',
		align: "center",
		render: (text, record) => {
			return (
				<>
					<a onClick={() => organization(text, record)}>组织</a>
					<a onClick={() => managerGame(text, record)} style={{ marginLeft: 10 }}>管理</a>
					<Popconfirm title="确认删除?" onConfirm={() => deleteGame(text, record, setState)}>
						<a href="javascript:;" style={{ marginLeft: 10 }}>删除</a>
					</Popconfirm>
				</>
			)
		}
	},]
	return (
		<Table
			loading={loading}
			columns={columns}
			bordered
			rowSelection={{}}
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
	const [state, setState] = useState({ loading: true, dataSource: [] })
	const updateData = (domain) => {
		setState((pre) => {
			return { ...pre, loading: true }
		})
		getGameData(domain).then((val) => {
			setState((pre) => {
				return {
					...pre,
					loading: false,
					dataSource: val.map((item) => parseNotes(item))
				}
			})
		})
	}
	useEffect(() => {
		updateData()
	}, [])
	console.log(state);

	return (
		<div>
			{console.log(11111111111111)}
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
				<Input.Search
					placeholder="输入比赛名称"
					onSearch={value => console.log(value)}
					enterButton
					style={{ maxWidth: "50%", marginRight: 50 }}
				/>
				<Button onClick={toCreate}>新建比赛</Button>
			</div>
			<Divider style={{ height: 1.5 }} />
			<Checked setState={setState} />
			<TableData state={state} setState={setState} />
		</div>
	)
}

