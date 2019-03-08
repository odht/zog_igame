import React from 'react';
import { Menu, Layout, Icon, Breadcrumb } from 'antd';
import Link from 'umi/link';
import HomeLayout from '../../layouts/HomeLayout';
import { connect } from 'dva';
import { makeBreadcrumb } from '@/utils/tools'
const { Header, Content, Footer, Sider, } = Layout;
export default connect()((props) => {
    const { route: { routes }, location: { pathname } } = props
    console.log(props);
    const menu = (route) => {
        return route.map((item) => {
            if (item.path && !item.isNotMenu) {
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
    const menuPathname = routes.filter((item) => item.path && !item.isNotMenu).find((item) => pathname.indexOf(item.path) > -1).path
    return (
        <>
            <Layout>
                <Sider>
                    <Menu
                        style={{ width: 200, height: "80vh" }}
                        selectedKeys={[menuPathname]}
                        mode="inline"
                    >
                        {menu(routes)}
                    </Menu>
                </Sider>
                <Content >
                    {/*面包屑 */}
                    <Breadcrumb
                        style={{
                            backgroundColor: "white",
                            padding: '6px 20px'
                        }}
                    >
                        {makeBreadcrumb(routes, pathname)}
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 20
                        }}
                    >
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </>
    )
})