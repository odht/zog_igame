import React, { Component } from 'react';
import BasicLayout from './BasicLayout';
import DetailsLayout from './DetailsLayout';
import UserLayout from './UserLayout';
import HomeLayout from './HomeLayout';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import odoo from '@/odoo-rpc/odoo';
class HomeIndex extends Component {

  state = {
    sid: ''
  }
  componentWillMount() {
    if (!this.state.sid) {
      this.login()
    }
    // if (!this.state.sid) {
    //   dispatch({
    //     type: "login/login",
    //     payload: { login: 'admin', password: '123', type: 'account' }
    //   }).then(() => {
    //     this.setState({
    //       sid: this.props.login.sid,
    //     })
    //   })
    // }
  }
  login = async () => {
    const session_id = await odoo.login({ login: 'admin', password: '123' })
    console.log(session_id);
    this.setState({
      sid: session_id
    })
  }
  render() {
    const { location: { pathname } } = this.props;
    const router = '/' + pathname.split('/')[1];
    const { sid } = this.state;
    if (sid) {
      if (router === '/details') {
        return (
          <LocaleProvider locale={zhCN}>
            <DetailsLayout  {...this.props}>{this.props.children}</DetailsLayout>
          </LocaleProvider>
        )
      }

      if (router === '/user') {
        return <UserLayout {...this.props}>{this.props.children}</UserLayout>
      }
      if (router === '/home' || router === '/game') {
        return (
          <LocaleProvider locale={zhCN}>
            <BasicLayout {...this.props}>{this.props.children}</BasicLayout>
          </LocaleProvider>
        );
      }
      return (
        <HomeLayout {...this.props}>{this.props.children}</HomeLayout>
      )
    } else {
      return <div>正在加载</div>
    }
  }
}
export default HomeIndex