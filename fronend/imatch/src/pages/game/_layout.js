import React from "react";
import { Row, Col,Menu } from "antd";
import { Link } from "dva/router";
import gamesRouter from '@/common/gamesRoutes';

class Sider extends React.Component {
    // constructor(props){
    //     super(props);
    // }
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
                    {this.getMenuItem(gamesRouter)}
                </Menu>
            </div>
        
        );
    }
}

export default function(props) {
    console.log(props);
    const {location:{pathname}}=props
    return (
        <div>
            <Row>
                <Col xl={6} md={4}>
                    <Sider pathname={pathname}/>
                </Col>
                <Col xl={18} md={20}>
                <div style={{width:'100%', height:'50px',textAlign:"center",lineHeight:'50px'}}></div>
                    { props.children }
                </Col>
            </Row>
        </div>
    );
}