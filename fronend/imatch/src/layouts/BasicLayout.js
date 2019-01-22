//首页 
//lsy
//2018-9-4

import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import GlobalHeader from '../component/GlobalHeader';
import BasicFooter from '../component/BasicFooter'
import GlobalSider from '../component/GlobalSider';
import router from 'umi/router';
import * as routes from '../common/routes';
import styles from './BasicLayout.css'
const { Header, Content, Sider } = Layout;
const { headerRoutes } = routes;

//面包屑

class BasicLayout extends Component {
  logout = () => {
    this.props.dispatch({ type: 'user/logout' });
    localStorage.setItem('sid', null);
    localStorage.setItem('patId', null);
    router.push('/user/login');
  }
  render() {

    // 识别
    const { history: { location: { pathname } } } = this.props;
    const headerRouter = '/' + pathname.split('/')[1];
    const siderData = () => {
      for (let route of headerRoutes) if (route.path === headerRouter) {
        return route;
      }
    }
    const siderRoute = siderData();
    return (
      <div >
        <Content style={{ margin: '0 auto' }}>
          <Layout style={{ background: '#fff' }}>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div className={styles.logo}>
              </div>
              <GlobalHeader
                headerRoutes={headerRoutes}
                pathname={headerRouter}
              />
            </Header>
            {siderRoute && siderRoute.child.length > 0 ?
              <Sider style={{ background: '#fff', minHeight: "71vh" }} >
                <GlobalSider
                  siderRoute={siderRoute}
                />
              </Sider>
              : ''
            }
            <Content style={{ minHeight: 280, padding: 50 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <footer className={styles.footer}>
          <BasicFooter />
        </footer>
      </div>
    )
  }
}


export default connect(({ user }) => ({ user }))(BasicLayout);
