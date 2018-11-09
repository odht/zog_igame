import React, { Component } from 'react';
import LoginLayout from './LoginLayout';
import BasicLayout from './BasicLayout';
import router from 'umi/router';
import { connect } from 'dva';

@connect(({ login }) => ({ login }))
export default class IndexLayout extends Component {
    componentDidMount() {
        const { location: { pathname }, dispatch } = this.props;
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
        const currentPath = pathname.split('/')[1];
        switch (currentPath) {
            case 'User':
                { router.push('/User/login'); }
                return null;
            case 'home' || '/':
                { router.push('/home'); }
            default:
                { router.push('/home'); }
                return null;
        }
    }

    render() {
        const { location: { pathname } } = this.props;
        {
            switch (pathname) {
                case '/User/login':
                    return <LoginLayout {...this.props} />
                case '/home':
                    return <BasicLayout {...this.props} />
                default:
                    return null;
            }
        }
    }
} 
