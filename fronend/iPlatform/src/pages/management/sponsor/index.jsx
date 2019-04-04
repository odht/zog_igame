/*
 * @Author: Nxf
 * @Date: 2019-03-04 10:18:36
 * @Last Modified by: Nxf
 * @Last Modified time: 2019-03-18 11:12:31
 */
import React, { Component } from "react";
import { Table ,Form, Input, Button, Select, Modal, Popconfirm, Divider, Row, Col } from 'antd';
import router from "umi/router";
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;



class SearchForm extends Component {

    constructor(props){
        super(props);
        this.state={

        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('------- search_value -------',values);
            if (!err) {
                this.props.dispatch({
                    type:'sponsor/search',
                    payload:values,
                })
            }
        });
    }
    handleFormReset = ()=>{
        this.props.form.resetFields();
        this.props.handleFormReset();
        // console.log(this.props.handleFormReset());
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { handleFormReset } = this.props;
        console.log('----- SearchForm handleFormReset -----',handleFormReset);
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem label="主办方名称" >
                    {getFieldDecorator('name', { })( <Input placeholder="主办方名称"/>)}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                        重置
                    </Button>
                </FormItem>
            </Form>)
    }

}

// @Form.create()
// @connect(({match})=>({match}))

SearchForm = Form.create()(SearchForm);
SearchForm = connect(({sponsor})=>({sponsor}))(SearchForm);



class TableList extends Component{
    constructor(props){
      super(props)
      this.state={
          selectedRows : [],
          visible:false,
          isAdding:false,
          currentRowData:{}
      }
    }
    
    fetchData = () => {
      this.props.dispatch({
          type:'sponsor/fetch'
      })
    }
    componentDidMount(){
        this.fetchData()
    }
    // 查看详情
    onCheck = (record) => {
        console.log('---- record -----',record);
        router.push({
            pathname:'/management/sponsor/sponsorInfo',
            query:record
        });
    }


    onChange = (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
      this.setState({
          selectedRows
      })
    }
    handleDelete= () => {
      console.log('-- selectedRows --',this.state.selectedRows);
      const selectKeys = this.state.selectedRows.map((item)=>(item.key));
      console.log(selectKeys);
      this.props.dispatch({
          type:'sponsor/delete',
          payload:{deleteKeys:selectKeys}
      })
    }
    deleteOne = (deleteKey) => {
      console.log(deleteKey);
      this.props.dispatch({
          type:'sponsor/delete',
          payload:{deleteKeys:[deleteKey]}
      })
    }
    handleCancel = (e) => {
      this.setState({
          visible: false,
      });
    }
    showEditModal = (record) =>{
      console.log(record);
      this.setState({
          isAdding:false,
          visible: true,
          currentRowData:record
      })
    }
    showAddModal = () =>{
      this.setState({
          isAdding:true,
          visible: true,
      })
    }
    // handleEdit = () => {
    //   const { dispatch,form } = this.props;
    //   const {currentRowData} = this.state;
    //   form.validateFields((err, values) => {
    //     if (err) return;
    //     this.setState({
    //         visible: false,
    //     });
    //     dispatch({
    //         type:'sponsor/edit',
    //         payload:{...currentRowData, ...values}
    //     })
    //   })
    // }

    handleAdd = () => {
        const { dispatch,form } = this.props;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                visible: false,
            });
            console.log(values)
            dispatch({
                type:'sponsor/add',
                payload:values
            })
        })
    }

    render(){
        const columns = [{
            title: '会员号',
            dataIndex: 'key',
            align:'center'
        },{
            title: '名称',
            dataIndex: 'name',
            align:'center'
        }, {
            title: '类型',
            dataIndex: 'type',
            align:'center',
        }, {
            title: '负责人',
            dataIndex: 'owner',
            align:'center',
        },{
            title: '电话',
            dataIndex: 'phone',
            align:'center',
        },{
            title: '地址',
            dataIndex: 'address',
            align:'center',
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align:'center',
            render: (text,record) => {
                console.log(record.key);
                return (
                    <div>
                        <a 
                        href="# " 
                        onClick={()=>this.onCheck(record)}
                        >查看</a>
                        <Divider type="vertical" />
                        <Popconfirm 
                        title="确认删除?" 
                        okText="确认" 
                        cancelText="取消" 
                        onConfirm={() => {this.deleteOne(record.key)}} 
                        >
                        <a href="# ">删除</a>
                        </Popconfirm>     
                    </div>
                )
            },
        }];

        const {sponsor:{list},form:{getFieldDecorator}} = this.props;
        console.log('-------- sponsor_props --------',this.props);
        const {visible,isAdding,currentRowData} = this.state;
        console.log('-------- this.state -------',this.state);
        console.log('------- currentRowData -------',currentRowData)
 

        const getModalContent = () => {
                console.log('-------- isAdding-新建 --------');
                const prefixSelector = getFieldDecorator('prefix', {
                    initialValue: '86',
                  })(
                    <Select style={{ width: 70 }}>
                      <Option value="86">+86</Option>
                      <Option value="87">+87</Option>
                    </Select>
                  );
                return (
                 <Form >
                  <Row gutter={20} >
                   <Col span={12}>
                    <FormItem label="会员号" >
                      {getFieldDecorator('key', {
                          rules: [{ required: true, message: '请输入会员号' }],
                      })(<Input placeholder="会员号"/>)
                      }
                    </FormItem>
                   </Col>
                   <Col span={12}>
                   <FormItem label="主办方名称" >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入主办方名称' }],
                    })(<Input placeholder="主办方名称" />)
                    }
                    </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={20} >
                   <Col span={12}>
                   <FormItem label="主办方类型" >
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: '请输入主办方类型' }],
                    })(
                            <Select placeholder="请选择">
                                <Option value="协会">协会</Option>
                                <Option value="俱乐部">俱乐部</Option>
                            </Select>)
                    }
                    </FormItem>
                   </Col>
                   <Col span={12}>
                   <FormItem label="负责人" >
                    {getFieldDecorator('owner', {
                        rules: [{ required: true, message: '请输入负责人姓名' }],
                    })(<Input placeholder="负责人姓名" />)
                    }
                    </FormItem>
                   </Col>
                  </Row>
                  <Row gutter={20}>
                   <Col span={12}>
                    <Form.Item label="联系电话" >
                      {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入联系电话' }],
                      })(
                        <Input addonBefore={prefixSelector} placeholder="联系电话"/>
                      )}
                    </Form.Item>
                   </Col>
                   <Col span={12}>
                    <Form.Item label="E-mail" >
                      {getFieldDecorator('email', {
                        rules: [
                          { type: 'email', message: '输入的格式不对,请重输' },
                          { required: true, message: '请输入邮箱' }
                        ],
                      })(
                        <Input
                          placeholder="邮箱"
                        />
                      )}
                    </Form.Item>
                   </Col>
                  </Row>
                  <Row gutter={20}>
                   <Col span={12}>
                    <FormItem label="微信号" >
                    {getFieldDecorator('weChat', {
                        rules: [{ required: false, message: '请输入微信号' }],
                    })(<Input placeholder="微信号" />)
                    }
                    </FormItem>
                   </Col>
                   <Col span={12}>
                    <FormItem label="QQ号" >
                    {getFieldDecorator('qq', {
                        rules: [{ required: false, message: '请输入QQ号' }],
                    })(<Input placeholder="QQ号" />)
                    }
                    </FormItem>
                   </Col>
                  </Row>
                  <Row gutter={20}>
                  <Col span={12}>
                    <FormItem label="密码">
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: '请输入密码' }]
                        })(<Input placeholder="密码" />)}
                    </FormItem>
                   </Col>
                   <Col span={12}>
                    <FormItem label="住址">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请输入居住地址' }]
                        })(<Input placeholder="住址" />)}
                    </FormItem>
                   </Col>
                  </Row>
                </Form>
            );
        };

        return (
            <div>
                {/* 搜索框 */}
                <SearchForm handleFormReset={this.fetchData} />
                {/* 新建 & 批量删除 */}
                <div style={{ overflow:'hidden',lineHeight:'50px', height:'50px' }} >
                    <Button type="primary" disabled={! this.state.selectedRows.length > 0} onClick={this.handleDelete} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
                      批量删除
                    </Button>
                    <Button  type="primary" onClick={this.showAddModal} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
                      添加主办方
                    </Button>
                </div>
                {/* 数据表格 */}
                <Table
                    rowSelection={{onChange:this.onChange}}
                    dataSource={list}
                    columns={columns}
                />
                <Modal
                title={'添加主办方'}
                width={800}
                cancelText='取消'
                okText='添加'
                destroyOnClose
                visible={visible}
                onOk={this.handleAdd} 
                onCancel={this.handleCancel}
                >
                    {getModalContent()}
                </Modal>
            </div>

        )
    }
}

// @Form.create()
// @connect(({match})=>({match}))

TableList = Form.create()(TableList);
TableList = connect(({sponsor})=>({sponsor}))(TableList);

export default TableList;
