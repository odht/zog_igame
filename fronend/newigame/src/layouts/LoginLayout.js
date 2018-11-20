import React, { Fragment, Component } from 'react';
import { Login } from 'ant-design-pro';
import { Alert, Checkbox, Icon } from 'antd';
import styles from './LoginLayout.css';
import { connect } from 'dva';
import router from 'umi/router';
import GlobalFooter from '../component/GlobalFooter';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
    </Fragment>
);
class LoginLayout extends Component {
    state = {
        notice: '',
        type: 'account',
        autoLogin: true,
    }
    onSubmit = (err, values) => {
        const { type } = this.state;
        const loginUser = { ...values, type }
        const { dispatch } = this.props;
        dispatch({
            type: 'login/login',
            payload: loginUser
        }).then(() => {
            const { login: { sid, uid } } = this.props;
            localStorage.setItem('tonken', sid);
            localStorage.setItem('uid', uid)
            if (this.props.login.status !== 'ok') {
                this.setState({
                    notice: '',
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            notice: 'The combination of username and password is incorrect!',
                        });
                    }, 500);
                });
            } else {
                router.push('/');
            }
        })
    }
    onTabChange = (key) => {
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
        return (
            <div className={styles.loginbox}>
                <div className={styles.titleBox}><span className={styles.title}>智赛棋牌</span></div>
                <Login
                    className={styles.login}
                    defaultActiveKey={this.state.type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.onSubmit}
                >
                    <Tab key="account" tab="账户密码登录">
                        {
                            this.state.notice &&
                            <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
                        }
                        <UserName name="login" placeholder="用户名" />
                        <Password name="password" placeholder="密码" />
                    </Tab>
                    <Tab key="tab2" tab="手机登录">
                        <Mobile name="mobile" placeholder="手机号" />
                        <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="captcha" placeholder="验证码" />
                    </Tab>
                    <div>
                        <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>记住密码</Checkbox>
                        <a style={{ float: 'right' }} href="">忘记密码</a>
                    </div>
                    <Submit className={styles.loginbutton}>登录</Submit>
                </Login>
                <div className={styles.footer}>
                    <GlobalFooter copyright={copyright} />
                </div>

            </div>

        );
    }
}

export default connect(({ login }) => ({ login }))(LoginLayout);