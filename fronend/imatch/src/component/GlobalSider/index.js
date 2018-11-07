import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';


const SubMenu = Menu.SubMenu;

const GlobalSider = props => {
    const { siderRoute: { child: routeChild } } = props;

    function createMenuSub(childSub) {
        return childSub.map(child => {
            if (child && child.child.length > 0) {
                return <SubMenu
                    key={child.path}
                    title={<span><Icon type={child.icon} /><span>{child.name}</span></span>}
                >
                    {child.child.map(childItem => {
                        if (childItem && childItem.child.length > 0) {
                            return createMenuSub(child.child);
                        } else if (childItem.child.length === 0) {
                            return createMenuItem(childItem);
                        }
                    })}
                </SubMenu>
            }
        })
    }

    function createMenuItem(childItem) {
        return (
            <Menu.Item
                key={childItem.path}
            >
                <Link to={`/game${childItem.path}`}>
                    <Icon type={childItem.icon} />
                    {childItem.name}
                </Link>
            </Menu.Item>
        )
    }

    function MenuList(child) {
        return child.map(child => {
            if (child && child.child.length > 0) {
                return (
                    <SubMenu
                        key={child.path}
                        title={<Link to={`/game${child.path}`}><span><Icon type={child.icon} /><span>{child.name}</span></span> </Link>}
                    >
                        {child.child.map(childItem => {
                            if (childItem && childItem.child.length > 0) {
                                return createMenuSub(child.child);
                            } else if (childItem.child.length === 0) {
                                return createMenuItem(childItem);
                            }
                        })}
                    </SubMenu>
                )
            } else {
                return createMenuItem(child);
            }
        })
    }

    return (
        <Menu defaultSelectedKeys={['1']} mode="inline">
            {MenuList(routeChild)}
        </Menu>
    )
}

export default GlobalSider;
