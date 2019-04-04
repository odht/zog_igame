/*
 * @Author: Nxf
 * @Description:
 * @Date: 2019-03-02 16:30:29
 * @LastEditTime: 2019-04-02 09:30:40
 */

import React, { Component }  from "react";
import { Table, Divider, Form, Button, Input, Modal, Select, Row, Col, Popconfirm } from "antd";
import {connect} from 'dva';
import router from 'umi/router';


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
                  type:'player/search',
                  payload:values,
              })
          }
      });
  }
  handleFormReset = ()=>{
    console.log('--------- resetFields ------------');
    //清空输入框
      this.props.form.resetFields();
    //重新拉取数据
      this.props.handleFormReset();
  }
  render(){
      const { getFieldDecorator } = this.props.form;
      const { handleFormReset } = this.props;
      console.log('----- SearchForm handleFormReset -----',handleFormReset);

      return (
          <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="牌手姓名" >
                  {getFieldDecorator('realName', { })( <Input placeholder="牌手姓名"/>)}
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

SearchForm = Form.create()(SearchForm);
SearchForm = connect(({player})=>({player}))(SearchForm);



class PlayersTableBlock extends Component{

    constructor(props){
      super(props)
      this.state={
          selectedRows : [],
          visible:false,
      }
    }

    // 拉取数据
    fetchData=()=>{
       this.props.dispatch({
         type:'player/fetch'
       })
    }
    componentDidMount(){
      this.fetchData();
    }
    //显示弹窗
    showAddModal = () =>{
      this.setState({
          visible: true,
      })
    }
    //关闭弹窗
    handleCancel = (e) => {
        this.setState({
          visible: false,
      });
    }
    //新建player
    handleAdd = () => {
      const { dispatch,form } = this.props;
      form.validateFields((err, values) => {
          if (err) return;
          this.setState({
              visible: false,
          });
          console.log(values)
          dispatch({
              type:'player/add',
              payload:values
          })
      })
    }
    // 查看详情
    onCheck = (record) => {
          console.log('---- record -----',record);
          router.push({
            pathname:'/management/player/playerInfo',
            query:record
          });
    }
    //删除多个player
    handleDelete = () => {
      console.log('-- selectedRows --',this.state.selectedRows);
      const selectedKeys = this.state.selectedRows.map((item)=>(item.key));
      console.log(selectedKeys);
      this.props.dispatch({
          type:'player/delete',
          payload:{deleteKeys:selectedKeys}
      })
    }
    //删除1个player
    handledeleteOne = (deleteKey) => {
      console.log(deleteKey);
      this.props.dispatch({
          type:'player/delete',
          payload:{deleteKeys:[deleteKey]}
      })
    }
    render(){
      const columns = [{
        title:'会员号',
        dataIndex:'key',
        key:'key',
        align:'center'
      },{
        title:'昵称',
        dataIndex:'nickName',
        key:'nickName',
        align:'center'
      },{
        title:'真实姓名',
        dataIndex:'realName',
        key:'realName',
        align:'center'
      },{
        title:'性别',
        dataIndex:'gender',
        key:'gender',
        align:'center'
      },{
        title:'电话',
        dataIndex:'phoneNo',
        key:'phoneNo',
        align:'center'
      },{
        title:'操作',
        dataIndex:'playerManage',
        key:'playerManage',
        align:'center',
        render:(text,record) =>(
          <span>
            <a href= "# " onClick={()=>this.onCheck(record)}>查看</a>
            <Divider type="vertical"></Divider>
            <Popconfirm title="确认删除?" okText="确认" cancelText="取消" onConfirm={() => {this.handledeleteOne(record.key)}} >
                            <a href="# ">删除</a>
                            </Popconfirm>
            {/* <a href= "# " onClick={()=>this.handledeleteOne(record.key)}>删除</a> */}
          </span>
        )
      }];
      const {player:{dataList}, form:{getFieldDecorator}} = this.props;
      const {visible} = this.state;
      console.log(dataList);

      const getModalContent = () => {

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
                      })(<Input placeholder="会员号" />)
                      }
                    </FormItem>
                   </Col>
                   <Col span={12}>
                    <FormItem label="昵称" >
                    {getFieldDecorator('nickName', {
                        rules: [{ required: true, message: '请输入昵称' }],
                    })(<Input placeholder="昵称" />)
                    }
                    </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={20} >
                   <Col span={12}>
                    <FormItem label="真实姓名" >
                    {getFieldDecorator('realName', {
                        rules: [{ required: true, message: '请输入真实姓名' }],
                    })(<Input placeholder="真实姓名" />)
                    }
                    </FormItem>
                   </Col>
                   <Col span={12}>
                    <FormItem label="性别" >
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: '请选择性别' }],
                    })(
                            <Select placeholder="请选择">
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>)
                    }
                    </FormItem>
                   </Col>
                  </Row>
                  <Row gutter={20}>
                   <Col span={12}>
                    <Form.Item label="联系电话" >
                      {getFieldDecorator('phoneNo', {
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
                          // addonBefore="http://"
                          // addonAfter=".com"
                          // style={{width:'80%', marginLeft:'10%'}}
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
      }

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.setState({
            selectedRows
          });
        }
      };
      return(
          <React.Fragment>
            <SearchForm handleFormReset={this.fetchData} />
            {/* 新建 & 批量删除 */}
            <div style={{ overflow:'hidden',lineHeight:'50px', height:'50px' }} >
              <Button type="primary" disabled={! this.state.selectedRows.length > 0} onClick={this.handleDelete} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
                批量删除
              </Button>
              <Button  type="primary" onClick={this.showAddModal} style={{ float:'right',marginRight:'2%',marginTop:'1%' }}>
                添加牌手
              </Button>
            </div>
            <Table
              dataSource={dataList}
              columns={columns}
              rowSelection={rowSelection}
            />

            <Modal
                title='添加牌手'
                width={800}
                cancelText='取消'
                onCancel={this.handleCancel}
                okText='添加'
                onOk={this.handleAdd}
                destroyOnClose
                visible={visible}
                >
                  {getModalContent()}
                </Modal>
          </React.Fragment>
        )
    }
}

PlayersTableBlock = Form.create()(PlayersTableBlock);
PlayersTableBlock = connect(({player})=>({player}))(PlayersTableBlock);

export default PlayersTableBlock;
