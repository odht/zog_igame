import React, { useEffect, useState, useRef } from 'react';
import { Menu } from 'antd'
import { parseNotes, createMenu } from '@/utils/tools'
export default (props) => {
    const { route: { routes }, location: { pathname } } = props
    const menuPathname = routes.filter((item) => item.path && !item.isNotMenu).find((item) => pathname.indexOf(item.path) > -1)
    return (
        <>
            <Menu
                // onClick={this.handleClick}
                selectedKeys={[menuPathname && menuPathname.path]}
                mode="horizontal"
            >
                {createMenu(routes)}
            </Menu>
            <div style={{ marginTop: 15, padding: 20, backgroundColor: "white" }}>
                {props.children}
            </div>

        </>
    )
}