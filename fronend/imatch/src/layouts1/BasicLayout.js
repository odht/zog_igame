import { Layout, Menu, Breadcrumb, Button } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
const { Header, Content, Footer } = Layout;

function BasicLayout(props) {
    const {location:{pathname}} =props;
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[pathname]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="/home"><Link to="/home">home</Link></Menu.Item>
                   <Menu.Item key="/game"> <Link to="/game">game</Link></Menu.Item>
                    <Menu.Item key="/match"><Link to="/match">match</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
    </Footer>
        </Layout>
    );
}

export default connect(({ login }) => ({ login }))(BasicLayout);
