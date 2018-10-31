import { Component } from "react";
import { Table, Form, Input, Button, Select, Modal, DatePicker, Popconfirm, Divider } from 'antd'
import { connect } from 'dva'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option


@Form.create()
@connect(({ match }) => ({ match }))
class SearchForm extends Component {
    constructor(props) {
        super(props)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'match/search',
                    payload: values,
                })
            }
        });
    }
    handleFormReset = () => {
        this.props.form.resetFields();
        this.props.handleFormReset()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleFormReset } = this.props;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem label="比赛名称" >
                    {getFieldDecorator('name', {

                    })(<Input placeholder="请输入" />)
                    }
                </FormItem>
                <FormItem label="状态">
                    {getFieldDecorator('status', {
                    })(
                        <Select placeholder="请选择" style={{ width: '200px' }}>
                            <Option value="0">进行中</Option>
                            <Option value="1">已结束</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        查询
                </Button>
                    <Button type='primary' style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                        重置
              </Button>
                </FormItem>
            </Form>)
    }

} 

@connect(({ match }) => ({ match }))
@Form.create()
class TableList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRows: [],
            visible: false,
            isAdding: false,
            currentRowData: {}
        }
    }
    fetchData = () => {
        this.props.dispatch({
            type: 'match/fetch'
        })
    }
    componentDidMount() {
        this.fetchData()
    }
    onChange = (selectedRowKeys, selectedRows) => {
        console.log(selectedRows)
        this.setState({
            selectedRows
        })
    }
    handleDelete = () => {
        const selectKeys = this.state.selectedRows.map((Row) => (Row.key)); console.log(selectKeys)
        this.props.dispatch({
            type: 'match/delete',
            payload: { deleteKeys: selectKeys }
        })
    }
    deleteOne = (deleteKey) => {

        this.props.dispatch({
            type: 'match/delete',
            payload: { deleteKeys: [deleteKey] }
        })
    }
    handleCancel = (e) => {

        this.setState({
            visible: false,
        });
    }
    showEditModal = (record) => {
        this.setState({
            isAdding: false,
            visible: true,
            currentRowData: record
        })
    }
    showAddModal = () => {
        this.setState({
            isAdding: true,
            visible: true,
        })
    }
    handleEdit = () => {
        const { dispatch, form } = this.props;
        const { currentRowData } = this.state;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                visible: false,
            });
            dispatch({
                type: 'match/edit',
                payload: { ...currentRowData, ...values }
            })
        })
    }

    handleAdd = () => {
        const { dispatch, form } = this.props;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                visible: false,
            }); console.log(values)
            dispatch({
                type: 'match/add',
                payload: values
            })
        })
    }

    render() {
        const columns = [{
            title: '比赛名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '报名截止时间',
            dataIndex: 'expiration',
            key: 'expiration',
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        }, {
            title: '开始时间',
            dataIndex: 'start',
            key: 'start',
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: val => (val == 0 ? '进行中' : '已结束'),
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                console.log(record)
                return (<div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => { this.deleteOne(record.key) }} >
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <a onClick={() => this.showEditModal(record)}>编辑</a>
                </div>)
            },
        }];
        const { match: { list }, form: { getFieldDecorator } } = this.props;
        const { visible, isAdding, currentRowData } = this.state; console.log(currentRowData)
        const modalFooter = isAdding ? { okText: '添加', onOk: this.handleAdd, onCancel: this.handleCancel }
            : { okText: '保存', onOk: this.handleEdit, onCancel: this.handleCancel };

        const getModalContent = () => {
            if (isAdding) {
                console.log('cccccccccccccccccc')
                return (
                    <Form >
                        <FormItem label="比赛名称" >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入name' }],
                            })(<Input placeholder="比赛名称" />)
                            }
                        </FormItem>
                        <FormItem label="报名截止时间" >
                            {getFieldDecorator('expiration', {
                                rules: [{ required: true, message: '请输入报名截止时间' }],
                            })(<DatePicker />)
                            }
                        </FormItem>
                        <FormItem label="开始时间" >
                            {getFieldDecorator('start', {
                                rules: [{ required: true, message: '请输入开始时间' }],
                            })(<DatePicker />)
                            }
                        </FormItem>
                        <FormItem label="状态">
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: '请添加状态' }]
                            })(
                                <Select placeholder="请选择" style={{ width: '200px' }}>
                                    <Option value="0">进行中</Option>
                                    <Option value="1">已结束</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                );
            } else {
                console.log('aaaaaaaaaaaaaaaaaaaaaaa')
                return (
                    <Form >
                        <FormItem label="比赛名称" >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入name' }],
                                initialValue: currentRowData.name,
                            })(<Input placeholder="比赛名称" />)
                            }
                        </FormItem>
                        <FormItem label="报名截止时间" >
                            {getFieldDecorator('expiration', {
                                rules: [{ required: true, message: '请输入name' }],
                                initialValue: moment(currentRowData.expiration),
                            })(<DatePicker />)
                            }
                        </FormItem>
                        <FormItem label="开始时间" >
                            {getFieldDecorator('start', {
                                rules: [{ required: true, message: '请输入name' }],
                                initialValue: moment(currentRowData.start),
                            })(<DatePicker />)
                            }
                        </FormItem>
                        <FormItem label="状态">
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: '请输入name' }],
                                initialValue: currentRowData.status,
                            })(
                                <Select placeholder="请选择" style={{ width: '200px' }}>
                                    <Option value="0">进行中</Option>
                                    <Option value="1">已结束</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                );
            }
        };

        return (
            <div>
                <SearchForm handleFormReset={this.fetchData} />
                <div>
                    <Button onClick={this.showAddModal}>新建</Button> <Button onClick={this.handleDelete}>删除</Button>
                </div>
                <Table rowSelection={{ onChange: this.onChange }} dataSource={list} columns={columns} />
                <Modal
                    title={isAdding ? '添加' : '编辑'}
                    width={640}
                    destroyOnClose
                    visible={visible}
                    {...modalFooter}
                >
                    {getModalContent()}
                </Modal>
            </div>

        )
    }
}

export default TableList