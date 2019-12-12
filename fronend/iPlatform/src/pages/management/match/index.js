import React, { Component } from 'react';
import { Button, Input, Table, Popconfirm, AutoComplete, Select} from 'antd';
import {connect} from 'dva';
import data from './data';
// import Pop from './creat';
import router from 'umi/router';
// import { routerActions } from 'react-router-redux';
import PopForm from '@/component/form';

const Option=Select.Option;

// function timetrans() {//时间戳转化
//     var date = new Date();
//     var Y = date.getFullYear() + '-';
//     var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//     var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
//     return Y + M + D
// }

class Bridge extends Component {
    constructor(props){
        super(props);
        this.props=props;
    }
    columns = [
        {
            title: '比赛名称',
            dataIndex: 'name',
            align:'center'
        },
        {
            title: '报名截止时间',
            dataIndex: 'signEndTime',
            align:'center'
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            align:'center'
        },
        {
            title: '结束时间',
            dataIndex: "over_time",
            align:'center'
        },
        {
            title:'状态',
            dataIndex:'state',
            align:'center',
            render: (text, record) => {
                console.log('--- 状态 record --- ',record);
                return (
                    <Select
                      style={{width:100}}
                      defaultValue= {record.state}
                      onChange={this.stateChange.bind(this,record)}
                    >
                        <Option value='draft'>待审核</Option>
                        <Option value='conformed'>已审核</Option>
                        <Option value='locked'>报名截止</Option>
                        <Option value='ready'>进行中</Option>
                        <Option value='done'>结束</Option>
                        <Option value='cancel'>取消比赛</Option>
                    </Select>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            align:'center',
            render: (text, record) => {
                console.log('--- 操作 record --- ',record);
                return (
                    <div>
                        {this.props.games.dataSource.length >= 1
                            ?   <React.Fragment>
                                <Popconfirm title="确认删除?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record.key)}>
                                    <a href="# " style={{ marginRight: '10px' }}>删除</a>
                                </Popconfirm>
                                <a href="# " onClick={this.edit.bind(this, record)} style={{marginRight: '10px'}}>编辑</a>
                                <a href="# " onClick={this.view.bind(this, record)}>查看</a>
                                </React.Fragment>
                            : null}
                    </div>
                )
            },
        }
    ]

    //查看详情
    view=(record)=>{
        router.push(`/management/match/gameView?id=${record.key}`)
    }
    //删除一项
    handleDelete = (key) => {
        this.props.dispatch({
            type: 'games/delOne',
            key
        })
    }
    //修改状态
    stateChange(record,value){
        console.log('--- stateChange record-value --- ',record,value);
        record.state=value
    }
    //
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.dispatch({
            type: 'games/saveSelectedRowKeys',
            selectedRowKeys
        })
    }
    handleRemove() {
        this.props.dispatch({
            type: 'games/delSome',
        })
    }
    changeVisible() {
        this.props.dispatch({
            type: 'games/changeVisible'
        })
    }
    edit(record) {
        this.props.dispatch({
            type: 'games/changeVisible',
            record
        })
    }
    editChange(newEdit) {
        var dataSource = this.props.games.dataSource.concat()
        var key
        if (newEdit.key) {
            key = newEdit.key
        } else {
            key = dataSource[dataSource.length - 1].key + 1
        }
        const index = dataSource.findIndex(item => key === item.key);
        if (index > -1) {
            dataSource.splice(index, 1, newEdit);
            this.props.dispatch({
                type: 'games/updateData',
                dataSource
            })
        } else {
            newEdit.key = key;
            dataSource.push(newEdit)
            this.props.dispatch({
                type: 'games/updateData',
                dataSource
            })
        }
    }
    searchValueChange(value) {
        const searchData = this.props.games.dataSource.map((item) => item.name).filter((item) => item.indexOf(value) >= 0)
        this.props.dispatch({
            type: 'games/searchData',
            searchData
        })
    }
    search(value) {//.ant-select-dropdown-hidden控制是否显示
        var dataSource=this.props.games.dataSource.concat()
        const searchData=this.props.games.searchData
        if (searchData.length > 0) {
            dataSource=dataSource.filter((item)=>searchData.find(ele =>(item.name===ele)?true:false))
        }
        //逻辑错误，缺少数据缓存。
        if(!value){
            dataSource=data
        }
        this.props.dispatch({
            type: 'games/saveDataSource',
            dataSource
        })
    }
    render() {
        const { dataSource, selectedRowKeys, searchData, allowClear, edit, visible } = this.props.games;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const hasSelected = selectedRowKeys.length > 0;
        console.log(hasSelected);
        const pagination = {
            pageSize: 6,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15'],
        }
        const lists = [
            {
                label: '比赛名称',
                input: {
                    type: 'input'
                },
                attribute: 'name',

            },
            {
                label: '比赛日程',
                input: {
                    type: 'date'
                },
                attribute: ['start_time','over_time'],
            },{
                label: '报名截止日期',
                input: {
                    type: 'date'
                },
                attribute: 'signEndTime',
            },{
                label: '裁判',
                input: {
                    type: 'input'
                },
                attribute: 'referee',

            },{
                label: '仲裁',
                input: {
                    type: 'input'
                },
                attribute: 'arbitrator',

            },{
                label: '举办方',
                input: {
                    type: 'input'
                },
                attribute: 'arbitrator',

            },{
                label: '赞助方',
                input: {
                    type: 'input'
                },
                attribute: 'host_unit',

            },{
                label: '承办单位',
                input: {
                    type: 'input'
                },
                attribute: 'undertaking_unit',

            },{
                label: '协办单位',
                input: {
                    type: 'input'
                },
                attribute: 'cooperating_unit',

            },
        ]
        var list;
        if(Object.keys(edit).length>0){
            list=lists
        }else{
            list=[...lists]
            list.length=3
        }
        return (
            <div style={{ background: "#fff", paddingTop: "15px" }}>
                <AutoComplete
                    dataSource={searchData}
                    onChange={this.searchValueChange.bind(this)}
                    allowClear={allowClear}
                >
                    <Input.Search
                        placeholder="搜索比赛"
                        onSearch={this.search.bind(this)}
                        style={{ width: 250, marginLeft: '25px' }}
                        enterButton
                    />
                </AutoComplete>
                <Button
                    onClick={this.handleRemove.bind(this)}
                    type="primary"
                    style={{ marginBottom: 16, float: 'right', marginRight: '55px' }}
                    disabled={!hasSelected} >
                    批量删除
                </Button>
                <Button
                    type="primary"
                    style={{ marginBottom: 16, marginRight: 16, float: 'right' }}
                    onClick={this.changeVisible.bind(this)}
                >
                    创建比赛
                </Button>
                <Table
                    rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={dataSource}
                    pagination={pagination}
                />
                <PopForm
                    title='新建比赛'
                    list={list}
                    visible={visible}
                    onCancel={this.changeVisible.bind(this)}
                    edit={edit}
                    onOk={this.editChange.bind(this)}
                />
                {/* <Pop></Pop> */}
            </div>
        )
    }
}

export default connect(({games})=>({games}))(Bridge)
// export default connect(({contactsList})=>({contactsList}))(Contacts)
