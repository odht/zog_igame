
import React, { Component } from 'react';
import { Table, Form, DatePicker } from 'antd';
import moment from 'moment';
import { timetrans } from '../../utils/tools';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
	<EditableContext.Provider value={form}>
		<tr {...props} />
	</EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
	state = {
		editing: false,
	}

	toggleEdit = () => {
		const editing = !this.state.editing;
		this.setState({ editing }, () => {
			if (editing) {
				// this.input.focus();
			}
		});
	}

	save = (e) => {
		const { record, handleSave } = this.props;
		console.log(this.props)
		this.form.validateFields((error, values) => {
			if (error && error[e.currentTarget.id]) {
				return;
			}
			this.toggleEdit();
			const start = values.start
			handleSave({ ...record, start });
		});
	}
	onOk = (data) => {
		this.save()
	}

	render() {
		const { editing } = this.state;
		const {
			editable,
			dataIndex,
			title,
			record,
			index,
			handleSave,
			...restProps
		} = this.props;
		return (
			<td {...restProps}>
				{editable ? (
					<EditableContext.Consumer>
						{(form) => {
							this.form = form;
							return (
								editing ? (
									<FormItem style={{ margin: 0 }}>
										{form.getFieldDecorator(dataIndex, {
											rules: [{
												required: true,
												message: `${title} is required.`,
											}],
											initialValue: moment(),
										})(
											<DatePicker
												showTime={{
													use12Hours: false
												}}
												open
												onOk={this.onOk}
												// onChange={this.onChange}
												style={{ outline: "none !important" }}
												autoFocus={true}
												onOpenChange={this.onOpenChange}
												placeholder="请选择"
												format="YYYY-MM-DD HH:mm:ss"
												style={{ width: '100%' }}

											/>
										)}
									</FormItem>
								) : (
										<div
											className="editable-cell-value-wrap"
											style={{ paddingRight: 24 }}
											onClick={this.toggleEdit}
										>
											{restProps.children}
										</div>
									)
							);
						}}
					</EditableContext.Consumer>
				) : restProps.children}
			</td>
		);
	}
}




/**
 * @param rounds number 比赛次数
 * @param interval number 每轮比赛时长
 *  @param view array [[2019-01-01 00:00:00,2019-01-02 1:03:00]]
 * props:{rounds:number,interval:number(分钟)}
 * 每次表格改变 调用onChange 打印 每轮比赛的起始终止时间 
 */
export default class MatchTimeList extends Component {
	constructor(props) {
		super(props)
		this.columns = [{
			title: '轮次',
			dataIndex: 'nth',
			align: "center",
			width: 150,
		}, {
			title: "起始时间",
			dataIndex: 'start',
			width: 150,
			editable: true,
			iterval: 30
		}, {
			title: '连接符',
			dataIndex: 'to',
			align: "center",
			width: 30,
		}, {
			title: '终止时间',
			dataIndex: 'end',
			width: 150,
		}];
		const { rounds, value } = this.props;
		const data = [];
		for (let i = 0; i < rounds; i++) {
			data.push({
				key: i,
				nth: `第 ${i + 1} 轮`,
				start: value[i] ? value[i][0] : '点击设置比赛开始时间',
				to: "~",
				end: value[i] ? value[i][1] : ''
			});
		}
		this.state = {
			dataSource: data
		}
	}

	handleSave = (row) => {
		const { interval } = this.props
		row.end = moment(row.start + interval * 60 * 1000).format('YYYY-MM-DD HH:mm:ss')
		row.start = moment(row.start).format('YYYY-MM-DD HH:mm:ss')
		const newData = [...this.state.dataSource];
		const index = newData.findIndex(item => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row,
		});
		this.setState({ dataSource: newData }, this.onChange);
	}

	onChange = () => {
		const { dataSource } = this.state;
		const { onChange } = this.props
		const timeList = dataSource.map((item) => {
			return [item.start, item.end]
		})
		onChange(timeList)
		console.log(timeList)
	}
	render() {
		const { dataSource } = this.state;
		const components = {
			body: {
				row: EditableFormRow,
				cell: EditableCell,
			},
		};
		const columns = this.columns.map((col) => {
			if (!col.editable) {
				return col;
			}
			return {
				...col,
				onCell: record => ({
					record,
					editable: col.editable,
					dataIndex: col.dataIndex,
					title: col.title,
					handleSave: this.handleSave,
				}),
			};
		});
		return (
			<React.Fragment>
				<Table
					style={{
						width: 800
					}}
					components={components}
					bordered={true}
					columns={columns}
					dataSource={dataSource}
					onChange={this.onChange}
					showHeader={false}
					size="small"
					pagination={{ hideOnSinglePage: true, pageSize: 100 }}
					scroll={{ y: 600 }}
				/>
			</React.Fragment>
		)
	}
}
