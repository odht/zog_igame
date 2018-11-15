import React, { Component } from 'react';
import BasicLayout from './BasicLayout';
import DetailsLayout from './DetailsLayout';
import UserLayout from './UserLayout';
import { connect } from 'dva';

class HomeIndex extends Component {

  state = {
    sid: ''
  }
  componentWillMount() {
    const { dispatch } = this.props;

    if (!this.state.sid) {
      dispatch({
        type: "login/login",
        payload: { login: 'admin', password: '123', type: 'account' }
      }).then(() => {
        this.setState({
          sid: this.props.login.sid,
        })
      })
    }
  }
  render() {
    const { location: { pathname } } = this.props;
    const router = '/' + pathname.split('/')[1];
    const { sid } = this.state;

    if (sid) {
      if (router === '/details') {
        return <DetailsLayout  {...this.props}>{this.props.children}</DetailsLayout>
      }

      if (router === '/user') {
        return <UserLayout {...this.props}>{this.props.children}</UserLayout>
      }

      return <BasicLayout {...this.props}>{this.props.children}</BasicLayout>
    } else {
      return <div>正在加载</div>
    }
  }
}
export default connect(({ login }) => ({ login }))(HomeIndex)