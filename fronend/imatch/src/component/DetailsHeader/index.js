//详情头部
//lsy
//2-19-9-4
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';


const DetailsHeader = props => {

    const { headerRoutes, pathname } = props;
    const headerRouter = '/' + pathname.split('/')[2];
    const HeaderMenu = headerRoutes.map(child => {
        return <Menu.Item key={child.path}> <Link to={`/details${child.path}`}>{child.name}</Link> </Menu.Item>
    })
    return (
        <div className={styles.header}>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[headerRouter]}
                style={{ lineHeight: '64px' }}
            >
                {HeaderMenu}
            </Menu>
        </div>
    )
}

export default DetailsHeader;