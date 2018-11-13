import React, { Component } from 'react';
import LoginLayout from './LoginLayout';
import BasicLayout from './BasicLayout';
import router from 'umi/router';
import { connect } from 'dva';

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

    render() {
        const { location: { pathname } } = this.props;
        {
            switch (pathname) {
                case '/User/login':
                    return <LoginLayout {...this.props} />
                default:
                    return <BasicLayout {...this.props} />
            }
        }
    }
} 
