import React from "react";
import { Row, Col, Menu, Dropdown, Icon } from "antd";
import Link from "umi/link";
import managementRouter from '@/common/managementRouter';

class Sider extends React.Component {
    constructor(props){
        super(props);
    }
    handleClick = (e) => {
        console.log('click ', e);
    }
    getMenuItem(router){
        return  router.map(function(item){
            return (
                <Menu.Item key= {item.path}>
                    <Link to={item.path}>
                        {item.name}
                    </Link>
                </Menu.Item>)
        })
    }
    render() {
        const {pathname}=this.props;
        console.log('----------pathname-----------',pathname)
        return (
            <div style={{width:'100%'}}>
                <div 
                    style={{
                        width:'90%', 
                        height:'50px', 
                        fontSize:'20px',
                        fontWeight:'bolder', 
                        textAlign:"center",
                        lineHeight:'50px',
                        backgroundColor:'white',
                        color:'white'
                    }}>
                        {/* 智赛棋牌后台管理系统 */}
                    </div>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: '90%',textAlign:'center' }}
                    mode="inline"
                    selectedKeys={[pathname]}
                >
                    {this.getMenuItem(managementRouter)}
                </Menu>
            </div>
        
        );
    }
}

export default function(props) {
    console.log(props);
    const {location:{pathname}}=props;
    const naviMenu = (
        <Menu
           style={{width:'100%', textAlign:'center'}}
           mode="inline"
        >
            {
                managementRouter.map(function(item){
                    return(
                        <Menu.Item key = {item.path}>
                            <Link to={item.path}>
                                {item.name}
                            </Link>
                        </Menu.Item>
                    ) 
                })
            }
        </Menu>
    );
    console.log('--- naviMenu ---',naviMenu);
    return (
        <div>
            <Row style={{backgroundColor:'white', width:'100%', paddingTop:'20px'}}>
                <Col xl={0} md={0} sm={1} xs={1}></Col>
                <Col xl={0} md={0} sm={22} xs={22} style={{textAlign:'left'}}>
                    <Dropdown overlay={naviMenu} trigger={['click']}>
                        <Icon type="bars" style={{fontSize:'25px', color:'#08c'}}/>
                    </Dropdown> 
                </Col>
                <Col xl={0} md={0} sm={1} xs={1}></Col>
            </Row>
            <Row>
                <Col xl={2} md={1} sm={1} xs={1}></Col>
                <Col xl={4} md={3} sm={0} xs={0}>
                    <Sider pathname={pathname}/>
                </Col>
                <Col xl={15} md={19} sm={22} xs={22}>
                   <div style={{width:'100%', height:'20px',textAlign:"center",lineHeight:'20px'}}></div>
                    { props.children }
                </Col>
                <Col xl={2} md={1} sm={1} xs={1}></Col>
            </Row>
        </div>
    );
}