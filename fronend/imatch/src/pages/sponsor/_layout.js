import React from 'react';
import { Menu, Layout, Icon } from 'antd';
import Link from 'umi/link';
import HomeLayout from '../../layouts/HomeLayout';
import { connect } from 'dva';
const { Header, Content, Footer, Sider, } = Layout;
export default connect()((props) => {
    return (
        <>
            <Layout>
                <Sider>
                    <Menu
                        // onClick={this.handleClick}
                        style={{ width: 200, height: "80vh" }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <Menu.Item key="1"><Link to="/sponsor/news"><Icon type="schedule" />新闻管理</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/sponsor/match"><Icon type="form" />赛事管理</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/sponsor/help"><Icon type="bulb" />帮助</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/sponsor/leave"><Icon type="message" />留言</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    {/*面包屑 */}
                    {props.children}
                </Content>
            </Layout>
        </>
    )
})