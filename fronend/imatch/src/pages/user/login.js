import React, { Component } from "react";
import { Card, Tabs, Alert, Form, Input, Button, message } from 'antd';
import { connect } from 'dva'
import router from 'umi/router';
import styles from './login.less';
import { Link } from "dva/router";
const FormItem = Form.Item;
const headStyle = {
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd',
  fontSize: '16px',
  color: 'rgba(0, 0, 0, 0.85)',
  height: "20px"
}

@connect(({ login, odooData, contact, resUsers }) => ({ login, odooData, contact, resUsers }))
class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        mobile: ['mobile', 'captcha'],
        accout: ['userName', 'password'],
      },
      activeKey: "mobile",
      warn: false
    }
  }
  handleSubmit = (e) => {

    e.preventDefault();
    const activeKey = this.state.activeKey;
    const fieldNames = this.state.active[activeKey];
    this.props.form.validateFields(fieldNames, (err, values) => {
      if (!err) {
        let { userName, password } = values;
        this.props.dispatch({
          type: 'login/login',
          payload: { login: userName, password, type: 'account' }
        }).then(()=>{
          this.setState({
            warn: true
          })
          router.push('/home')
        })
     
        // setTimeout(() => {

        //   router.push('/')
        // }, 2000)
      }
    });
  }
  change = (activeKey) => {
    this.setState({
      activeKey
    })
  }
  render() {
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.login}>
        <Tabs
          onChange={this.change}
          animated={false}
        >
          <Tabs.TabPane tab="手机号登录" key="mobile">
            <FormItem>
              <label className={styles.username} >手机号</label>
              {getFieldDecorator('mobile', {
                rules: [{ required: true, message: '请输入11位手机号!' }],
              })(
                <Input placeholder="11位手机号" />
              )}
            </FormItem>
            <FormItem>
              <div><span className={styles.password}>密码</span><span style={{ float: 'right' }}><Link to='/user/forget'>忘记密码</Link></span></div>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码!' }],
              })(
                <Input type="captcha" placeholder="请输入验证码" />
              )}
            </FormItem>
          </Tabs.TabPane>
          <Tabs.TabPane tab="用户名登录" key="accout">
            {this.state.warn ? <Alert message="账户或密码错误（admin/123456）" type="error" showIcon /> : ''}
            <FormItem>
              <label className={styles.username} >用户名</label>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input placeholder="admin" />
              )}
            </FormItem>
            <FormItem>
              <div><span className={styles.password}>密码</span><span style={{ float: 'right' }}><Link to='/user/forget'>忘记密码</Link></span></div>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input type="password" placeholder="123456" />
              )}
            </FormItem>
          </Tabs.TabPane>
        </Tabs>


        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.loginButton}>
            登录
            </Button>
          <Link to='/user/register'>注册新账号</Link>
        </FormItem>
      </Form>
    );
  }
}

let WrappedNormalLoginForm = Form.create()(NormalLoginForm);
WrappedNormalLoginForm = connect(({ user }) => ({ user }))(WrappedNormalLoginForm);
export default class Login extends Component {
  render() {
    return (

      <div style={{ margin: '0 auto', width: '500px' }}>
        <div className={styles.title}>登录</div>
        <Card bordered={true} style={{ width: '100%' }}
          headStyle={headStyle}
          bodyStyle={{ border: '1px solid #ddd' }}
        >
          <WrappedNormalLoginForm />
        </Card>
      </div>
    )
  }
}
