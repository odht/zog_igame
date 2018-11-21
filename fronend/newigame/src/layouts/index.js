import React, { Component } from 'react';
import LoginLayout from './LoginLayout';
import BasicLayout from './BasicLayout';
import router from 'umi/router';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

@connect(({ login }) => ({ login }))
export default class IndexLayout extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        const tonken = localStorage.getItem('tonken');
        const uid = localStorage.getItem('uid');
        if (!tonken) {
            router.push('/User/login');
        } else {
            dispatch({
                type: "login/save",
                payload: { sid: tonken, uid: uid }
            })
        }
    }
    handlerloginOut() {
        localStorage.removeItem('tonken');
        localStorage.removeItem('uid');
        router.push('/User/login');

    }
    render() {
        const { location: { pathname } } = this.props;
        {
            switch (pathname) {
                case '/User/login':
                    return <LoginLayout {...this.props} />
                default:
                    return (
                        <LocaleProvider locale={zhCN}>
                            <BasicLayout {...this.props} handlerloginOut={this.handlerloginOut} />
                        </LocaleProvider>

                    )
            }
        }
    }
} 
