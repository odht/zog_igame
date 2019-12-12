//比赛详情页面
//lsy
//2018-9-4

import React, { Component } from 'react';
import { Layout, Menu, Button, Row, Col, Dropdown } from 'antd';
import DetailsHeader from '../component/DetailsHeader';
import * as routes from '../common/detailsroutes';
import Breadcrumbs from '../component/Breakcrumbs';
import styles from './DetailsLayout.less';
import logoPic from '../assets/zhiSaiLogo.png';
import { Link } from 'dva/router';
import logIn from '../assets/logIn.png';
import logOut from '../assets/logOut.png';
import { connect } from 'dva';

const { Header, Content, Footer } = Layout;
const { details: headerRoutes } = routes;



class DetailsLayout extends Component {
	
	constructor(props){
		super(props);
        this.state = {
			inOutState: this.props.loginForm.inOutState,
	
			visible: false,
			confirmLoading: false,
		};
		this.handleLogout = this.handleLogout.bind(this);
	}
	
	handleLogout() {
        this.props.dispatch({
            type: 'login_m/logout',
            payload: { inOutState: false }
        });
    }

	render() {
		// 识别
		const { location: { pathname, state: { gameData }, state } } = this.props;
		// 用户图标
		const menu = (
			<Menu className={styles.dropDownMenu}>
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
				<a>
					<img className={styles.userPic} src={logIn} alt='登录状态'/>
				</a>
			</Dropdown>
			:
			<Link to="/user/login">
				<img className={styles.userPic} src={logOut} alt='登出状态'/>
			</Link>
		return (
			<Layout >
				<Header className={styles.header}>
					<Row className={styles.headerFlex}>
                        <Col xs={18} sm={12} xl={12} xxl={8}>
                            <Link to='homepage'>
                                <img className={styles.logo} src={logoPic} alt='logo'/>
                            </Link>
                        </Col>
                        <Col xs={6} sm={12} xl={12} xxl={16} className={styles.userCol}>
                            {userAvatar}
                        </Col>
                    </Row>
				</Header>
				<Content style={{ padding: '0 50px',minHeight:'800px' }}>
				    <DetailsHeader
						gameData={gameData}
						headerRoutes={headerRoutes}
						pathname={pathname}
					/>
					<div style={{ padding: '13px 10px 13px 0', fontSize: 18 }}>
						<Breadcrumbs state={state}></Breadcrumbs>
					</div>
					<Layout style={{ padding: '0px 0', background: '#fff' }}>

						<Content style={{ padding: '0 0', minHeight: '69.5vh' }}>
							{this.props.children}
						</Content>
					</Layout>
				</Content>
				{/* 页脚 */}
                <Footer className={styles.footer}>
                    <div className={styles.copyRight}>版权所有 © 2018 北京欧德慧通信息技术有限公司</div>
                    <div className={styles.copyRight}>京ICP备16000236号-1</div>
                </Footer>
			</Layout>
		)
	}
}




// export default DetailsLayout;

const mapStateToProps = ({ login_m }) => {
    console.log(login_m);
    return { loginForm: login_m }
}


export default connect(mapStateToProps)(DetailsLayout);