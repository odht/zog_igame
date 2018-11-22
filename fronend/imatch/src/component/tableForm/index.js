import React, { Component } from 'react';
import { Button, Input, Table, AutoComplete, Popconfirm, } from 'antd';
import router from 'umi/router';
import { lookup } from '@/utils/tools';
import PopForm from '@/component/TableForm/form/form'
import WrapTableForm from '@/component/TableForm/table/table'
export { PopForm }
export { WrapTableForm }
class Tables extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.model = this.props.model;
        this.model ? null : this.data = this.props.data || void 0;
    }
    render() {
        const { selectedRowKeys, searchData, allowClear, edit, visible, } = this.props;
        var { columns,list } = this.props;    
        const dataSource = this.props.getdata();
        const rowSelection = {
            selectedRowKeys,
            onChange: this.props.onSelectChange.bind(this),
        };
        const pagination = {
            pageSize: 6,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15'],
        }
        var columnsOnly
        columns.forEach((item, index) => {
            if (item.render || item.edit) {
                columnsOnly = {
                    title: item.title,
                    dataIndex: item.dataIndex,
                    render: (text, record) => {
                        return (
                            <div>
                                {item.edit ?
                                    <>
                                        <Popconfirm title="确认删除？" onConfirm={() => this.props.handleDelete(record.id)}>
                                            <a href="javascript:;" style={{ marginRight: '10px' }}>删除</a>
                                        </Popconfirm>
                                        <a href="javascript:;" onClick={() => this.props.edit(record)} style={{ marginRight: '10px' }}>编辑</a>
                                    </> : null}
                                {item.render(text, record, this)}
                            </div>
                        )
                    },
                }
                columns.splice(index, 1, columnsOnly)
            }
        });
        return (
            <div style={{ background: "#fff", paddingTop: "15px" }}>
                <AutoComplete
                    dataSource={searchData}
                    onChange={this.props.searchValueChange.bind(this)}
                    allowClear={allowClear}
                >
                    <Input.Search
                        placeholder="搜索"
                        onSearch={this.props.search.bind(this)}
                        style={{ width: 250, marginLeft: '25px' }}
                        enterButton
                    />
                </AutoComplete>
                <Button
                    onClick={this.props.handleRemove.bind(this)}
                    type="primary"
                    style={{ marginBottom: 16, float: 'right', marginRight: '55px' }}
                >
                    批量删除
                </Button>
                <Button
                    type="primary"
                    style={{ marginBottom: 16, marginRight: 16, float: 'right' }}
                    onClick={this.props.changeVisible.bind(this)}
                >
                    {this.props.addTitle}
                </Button>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={pagination}
                />
                {list ? <PopForm
                    addTitle={this.props.formAddTitle}
                    editTitle={this.props.formEditTitle}
                    list={list}
                    visible={visible}
                    onOk={this.props.editChange.bind(this)}
                    edit={edit}
                    onCancel={this.props.changeVisible.bind(this)} />
                    : null}
            </div>
        )
    }
}
export default WrapTableForm(Tables)