/*
 * @Author: Nxf
 * @Date: 2019-03-15 14:06:42
 * @Last Modified by: Nxf
 * @Last Modified time: 2019-03-18 15:46:16
 */

import React, { Component } from 'react';
import { Button, Card, Modal, Form, Row, Col, Input, Select } from 'antd';
// import router from 'umi/router';
import styles from "./advertiseInfo.less";
import Link from "umi/link";
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;


class InfoView extends Component{

  constructor(props){
    super(props);
    this.state={
      visible:false,
      advertiseInfo:this.props.location.query
    }
  }

  componentDidMount(){
    console.log(this.props.location.query);
  }
  //打开弹窗
  handleShowModel=()=>{
    this.setState({
        visible: true,
    });
  }
  //关闭弹窗
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  //提交编辑
  handleEdit = () => {
    const { dispatch,form } = this.props;
    form.validateFields((err, values) => {
      console.log('----- advertise编辑 -----',values);
      if (err) return;
      this.setState({
          visible: false,
          advertiseInfo:values
      });
      dispatch({
          type:'advertiser/edit',
          payload:values
      })
    })
  }


  render(){

    const { getFieldDecorator } = this.props.form;
    const advertiseInfo = this.state.advertiseInfo;
    const{visible} = this.state;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return(
      <React.Fragment>
        {/* 信息展示 */}
        <Card
          title="赞助商信息"
          bordered={true}
          extra={<Link to='/management/advertise'>返回</Link>}
        >
          <p>
            <span className={styles.list_text}>会员号：</span>
            <span className={styles.p_text}>{advertiseInfo.key}</span>
          </p>
          <p>
            <span className={styles.list_text}>赞助商名称：</span>
            <span className={styles.p_text}>{advertiseInfo.name}</span>
          </p>
          <p>
            <span className={styles.list_text}>负责人：</span>
            <span className={styles.p_text}>{advertiseInfo.owner}</span>
          </p>
          <p>
            <span className={styles.list_text}>手机号：</span>
            <span className={styles.p_text}>{advertiseInfo.phone}</span>
          </p>
          <p>
            <span className={styles.list_text}>邮箱：</span>
            <span className={styles.p_text}>{advertiseInfo.email}</span>
          </p>
          <p>
            <span className={styles.list_text}>QQ：</span>
            <span className={styles.p_text}>{advertiseInfo.qq}</span>
          </p>
          <p>
            <span className={styles.list_text}>微信：</span>
            <span className={styles.p_text}>{advertiseInfo.weChat}</span>
          </p>
          <p>
            <span className={styles.list_text}>密码：</span>
            <span className={styles.p_text}>{advertiseInfo.password}</span>
          </p>
          <p>
            <span className={styles.list_text}>地址：</span>
            <span className={styles.p_text}>{advertiseInfo.address}</span>
          </p>

          <Button
            style={{width:80,marginRight:15}}
            onClick={()=>this.handleShowModel()}
            type="primary"
          >
            编辑
          </Button>
        </Card>
        {/* 编辑弹窗 */}
        <Modal
          title='牌手信息编辑'
          width={800}
          cancelText='取消'
          onCancel={this.handleCancel}
          okText='确认'
          onOk={this.handleEdit}
          destroyOnClose
          visible={visible}
        >
          <Form >
                  <Row gutter={20} >
                   <Col span={12}>
                    <FormItem label="会员号" >
                      {getFieldDecorator('key', {
                        initialValue:advertiseInfo.key,
                        rules: [{ required: true, message: '请输入会员号' }],
                      })(<Input placeholder="会员号" disabled/>)
                      }
                    </FormItem>
                   </Col>
                  </Row>
                  <Row gutter={20} >
                   <Col span={12}>
                    <FormItem label="赞助商名称" >
                      {getFieldDecorator('name', {
                        initialValue:advertiseInfo.name,
                        rules: [{ required: true, message: '请输入赞助商名称' }],
                      })(<Input placeholder="赞助商名称" />)
                    }
                    </FormItem>
                   </Col>
                   <Col span={12}>
                   <FormItem label="负责人" >
                      {getFieldDecorator('owner', {
                        initialValue:advertiseInfo.owner,
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
                        initialValue:advertiseInfo.phone,
                        rules: [{ required: true, message: '请输入联系电话' }],
                      })(
                        <Input addonBefore={prefixSelector} placeholder="联系电话"/>
                      )}
                    </Form.Item>
                   </Col>
                   <Col span={12}>
                    <Form.Item label="E-mail" >
                      {getFieldDecorator('email', {
                        initialValue:advertiseInfo.email,
                        rules: [
                          { type: 'email', message: '输入的格式不对,请重输' },
                          { required: true, message: '请输入邮箱' }
                        ],
                      })(
                        <Input placeholder="邮箱"/>
                      )}
                    </Form.Item>
                   </Col>
                  </Row>
                  <Row gutter={20}>
                   <Col span={12}>
                    <FormItem label="微信号" >
                      {getFieldDecorator('weChat', {
                        initialValue:advertiseInfo.weChat,
                        rules: [{ required: false, message: '请输入微信号' }],
                      })(<Input placeholder="微信号" />)
                    }
                    </FormItem>
                   </Col>
                   <Col span={12}>
                    <FormItem label="QQ号" >
                      {getFieldDecorator('qq', {
                        initialValue:advertiseInfo.qq,
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
                          initialValue:advertiseInfo.password,
                          rules: [{ required: true, message: '请输入密码' }]
                        })(<Input placeholder="密码" />)}
                    </FormItem>
                   </Col>
                   <Col span={12}>
                    <FormItem label="住址">
                        {getFieldDecorator('address', {
                          initialValue:advertiseInfo.address,
                          rules: [{ required: true, message: '请输入居住地址' }]
                        })(<Input placeholder="住址" />)}
                    </FormItem>
                   </Col>
                  </Row>
                </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

InfoView = Form.create('信息编辑表单')(InfoView);
InfoView = connect(({advertise})=>({advertise}))(InfoView);
export default InfoView;
