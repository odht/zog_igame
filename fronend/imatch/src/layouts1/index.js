import React, { Component } from 'react';
import BasicLayout from './BasicLayout';
import DetailsLayout from './DetailsLayout';
import { connect } from 'dva';

class Home extends Component {
  componentDidMount() {
    const { location: { pathname }, dispatch } = this.props;
    console.log(pathname)
    dispatch({
      type: "login/login",
      payload: { login: 'admin', password: '123', type: 'account' }
    })
  }
  render() {
    const { location: { pathname } } = this.props;
    const router = '/' + pathname.split('/')[1];
    let CurrentPage = <BasicLayout {...this.props}>{this.props.children}</BasicLayout>
    if (router === '/details') {
      CurrentPage = <DetailsLayout {...this.props}>{this.props.children}</DetailsLayout>
    }
    // if(pathname === '')
    return (
      CurrentPage
    )
  }
}


export default connect(({ login }) => ({ login }))(Home)


// export default function (props) {
//   const { location: { pathname } } = props;
//   const router = '/' + pathname.split('/')[1];
//   if (router === '/details') {
//     return <DetailsLayout {...props}>{props.children}</DetailsLayout>
//   }

//   if (router === '/user') {
//     return <UserLayout {...props}>{props.children}</UserLayout>
//   }

//   return <BasicLayout {...props}>{props.children}</BasicLayout>

// }