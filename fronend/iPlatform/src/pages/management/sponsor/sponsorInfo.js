/*
 * @Author: Nxf
 * @Date: 2019-03-15 14:06:42
 * @Last Modified by: Nxf
 * @Last Modified time: 2019-03-18 15:46:16
 */

import React, { Component } from 'react';
import { Button, Card, Modal, Form, Row, Col, Input, Select } from 'antd';
// import router from 'umi/router';
import styles from "./sponsorInfo.less";
import Link from "umi/link";
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;


class InfoView extends Component{

  constructor(props){
    super(props);
    this.state={
      visible:false,
      sponsorInfo:this.props.location.query
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
      console.log('----- sponsor编辑 -----',values);
      if (err) return;
      this.setState({
          visible: false,
          sponsorInfo:values
      });
      dispatch({
          type:'sponsor/edit',
          payload:values
      })
    })
  }


  render(){

    const { getFieldDecorator } = this.props.form;
    const sponsorInfo = this.state.sponsorInfo;
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
          title="主办方信息"
          bordered={true}
          extra={<Link to='/management/sponsor'>返回</Link>}
        >
          <p>
            <span className={styles.list_text}>会员号：</span>
            <span className={styles.p_text}>{sponsorInfo.key}</span>
          </p>
          <p>
            <span className={styles.list_text}>主办方名称：</span>
            <span className={styles.p_text}>{sponsorInfo.name}</span>
          </p>
          <p>
            <span className={styles.list_text}>主办方类型：</span>
            <span className={styles.p_text}>{sponsorInfo.type}</span>
          </p>
          <p>
            <span className={styles.list_text}>负责人：</span>
            <span className={styles.p_text}>{sponsorInfo.owner}</span>
          </p>
          <p>
            <span className={styles.list_text}>手机号：</span>
            <span className={styles.p_text}>{sponsorInfo.phone}</span>
          </p>
          <p>
            <span className={styles.list_text}>邮箱：</span>
            <span className={styles.p_text}>{sponsorInfo.email}</span>
          </p>
          <p>
            <span className={styles.list_text}>QQ：</span>
            <span className={styles.p_text}>{sponsorInfo.qq}</span>
          </p>
          <p>
            <span className={styles.list_text}>微信：</span>
            <span className={styles.p_text}>{sponsorInfo.weChat}</span>
          </p>
          <p>
            <span className={styles.list_text}>密码：</span>
            <span className={styles.p_text}>{sponsorInfo.password}</span>
          </p>
          <p>
            <span className={styles.list_text}>地址：</span>
            <span className={styles.p_text}>{sponsorInfo.address}</span>
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
                        initialValue:sponsorInfo.key,
                        rules: [{ required: true, message: '请输入会员号' }],
                      })(<Input placeholder="会员号" disabled/>)
                      }
                    </FormItem>
                   </Col>
                   <Col span={12}>
                   <FormItem label="主办方名称" >
                      {getFieldDecorator('name', {
                        initialValue:sponsorInfo.name,
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
                        initialValue:sponsorInfo.type,
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
                        initialValue:sponsorInfo.owner,
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
                        initialValue:sponsorInfo.phone,
                        rules: [{ required: true, message: '请输入联系电话' }],
                      })(
                        <Input addonBefore={prefixSelector} placeholder="联系电话"/>
                      )}
                    </Form.Item>
                   </Col>
                   <Col span={12}>
                    <Form.Item label="E-mail" >
                      {getFieldDecorator('email', {
                        initialValue:sponsorInfo.email,
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
                        initialValue:sponsorInfo.weChat,
                        rules: [{ required: false, message: '请输入微信号' }],
                      })(<Input placeholder="微信号" />)
                    }
                    </FormItem>
                   </Col>
                   <Col span={12}>
                    <FormItem label="QQ号" >
                      {getFieldDecorator('qq', {
                        initialValue:sponsorInfo.qq,
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
                          initialValue:sponsorInfo.password,
                          rules: [{ required: true, message: '请输入密码' }]
                        })(<Input placeholder="密码" />)}
                    </FormItem>
                   </Col>
                   <Col span={12}>
                    <FormItem label="住址">
                        {getFieldDecorator('address', {
                          initialValue:sponsorInfo.address,
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
InfoView = connect(({sponsor})=>({sponsor}))(InfoView);
export default InfoView;
