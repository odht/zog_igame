import React from 'react';
import { Menu, Layout, Icon, Breadcrumb } from 'antd';
import Link from 'umi/link';
import HomeLayout from '../../layouts/HomeLayout';
import { connect } from 'dva';
import { makeBreadcrumb, createMenu } from '@/utils/tools'
const { Header, Content, Footer, Sider, } = Layout;
export default connect()((props) => {
    const { route: { routes }, location: { pathname } } = props
    const menu = createMenu(routes)
    const menuPathname = routes.filter((item) => item.path && !item.isNotMenu).find((item) => pathname.indexOf(item.path) > -1)
    return (
        <>
            <Layout>
                <Sider>
                    <Menu
                        style={{ width: 200, height: "80vh" }}
                        selectedKeys={[menuPathname && menuPathname.path]}
                        mode="inline"
                    >
                        {menu}
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