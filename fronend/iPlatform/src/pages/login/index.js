import React, { Component } from 'react';
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox,Modal } from 'antd';
import {connect} from 'dva';
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import styles from './index.css';



const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginComp extends Component {
  state = {
    type: 'tab1',
    autoLogin: true,
    visible:false
  }

  // 账号密码错误弹窗
  showModal(){
    console.log('显示弹窗。。。。。。');
    this.props.dispatch({
      type:'login_m/showModal'
    });
  }

   handleOk(e){
    console.log('选择确认-----',e);
    this.props.dispatch({
      type:'login_m/handleOk'
    });
  }

   handleCancel(e){
    console.log('选择取消-----',e);
    this.props.dispatch({
      type:'login_m/handleCancel'
    });
  }
  //登录操作
  onSubmit = (err, values) => {
    console.log('value collected ------->', { ...values, autoLogin: this.state.autoLogin });
    if (this.state.type === 'tab1') {
  
      console.log('--- value判断 ----',values,'???',err);
      if (!err) {
        console.log('Received values of form: ', values);
          this.props.dispatch({
            type:'login_m/login',
            payload:{name:values.username, pwd:values.password}
          });
        }
    }
  }
  onTabChange = (key) => {
    console.log('------tab',key);
    this.setState({
      type: key,
    });
  }
  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }
  render() {
    console.log('------------ loginForm -----------',this.props.loginForm);
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>智赛棋牌平台管理系统</h1>
        <Login
          defaultActiveKey={this.state.type}
          onTabChange={this.onTabChange}
          onSubmit={this.onSubmit}
          className={styles.loginBox}
        >
          {/* <Tab key="tab1" tab="账号登录"> */}
            {
              this.state.notice &&
              <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
            }
            <UserName
              name="username"
              placeholder="管理员账号"
              rules={[{required: true, message: '管理员账号不能为空!'}]}
            />
            <Password
              name="password"
              placeholder="密码"
              rules = {[{required: true, message: '密码不能为空!'}]}
            />
          {/* </Tab> */}
          {/* <Tab key="tab2" tab="验证码登录">
            <Mobile
              name="mobile"
              placeholder="手机号"
              rules = {[{required: true, message: '手机号不能为空!'}]}
              />
            <Captcha
              onGetCaptcha={() => console.log('获取验证码......')}
              name="captcha"
              placeholder="验证码"
              rules = {[{required: true, message: '验证码不能为空!'}]}
            />
          </Tab> */}
          <div>
            <Checkbox
              checked={this.state.autoLogin}
              onChange={this.changeAutoLogin}
              style={{ float: 'left' }}
            >保持一直登录</Checkbox>
            <a style={{ float: 'right' }} href="# ">忘记密码</a>
          </div>
          <Submit>登录</Submit>
        </Login>
    {/* 错误弹窗 */}
        <div>
              <Modal
                title="提示"
                centered
                visible={this.props.loginForm.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                okText="确定"
                cancelText="取消"
              >
                <p>账号或者密码错误，请重新输入...</p>
              </Modal>
        </div>
      </div>
    );
  }
}


// export default LoginComp;

const mapStateToProps =({login_m}) =>{

  console.log('----- login_m ------',login_m)
  return{loginForm:login_m}
}
export default connect(mapStateToProps)(LoginComp);
