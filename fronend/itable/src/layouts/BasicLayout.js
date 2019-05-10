import React from 'react';
import { Layout, Breadcrumb, Divider } from 'antd';
import SideMenu from '@/components/sideMenu';
// import {Breadcrumb }from '@/components/Breadcrumb'
import HeaderUser from './header';
import Link from 'umi/link';
import ErrorBoundary from '@/components/ErrorBoundary';
import styles from './basicLayout.less';
const { Content } = Layout;
class BaseLayout extends React.PureComponent {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    itemRender = (route, params, routes, paths) => {
        console.log(route, routes, paths, params);
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.title}</span> : <Link to={route.path}>{route.title}</Link>;
    }
    render() {
        const { isMobile, location: { pathname }, route: { routes } } = this.props
        console.log(this.props);
        const minHeight = window.screen.availHeight
        //面包屑逻辑：面包屑item的配置，先由路由信息routes生成每个路由和其对应的title组成的对象breadcrumbNameMap。
        //再对当前的url进行解析，逐级分离路由，形成url信息
        //将上述信息对应，即可实现
        const breadcrumbNameMapArray = routes.filter((item) => item.path && item.path != '')
        const breadcrumbNameMap = breadcrumbNameMapArray.reduce((pre, now) => {
            pre[now.path] = now.title;
            return pre
        }, {})
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i && i != 'itable');
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url].split(' ')[0]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const BreadcrumbItem = [].concat(extraBreadcrumbItems);
        return (
            <Layout>
                {/* 侧边栏 */}
                <SideMenu collapsed={this.state.collapsed} toggle={this.toggle} isMobile={isMobile} {...this.props} />
                <Layout>
                    {/* 用户工具栏 */}
                    <HeaderUser collapsed={this.state.collapsed} toggle={this.toggle} {...this.props} />
                    {/* 内容 */}
                    <Breadcrumb
                        style={{ padding: "25px 20px 0 36px" }}
                        separator='>'
                    >
                        {BreadcrumbItem}

                    </Breadcrumb>
                    <Divider
                        style={{ color: "black", height: "1.5px", marginBottom: '0px', marginTop: "15px" }}
                    />
                    <Content
                        className={styles.bordera}
                        style={{ minHeight: minHeight * 0.78, }}>
                        <ErrorBoundary errorMessage={'数据获取失败'}>

                            {this.props.children}
                        </ErrorBoundary>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default BaseLayout