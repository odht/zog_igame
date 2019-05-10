import React, { PureComponent } from 'react';
import { Menu, Icon, Button, Layout, Input } from 'antd';
import PropTypes from 'prop-types';
import Link from 'umi/link'
import styles from './index.less';
const SubMenu = Menu.SubMenu;
// 侧边栏
class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		const { route: { routes }, location: { pathname }, } = props;
		const config = {
			'/home': "首页",
			"/chesscard": "棋牌游戏",
			"/chesscard/bridge": "桥牌",
			"/roleplay": "角色扮演",
			"/competitive": "竞技游戏",
			"/console": "单机游戏",
			"/mobile": "手机游戏",
		}
		const menuData = this.getMenuData(routes, config);
		console.log(pathname);
		this.state = {
			selectKey: pathname,
			menuData: menuData,
		}
	}
	static propTypes = {
		collapsed: PropTypes.bool,
	}
	static getDerivedStateFromProps(props, state) {
		const { route: { routes }, location: { pathname }, } = props;
		if (pathname !== state.selectKey) {
			return { ...state, selectKey: pathname }
		} else {
			return { ...state }
		}
	}
	getMenuData(routes, config) {
		const path = routes.filter((item) => item.path !== '/' && item.path);
		path.forEach(item => {
			// console.log(item);
			item.MenuName = config[item.path] || "无状态路由";
			// if (item.path.split('/').filter(item => item).length >= 2) {
			// 	path.forEach((minitem) => {
			// 		if (minitem.path === "/" + item.path.split('/').filter(item => item)[0]) {
			// 			if (minitem.children) {
			// 				minitem.children.push[item]
			// 			} else {
			// 				minitem.childre = [item]
			// 			}
			// 		}
			// 	})
			// }

		});
		return path
	}
	getselectkey = () => {
		let select
		const { selectKey } = this.state;
		const selectKeyArray = selectKey.split('/').filter(item => item);
		if (selectKeyArray.length >= 2) {
			select = '/' + selectKeyArray[0] + '/' + selectKeyArray[1];
		} else {
			select = selectKey;
		}
		return select
	}
	render() {
		return (
			<Layout.Sider
				trigger={null}
				collapsible
				collapsed={this.props.collapsed}
				style={this.props.isMobile ? { height: "100vh" } : {}}
			>
				<div className={styles.logo} id="logo">
					<Link to="/">
						<img src={require('@/assets/logo.png')} alt="logo" style={{}} />
						<h1>Ant Design Pro</h1>
					</Link>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[this.state.selectKey]}
					selectedKeys={[this.getselectkey()]}
				// defaultOpenKeys={['sub1']}
				>
					<Menu.Item key="/home">
						<Link to="/home" >
							<Icon type="home" />
							<span>首页</span>
						</Link>
					</Menu.Item>
					<SubMenu key="/chesscard" title={<><Icon type="mail" /><span>棋牌游戏</span></>}>
						<Menu.Item key="/chesscard/bridge">
							<Link to="/chesscard/bridge" >桥牌</Link>
						</Menu.Item>
						<Menu.Item key="6">斗地主</Menu.Item>
						<Menu.Item key="7">麻将</Menu.Item>
						<Menu.Item key="8">飞行棋</Menu.Item>
					</SubMenu>
					<SubMenu key="/roleplay" title={<><Icon type="appstore" /><span>角色扮演</span></>}>
						<Menu.Item key="9">剑灵</Menu.Item>
						<Menu.Item key="10">天涯明月刀</Menu.Item>
						<SubMenu key="sub3" title="Submenu">
							<Menu.Item key="111">Option 11</Menu.Item>
							<Menu.Item key="121">Option 12</Menu.Item>
						</SubMenu>
					</SubMenu>
					<SubMenu key="/competitive" title={<><Icon type="pie-chart" /><span>竞技游戏</span></>}>
						<Menu.Item key="12">守望先锋</Menu.Item>
						<Menu.Item key="13">英雄联盟</Menu.Item>
						<Menu.Item key="14">星际争霸</Menu.Item>
					</SubMenu>
					<Menu.Item key="/console">
						<Icon type="desktop" />
						<span>单机游戏</span>
					</Menu.Item>
					<Menu.Item key="/mobile">
						<Icon type="inbox" />
						<span>手机游戏</span>
					</Menu.Item>

				</Menu>
			</Layout.Sider>

		)
	}
}
export default SideMenu