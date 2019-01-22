//基本布局

import React, { Component } from 'react';
import { Layout, Row, Col, Menu, Dropdown, Button, Drawer, Icon } from 'antd';
import GlobalNavi from '../component/GlobalNavi';
import styles from './HomeLayout.css'
import logoPic from '../assets/zhiSaiLogo.png';
import logIn from '../assets/logIn.png';
import logOut from '../assets/logOut.png';
import * as routes from '../common/navigationRoutes';
import { Link } from 'dva/router';
import { connect } from 'dva';

import Message from './Message';


const { Header, Footer, Content } = Layout;
const { naviRoutes } = routes;
var timer;

class SubmitInfo extends React.Component {
    state = { visible: false };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
        this.props.onBack()
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type='message' /> 在线留言
                </Button>

                <Drawer width={'350px'}
                    title="在线留言"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >

                    <Message onClose={this.onClose} />
                </Drawer>
            </div>
        );
    }
}

class HomeLayout extends Component {

    constructor(props) {
        super(props); 
        console.log(props);
        this.state = {
            // avatar: this.props.loginForm.avatar,
            inOutState: this.props.loginForm.inOutState,
            numTool: 0,
            numMess: -100,
            hide: 'false',
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.display_name = this.display_name.bind(this);
    }
    handleLogout() {
        this.props.dispatch({
            type: 'login_m/logout',
            payload: { inOutState: false }
        });
    }
    componentWillMount(props) {
        console.log('----------props-layout', this.props);
    }
    display_name() {

        if (this.state.hide === 'false') {
            this.setState({
                numTool: 70,
                numMess: 0
            })
            this.setState({ hide: 'true' })

        }
        else if (this.state.hide === 'true') {
            this.setState({
                numTool: 0,
                numMess: -100
            })
            this.setState({ hide: 'false' })
        }
    }
    render() {
        const { history: { location: { pathname } } } = this.props;
        const headerRouter = '/' + pathname.split('/')[1];
        // alert(this.state.inOutState === true);
        // 用户图标
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="user/userInfo" style={{ color: '#888888' }}>个人信息</Link>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http:" style={{ color: '#888888' }}>消息</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <Button style={{ color: '#444444' }} onClick={this.handleLogout}>退出登录</Button>
                </Menu.Item>
            </Menu>
        );
        const userAvatar = this.props.loginForm.inOutState === true ?

            <Dropdown className={styles.dropDown} placement="bottomLeft" overlay={menu} trigger={['click']}>
                <a href="#">
                    <img className={styles.userPic} src={logIn} />
                </a>
            </Dropdown>
            :
            <Link to="user/login">
                <img className={styles.userPic} src={logOut} />
            </Link>

        return (

            <Layout>
                {/* 页头 */}
                <Header className={styles.header}>
                    <Row>
                        <Col xs={18} sm={12} xl={12} xxl={8}>
                            <Link to='homepage'>
                                <img className={styles.logo} src={logoPic} />
                            </Link>
                        </Col>
                        <Col xs={6} sm={12} xl={12} xxl={16} className={styles.userCol}>
                            {userAvatar}
                        </Col>
                    </Row>
                </Header>
                {/* 内容 */}
                <Content  className={styles.contentBox}>
                    <Row style={{ backgroundColor: 'white' }}>
                        <Col span={1} xl={4}></Col>
                        <Col span={22} xl={16}>
                            <GlobalNavi
                                naviRoutes={naviRoutes}
                                pathName={headerRouter}
                                style={{ backgroundColor: 'white', marginBottom: '50%' }}
                            />
                            {this.props.children}
                            {/* 在线留言 */}
                            <div className={styles.service} style={{ right: this.state.numTool + 'px' }} onClick={this.display_name}><Icon type='message' />{this.state.numTool === 70 ? "收起" : "留言"}</div>
                            <div className={styles.online} style={{ right: this.state.numMess + 'px' }}><SubmitInfo onBack={this.display_name.bind(this)} /></div>
                        </Col>
                        <Col span={1} xl={4}></Col>
                    </Row>
                </Content>
                {/* 页脚 */}
                <Footer
                    className={styles.footer}
                    style={{
                    }}
                >
                    <div className={styles.copyRight}>版权所有 © 2018 北京欧德慧通信息技术有限公司</div>
                    <div className={styles.copyRight}>京ICP备16000236号-1</div>

                </Footer>
            </Layout>
        );
    }
}


// export default HomeLayout;

const mapStateToProps = ({ login_m }) => {
    // console.log(login_m);
    return { loginForm: login_m }
}


export default connect(mapStateToProps)(HomeLayout);