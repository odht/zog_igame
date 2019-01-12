
import React from 'react';
import { Menu, Drawer, Icon, Layout } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import { List, Home, News, Product, Us } from '../svg';


class GlobalNavi extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    drawer() {
        this.setState({ visible: !this.state.visible })
    }
    onClose = () => {
        this.setState({ visible: !this.state.visible })
    }
    render() {
        const { naviRoutes, pathName } = this.props;
        const HeaderMenu = naviRoutes.map(item => {
            return (
                <Menu.Item className={styles.linkItem} key={item.path}>
                    <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
            );
        }).filter((item) => (item));
        
        const icon = (item) => {
            switch (item.path) {
                case "/home":
                    return <Icon component={Home}  />
                case "/news":
                    return <Icon component={News} />
                case "/games":
                    return <Icon component={Product} />
                case "/teaching":
                    return <Icon component={Us} />
                default:
                    return null
            }
        }
        return (
            <>
                <div className={styles.header} >
                    <Menu
                        theme='grey'
                        mode="horizontal"
                        selectedKeys={[pathName]}
                        defaultSelectedKeys={['/home']}
                        style={{ lineHeight: '64px' }}
                    >
                        {HeaderMenu}
                    </Menu>

                </div>
                <div className={styles.icon}>
                    <Icon component={List} onClick={this.drawer.bind(this)} style={{ color: "red", width: "2rem" }} />
                </div>
                <Drawer

                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    width={'50%'}
                >
                    <Menu
                        theme='grey'
                        mode="inline"
                        selectedKeys={[pathName]}
                        defaultSelectedKeys={['/home']}
                        style={{ lineHeight: '64px' }}  
                        onClick={this.onClose}
                    >
                        {naviRoutes.map(item => {
                            return (
                                <Menu.Item className={styles.linkItem} key={item.path}>
                                    {icon(item)}
                                    <Link to={item.path} style={{display:"inline"}}>{item.name}</Link>
                                </Menu.Item>
                            );
                        }).filter((item) => (item))}
                    </Menu>
                </Drawer>
            </>
        )
    }
}

export default GlobalNavi;