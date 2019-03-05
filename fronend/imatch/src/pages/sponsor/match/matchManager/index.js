/**
 * title: 赛事管理 - 智赛桥牌
 * isNotMenu: true
 */
import React, { useEffect, useState, useRef } from 'react';
import { Menu } from 'antd'
import odoo from '../../../../odoo-rpc/odoo'
import router from 'umi/router';
import StepContent from '@/component/steps/test'
import { parseNotes } from '@/utils/tools'
export default (props) => {
    console.log(props);
    const x = ['基本信息', '规程', '参赛队', '项目', '结果', '新闻']
    return (
        <>
            <Menu
                // onClick={this.handleClick}
                // selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                {
                    x.map((item) => 
                        <Menu.Item>
                            {item}
                        </Menu.Item>
                    )
                }
            </Menu>
        </>
    )
}