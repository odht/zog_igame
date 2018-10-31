import React, { Component } from 'react';
import { Row, Col, Menu } from "antd";
import { Link } from "dva/router";
import managementRouter from '@/common/managementRouter';

class Sider extends Component {
    constructor(props) {
        super(props);
    }
    handleClick = (e) => {
        console.log('click ', e);
    }
    getMenuItem(router) {
        return router.map(function (item) {
            return <Menu.Item key={item.path}><Link to={item.path}>{item.name}</Link></Menu.Item>
        })
    }
    render() {
        const { pathname } = this.props;
        console.log(pathname)
        return (
            <div>
                <div style={{ width: '256px', height: '50px', textAlign: "center", lineHeight: '50px' }}>后台管理</div>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 256, textAlign: 'center' }}
                    mode="inline"
                    selectedKeys={[pathname]}
                >
                    {this.getMenuItem(managementRouter)}
                </Menu>
            </div>

        );
    }
}
export default function (props) {
    console.log(props)
    const { location: { pathname } } = props
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Sider pathname={pathname} />
                </Col>
                <Col span={18}>
                    <div style={{ width: '256px', height: '50px', textAlign: "center", lineHeight: '50px' }}></div>
                    {props.children}
                </Col>
            </Row>
        </div>
    );
}