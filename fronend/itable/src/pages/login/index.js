/**
 * title: 登陆 - 智赛桥牌
 */
import React, { Component } from 'react';
import { Alert, message } from 'antd';
import { Link } from 'dva/router';
import styles from './index.css';
import Login from '@/components/Login';
import { connect } from 'dva';

import odoo from '../../odoo';
import router from 'umi/router';
// import logoPic from '../../../assets/BridgeLogo.png';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
class UserBlock extends Component {

    state = {
        type: 'tab1',
    }
    componentWillMount() {
        const { sid }= this.props.login;
        if (sid) {
            router.push('/home')
        }
    }
    //登录操作
    onSubmit = async (err, values) => {
        if (err) {
            return
        }
        const cls = odoo.env('res.user')
        const { dispatch } = this.props
        const { account, password } = values;
        const sid = await odoo.login({ login: account, password: password ,role:"player"});
        if (sid) {
            console.log(sid);
            dispatch({
                type: 'login/loginSid',
                payload: {
                    sid: sid
                }
            })
            localStorage.setItem('userName', account);
            localStorage.setItem('pwd', password)
        } else {
            message.warning('账户名或密码输入错误', 1.2)
        }
    }
    onTabChange = (key) => {
        this.setState({
            type: key,
        });
    }
    render() {
        return (
            <div className={styles.loginBox} >
                <div className={styles.normal}>
                    <div style={{ textAlign: 'center' }}>
                        {/* <img src={logoPic} className={styles.logoPic}/> */}
                    </div>
                    <Login
                        defaultActiveKey={this.state.type}
                        onTabChange={this.onTabChange}
                        onSubmit={this.onSubmit}
                        enter={true}
                    >
                        <Tab key="tab1" tab="账号登录">
                            <UserName
                                name="account"
                                placeholder="账号"
                                rules={[{ required: true, message: '用户名不能为空!' }]}
                            />
                            <Password
                                name="password"
                                placeholder="密码"
                                rules={[{ required: true, message: '密码不能为空!' }]}
                            />
                        </Tab>
                        <Tab key="tab2" tab="验证码登录">
                            <Mobile
                                name="mobile"
                                placeholder="手机号"
                                rules={[{ required: true, message: '手机号不能为空!' }]}
                            />
                            <Captcha
                                onGetCaptcha={() => console.log('获取验证码......')}
                                name="captcha"
                                placeholder="验证码"
                                rules={[{ required: true, message: '验证码不能为空!' }]}
                            />
                        </Tab>
                        <div className={styles.forget}>
                            <a target="_blank" rel="noopener norefferrer" href='/imatch/user/register' >牌手注册</a>
                            <Link to="/user/forgetPWD">忘记密码</Link>
                        </div>
                        <Submit>登录</Submit>
                        {/* <Link className={styles.sponsorLogin} to="/user/loginSponsor">--- 主办方登录 ---</Link> */}
                    </Login>
                </div>
            </div>
        );
    };
}

// export default UserBlock;
const mapStateToProps = ({ login }) => {
    return { login: login }
}


export default connect(mapStateToProps)(UserBlock);