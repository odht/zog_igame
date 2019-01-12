import React from 'react';
import { Row, Col, Menu, Icon } from "antd";
import { Link } from "dva/router";
const SubMenu = Menu.SubMenu;

class Sider extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            current: 'userI',
        }
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        const {pathname}=this.props;
        console.log(pathname)
        return (
            <div style={{width:'100%'}}>
                <div style={{width:'100%', height:'30px',textAlign:"center",lineHeight:'50px'}}></div>
                <Menu
                    // defaultSelectedKeys={['userI']}
                    onClick={this.handleClick}
                    style={{ width: '100%',  textAlign:'center', borderRight: '0px' }}
                    mode="inline"
                    theme="light"
                    selectedKeys={[this.state.current]}
                >
                    <Menu.Item key="userI">
                        <Link to='/user/userInfo/userInfo' ><Icon type="user" />个人中心</Link>
                    </Menu.Item>

                    <SubMenu key="userE" title={<span><Icon type="edit" /><span>设置</span></span>}>
                        <Menu.Item key="baseE">
                            <Link to='/user/userInfo/userSet/baseSet'>基本设置</Link>
                        </Menu.Item>
                        <Menu.Item key="pwdE">
                            <Link to='/user/userInfo/userSet/pwdSet'>密码修改</Link>
                        </Menu.Item>
                        <Menu.Item key="phoneE">
                            <Link to='/user/userInfo/userSet/phoneSet'>手机号修改</Link>
                        </Menu.Item>
                        <Menu.Item key="idE">
                            <Link to='/user/userInfo/userSet/idSet'>身份认证</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        
        );
    }
}

export default function(props) {
    console.log(props);
    const {location:{pathname}}=props
    return (
        <Row style={{backgroundColor:'white', width:'100%', height:'100%'}}>
            <Col xl={1} md={1}></Col>
            <Col xl={4} md={4}>
                <Sider pathname={pathname}/>
            </Col>
            <Col xl={1} md={1}></Col>
            <Col xl={17} md={17}>
            <div style={{width:'100%', height:'30px',textAlign:"center",lineHeight:'50px'}}></div>
                { props.children }
            </Col>
            <Col xl={1} md={1}></Col>
        </Row>
    );
}