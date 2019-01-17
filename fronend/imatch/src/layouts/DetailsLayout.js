//比赛详情页面
//lsy
//2018-9-4

import React, { Component, Fragment } from 'react';
import { Layout, Icon, Input, Button, Modal, Form, Checkbox } from 'antd';
import DetailsHeader from '../component/DetailsHeader';
import * as routes from '../common/detailsroutes';
import Breadcrumbs from '../component/Breakcrumbs';
import styles from './DetailsLayout.less';
import logoPic from '../assets/zhiSaiLogo.png';
import { Link } from 'dva/router';


// import BasicFooter from '../component/BasicFooter';
const { Header, Content, Footer } = Layout;
const { details: headerRoutes } = routes;

//面包屑
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(
						<Checkbox>Remember me</Checkbox>
					)}
					<a className="login-form-forgot" href="">Forgot password</a>
					<Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }} >
						Log in
            </Button>
					Or <a href="">register now!</a>
				</FormItem>
			</Form>
		);
	}
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


class DetailsLayout extends Component {

	state = {
		visible: false,
		confirmLoading: false,
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	handleOk = () => {
		this.setState({
			confirmLoading: true,
		});
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false,
			});
		}, 2000);
	}

	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
			visible: false,
		});
	}

	render() {
		// 识别
		const { visible, confirmLoading } = this.state;
		const { location: { pathname, state: { gameData }, state } } = this.props;
		return (
			<Layout style={{ minWidth: 780 }}>
				{/*<div style={{ border: 'none', textAlign: "center", lineHeight: '80px' }}>
					<img style={{ height: '80px', 'float': "left" }} src={logo} />
					<Button type="primary" onClick={this.showModal}>登录</Button>
				</div>*/}
				<Header className={styles.header}>
                    <Link to='/homepage'>
                        <img className={styles.logo} src={logoPic} />
                    </Link>
					{/* <DetailsHeader
						gameData={gameData}
						headerRoutes={headerRoutes}
						pathname={pathname}
					/> */}
				</Header>
				<Content style={{ padding: '0 50px',minHeight:'800px', minWidth:'1000px' }}>
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
				<Modal
					bodyStyle={{ paddingTop: "35px" }}
					visible={visible}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					maskClosable={false}
					width={300}
					footer={null}
				>
					<WrappedNormalLoginForm />
				</Modal>
			</Layout>
		)
	}
}




export default DetailsLayout;