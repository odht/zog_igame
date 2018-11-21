//首页 
//lsy
//2018-9-4

import React, { Component } from 'react';
import { Layout, Carousel } from 'antd';
import { connect } from 'dva';
import GlobalHeader from '../component/GlobalHeader';
import GlobalSider from '../component/GlobalSider';
import router from 'umi/router';
import * as routes from '../common/routes';
import styles from './HomLayout.css'
const { Header, Content, Sider } = Layout;
const { homeRoutes } = routes;
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';
//面包屑

class BasicLayout extends Component {
    logout = () => {
        this.props.dispatch({ type: 'user/logout' })
        router.push('/user/login')
    }
    render() {

        // 识别
        const { history: { location: { pathname } } } = this.props;
        const headerRouter = '/' + pathname.split('/')[1];
        const siderData = () => {
            for (let route of homeRoutes) if (route.path === pathname) {
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
                                headerRoutes={homeRoutes}
                                pathname={pathname}
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
                        <Content style={{ minHeight: 280 }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Content>
                <footer className={styles.footer}>
                    <div className={styles.copyright}>
                        <div>北京欧德慧通信息技术有限公司版权所有</div>
                    </div>
                </footer>
            </div>
        )
    }
}


export default connect(({ user }) => ({ user }))(BasicLayout);
