import styles from './index.css';
import React from 'react';
import HomeLayout from './HomeLayout.js';
import NoneLayout from './NoneLayout.js';
import DetailsLayout from './DetailsLayout.js';

function Layout(props) {
    console.log('---------rootProps',props);
    const { location:{ pathname } } = props;

    if (pathname.indexOf('/user') >-1) {
      return(
        <NoneLayout { ...props }> {props.children} </NoneLayout>
      )
    } else if(pathname === '/homepage' ||pathname === '/news'||pathname === '/games'||pathname === '/teaching') {
      return(
        <HomeLayout { ...props }> {props.children} </HomeLayout> 
      );
    } else if (pathname.indexOf('/details') >-1) {
      return(
        <DetailsLayout { ...props }> {props.children} </DetailsLayout>
      )
    }{
      return(
        <HomeLayout { ...props }> {props.children} </HomeLayout>
      );
    }
}


export default Layout;

// import React, { Component } from 'react';
// import HomeLayout from './HomeLayout';
// import DetailsLayout from './DetailsLayout';
// import UserLayout from './UserLayout';
// import HomeLayout from './HomeLayout';
// import { connect } from 'dva';
// import { LocaleProvider } from 'antd';
// import zhCN from 'antd/lib/locale-provider/zh_CN';
// import odoo from '@/odoo-rpc/odoo';
// class HomeIndex extends Component {

//   state = {
//     sid: ''
//   }
//   componentWillMount() {
//     if (!this.state.sid) {
//       this.login()
//     }
//     // if (!this.state.sid) {
//     //   dispatch({
//     //     type: "login/login",
//     //     payload: { login: 'admin', password: '123', type: 'account' }
//     //   }).then(() => {
//     //     this.setState({
//     //       sid: this.props.login.sid,
//     //     })
//     //   })
//     // }
//   }
//   login = async () => {
//     const session_id = await odoo.login({ login: 'admin', password: '123' });
//     this.setState({
//       sid: session_id
//     })
//   }
//   render() {
//     const { location: { pathname } } = this.props;
//     const router = '/' + pathname.split('/')[1];
//     const sid = localStorage.getItem('sid') || this.state.sid;
//     if (sid) {
//       if (router === '/details') {
//         return (
//           <LocaleProvider locale={zhCN}>
//             <DetailsLayout  {...this.props}>{this.props.children}</DetailsLayout>
//           </LocaleProvider>
//         )
//       }

//       if (router === '/user') {
//         return <UserLayout {...this.props}>{this.props.children}</UserLayout>
//       }
//       // if (router === '/home' || router === '/game') {
//       //   return (
//       //     <LocaleProvider locale={zhCN}>
//       //       <HomeLayout {...this.props}>{this.props.children}</HomeLayout>
//       //     </LocaleProvider>
//       //   );
//       // }
//       return (
//         <HomeLayout {...this.props}>{this.props.children}</HomeLayout>
//       )
//     } else {
//       return <div>正在加载</div>
//     }
//   }
// }
// export default HomeIndex