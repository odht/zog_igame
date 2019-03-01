import React from 'react';
import { Menu, Layout, Icon, Breadcrumb } from 'antd';
import Link from 'umi/link';
import HomeLayout from '../../layouts/HomeLayout';
import { connect } from 'dva';
import { makeBreadcrumb } from '@/utils/tools'
const { Header, Content, Footer, Sider, } = Layout;
export default connect()((props) => {
    const { route: { routes }, location: { pathname } } = props
    const menu = () => {
        return routes.map((item) => {
            if (item.path && item.path !== '/sponsor') {
                return (
                    <Menu.Item
                        key={item.path}
                    >
                        <Link to={item.path}>
                            <Icon type={item.icon} />
                            {item.title.split(' ')[0]}
                        </Link>
                    </Menu.Item>
                )
            } else {
                return undefined
            }
        }).reverse()
    }
    return (
        <>
            <Layout>
                <Sider>
                    <Menu
                        style={{ width: 200, height: "80vh" }}
                        selectedKeys={[pathname]}
                        mode="inline"
                    >
                        {menu()}
                    </Menu>
                </Sider>
                <Content>
                    {/*面包屑 */}
                    <Breadcrumb
                        style={{
                            backgroundColor: "white",
                            padding: '6px 20px'
                        }}
                    >
                        {makeBreadcrumb(routes, pathname)}
                    </Breadcrumb>
                    {props.children}
                </Content>
            </Layout>
        </>
    )
})