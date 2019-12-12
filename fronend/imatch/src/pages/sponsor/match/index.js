/**
 * title: 赛事列表 - 智赛桥牌
 * icon: form
 * index: 0
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
	router.push({
		pathname: '/sponsor/match/originzation',
	})
	localStorage.game = record.id
}
function managerGame(text, record) {
	router.push({
		pathname: '/sponsor/match/matchManager',
	})
	localStorage.game = record.id
}
function arrangeGame(text, record) {
	router.push({
		pathname: '/sponsor/match/arrange',
	})
	localStorage.game = record.id
}
async function getGameData(domain) {
	const cls = odoo.env('og.game');
	const fields = {
		name: null,
		date_from: null,
		date_thru: null,
		notes: null,
		state: null,
		paymentStatus: null,
		remarks: null,
	}
	const dataSource = await cls.search_read(domain || [['id', '>=', 0]], fields)
	return dataSource
}
const Checked = ({ setState, updateData }) => {
	const [val1, setVal1] = useState(undefined)
	const [val2, setVal2] = useState(undefined)
	const checked = [{ value: "draft", text: '审核中' }, { value: "conformed", text: '通过' }, { value: "cancel", text: '未通过' }]
	const money = [{ value: true, text: '已缴费' }, { value: false, text: '未缴费' }]
	const filterData = (field, val) => {
		setState((pre) => {
			const filter = { ...pre.filter }
			filter[field] = val
			return { ...pre, filter: filter }
		})
	}

	return (
		<>
			<Button
				style={{ marginRight: 24 }}
				onClick={() => {
					setVal1(undefined)
					setVal2(undefined)
					setState((pre) => ({ ...pre, filter: {} }))
					updateData()
				}}
			>
				清空选择
			</Button>
			<span>审核状态：</span>
			<RadioGroup
				value={val1}
				onChange={(e) => {
					setVal1(e.target.value)
					filterData("state", e.target.value)
				}}
			>
				{checked.map((item) => <Radio value={item.value} key={item.value}>{item.text}</Radio>)}
			</RadioGroup>
			<span style={{ marginLeft: 50 }}>缴费状态：</span>
			<RadioGroup
				value={val2}
				onChange={(e) => {
					setVal2(e.target.value)
					filterData("paymentStatus", e.target.value)
				}}
			>
				{money.map((item) => <Radio value={item.value} key={item.value}>{item.text}</Radio>)}
			</RadioGroup>

		</>
	)
}

const TableData = ({ state: { dataSource, loading, filter }, setState }) => {

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
		dataIndex: "state",
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
		dataIndex: "paymentStatus",
		align: "center",
		render: (text, record) => {
			return (
				<Tag color={record.paymentStatus === true ? "green" : "red"}>
					{record.paymentStatus === true ? '是' : "否"}
				</Tag>
			)
		}
	}, {
		title: '操作',
		dataIndex: 'operation',
		align: "center",
		render: (text, record) => {
			return (
				<>
					<a onClick={() => organization(text, record)}>组织</a>
					<a onClick={() => managerGame(text, record)} style={{ marginLeft: 10 }}>管理</a>
					<a onClick={() => arrangeGame(text, record)} style={{ marginLeft: 10 }}>编排</a>
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
			dataSource={dataSource.filter((item) => Object.keys(filter).every((each) => item[each] === filter[each]))}
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
	const [state, setState] = useState({ loading: true, dataSource: [], filter: {} })
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
			<Checked setState={setState} updateData={updateData} />
			<TableData state={state} setState={setState} />
		</div>
	)
}

