import React, { Component, useState } from 'react';
import { Alert, Checkbox, Modal, Divider } from 'antd';
import { Link } from 'dva/router';
import router from 'umi/router';
import styles from './index.css';
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import Login from 'ant-design-pro/lib/Login';
import logoPic from '../../../assets/BridgeLogo.png';
import { connect } from 'dva';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;


console.log(useState);
class UserBlock extends Component {

    state = {
        notice: '',
        type: 'tab1',
        autoLogin: true,
        modalVisible: false,
        player: true,//true为牌手，false为主办方
        lAccount: '',
        pwd: ''
    }

    handleOk(e) {
        console.log('选择确认-----', e);
        this.props.dispatch({
            type: 'login_m/handleOk'
        });
    }
    handleCancel(e) {
        console.log('选择取消-----', e);
        this.props.dispatch({
            type: 'login_m/handleCancel'
        });
    }

    // login = async (values) => {
    //     const session_id = await odoo.login(values);
    //     const me = await odoo.me({ id: null, partner_id: { id: null, name: null } });
    //     const { partner_id: { id: partner_id }, id } = me.look({ id: null, partner_id: { id: null, name: null } });
    //     if (session_id) {
    //         localStorage.setItem('uid', id);
    //         localStorage.setItem('sid', session_id);
    //         localStorage.setItem('patId', partner_id);
    //         router.push('/');
    //         console.log('---- localStorage ----',localStorage);
    //     }
    // }
    //登录操作
    onSubmit = (err, values) => {
        console.log('value collected ----->', { ...values, autoLogin: this.state.autoLogin });
        const { player, type } = this.state
        if (type === 'tab1') {
            this.setState(
                {
                    notice: '',
                },
                () => {
                    console.log('--- value判断 ----', values, '???', err);
                    if (!err) {
                        // this.login(values);
                        this.setState({
                            lAccount: values.login,
                            pwd: values.password
                        });
                        this.props.dispatch({
                            type: 'login_m/login',
                            payload: { login: values.login, password: values.password }
                        });
                        if (!player){
                            router.push("/sponsor/news")
                        }
                    }
                }
            );
        }
       
    }
    onTabChange = (key) => {
        console.log('------tab', key);
        this.setState({
            type: key,
        });
    }
    changeAutoLogin = (e) => {
        console.log('--------- autoLogin ---------', e);
        this.setState({
            autoLogin: e.target.checked,
        });
        if (this.state.autoLogin === true) {
            localStorage.setItem('lAccount', this.state.lAccount);
            localStorage.setItem('pwd', this.state.pwd);
        } else {
            localStorage.removeItem('lAccount');
            localStorage.removeItem('pwd');
        }
    }
    togglePlayer = (e) => {
        this.setState((state, props) => {
            return { ...state, player: !state.player }
        })
    }
    render() {
        const { player } = this.state
        return (
            <div className={styles.loginBox} >
                <div className={styles.normal}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={logoPic} className={styles.logoPic} alt='logo' />
                    </div>
                    <Login
                        defaultActiveKey={this.state.type}
                        onTabChange={this.onTabChange}
                        onSubmit={this.onSubmit}
                    >
                        <Tab key="tab1" tab="账号登录">
                            {
                                this.state.notice &&
                                <Alert
                                    style={{ marginBottom: 24 }}
                                    message={this.state.notice}
                                    type="error"
                                    showIcon
                                    closable
                                />
                            }
                            <UserName
                                name="login"
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
                        <div>
                            <Checkbox
                                checked={this.state.autoLogin}
                                onChange={this.changeAutoLogin}
                                className={styles.rememberPwd}
                            >
                                保持一直登录
                        </Checkbox>
                            <Link className={styles.forgetPwd} to="/user/forgetPWD">忘记密码</Link>
                        </div>
                        <Submit>{player ? "牌手登录" : "主办方登录"}</Submit>
                        <Link className={styles.registerBtn} to="/user/register">牌手注册 >></Link>
                        <Divider></Divider>
                        <a className={styles.sponsorLogin} onClick={this.togglePlayer}>--- {player ? "主办方登录" : "牌手登录"} ---</a>
                    </Login>
                    {/* 错误弹窗 */}
                    <div>
                        <Modal
                            title="提示"
                            centered
                            visible={this.props.loginForm.modalVisible}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <p>账号或者密码错误，请重新输入...</p>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    };
}


// export default UserBlock;



const mapStateToProps = ({ login_m }) => {

    console.log('----- login_m ------', login_m);
    return { loginForm: login_m }
}


export default connect(mapStateToProps)(UserBlock);