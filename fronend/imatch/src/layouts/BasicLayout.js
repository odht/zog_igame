//首页 
//lsy
//2018-9-4

import React, { Component } from 'react';
import { Layout,Row,Col, Button ,Dropdown,Menu} from 'antd';
import { connect } from 'dva';
import GlobalHeader from '../component/GlobalHeader';
import BasicFooter from '../component/BasicFooter'
import GlobalSider from '../component/GlobalSider';
import router from 'umi/router';
import logo from '../assets/57130611.jpg';
import * as routes from '../common/routes';
import styles from './BasicLayout.css'
import { Link } from 'dva/router';
const { Header, Content, Footer, Sider } = Layout;
const { headerRoutes } = routes;

//面包屑

class BasicLayout extends Component {
  // componentDidMount() {
  //   const { history: { location: { pathname } } } = this.props;
  //   if (pathname === '/') {
  //     router.push('/home');
  //   }
  // }
  logout = ()=> {console.log(123)
    this.props.dispatch({type:'user/logout'})
    router.push('/user/login')
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
    const loginButton =<div><Link to='/user/login'><Button type='normal'>立即登录</Button></Link><Link to='/user/register'><Button type='primary'>免费注册</Button></Link></div> 
    const {currentUser} = 10;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to='user/center'>用户中心</Link>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.logout}>退出登录</div>
        </Menu.Item>
      </Menu>
    );
    const userCenter = (<Dropdown overlay={menu} placement="bottomCenter">
                          <Button>{currentUser}</Button>
                        </Dropdown>);
    
    return (
      <div >
        <div className='g-header'>
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>
            <Row type='flex' align='middle'>
              <Col span={4}>
                <img style={{width:'200px'}} src={logo} />
              </Col>
              <Col offset={1} span={12}>
                <GlobalHeader
                  headerRoutes={headerRoutes}
                  pathname={headerRouter}
                />
              </Col>
              <Col span={3}></Col>
              <Col span={4}>
            { currentUser ? userCenter: loginButton} 
              </Col>
            </Row>
          </div> 
        </div>
        
        <Content style={{maxWidth:'1200px',margin:'0 auto'}}>
          <Layout style={{ background: '#fff' }}>
            {siderRoute && siderRoute.child.length>0 ?
              <Sider style={{ background: '#fff', minHeight: "71vh" }} >
                <GlobalSider
                  siderRoute={siderRoute}
                />
              </Sider>
              : ''
            }
            <Content style={{ minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <footer className={styles.footer}>
        <BasicFooter/>
        </footer>
      </div>
    )
  }
}


export default connect(({user})=>({user}))(BasicLayout);
