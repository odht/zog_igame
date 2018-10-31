import React from 'react';
import { Row, Col,Menu } from "antd";
import { Link } from "dva/router";


class Sider extends React.Component {
    handleClick = (e) => {
      console.log('click ', e);
    }
  
    render() {
        console.log('********************************')
      return (
          <div>
               <div style={{width:'256px', height:'50px',textAlign:"center",lineHeight:'50px'}}>个人信息</div>
               <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                mode="inline"
                >
                    <Menu.Item key="1"><Link to='/info'>基本信息</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/info/modifypwd'>修改密码</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/info/contact'>联系方式</Link></Menu.Item>
                    <Menu.Item key="4"><Link to='/info/id'>身份认证</Link></Menu.Item>
                    <Menu.Item key="5"><Link to='/info/backcard'>银行卡信息</Link></Menu.Item>
                </Menu>
          </div>
        
      );
    }
  }
export default function(props) {
    return (
      <div>
        <Row>
            <Col span={6}>
                <Sider/>
            </Col>
            <Col span={18}>
            <div style={{width:'256px', height:'50px',textAlign:"center",lineHeight:'50px'}}></div>
                { props.children }
            </Col>
        </Row>
      </div>
    );
  }