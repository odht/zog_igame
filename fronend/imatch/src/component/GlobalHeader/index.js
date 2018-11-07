//全局首页
//lsy
//2-19-9-4
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

let CURRET='management'
const GlobalHeader = props => {

    const { headerRoutes, pathname } = props;
    const HeaderMenu = headerRoutes.map(item => {
        if(item.authority){
            if(item.authority===CURRET){
                return <Menu.Item key={item.path}> <Link to={item.path}>{item.name}</Link> </Menu.Item>
            }else{
                return null
            }
        }
        return <Menu.Item key={item.path}> <Link to={item.path}>{item.name}</Link> </Menu.Item>
    }).filter((item)=>(item));
    return (
        <div className={styles.header}>
            <Menu
               theme='grey'
                mode="horizontal"
                defaultSelectedKeys={[pathname]}
                style={{ lineHeight: '64px' }}
            >
                {HeaderMenu}
            </Menu>
        </div>
    )
}

export default GlobalHeader;