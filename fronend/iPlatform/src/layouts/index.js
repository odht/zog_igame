import React from 'react';
import { Button, Dropdown, Menu, Row, Col } from "antd";
import styles from './index.css';
import logoPic from '@/assets/zhiSaiLogo.png'
import Link from 'umi/link';
import { connect } from 'dva';

class BasicLayout extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  handleLogout = () => {
    this.props.dispatch({
        type: 'login_m/logout',
        payload: { inOutState: false }
    });
  }
  render() {
    // 用户图标
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="user/userInfo" style={{ color: '#888888' }}>个人信息</Link>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http:" style={{ color: '#888888' }}>消息</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Button style={{ color: '#444444' }} onClick={this.handleLogout}>退出登录</Button>
        </Menu.Item>
      </Menu>
    );
    const userAvatar = this.props.loginForm.inOutState === true ?
      <Dropdown 
        className={styles.dropDown} 
        placement="bottomLeft" 
        overlay={menu} 
        trigger={['click']}
      >
        <a href="#">
          <span>管理员1</span>
        </a>
      </Dropdown>
      :
      <Link to="/login">
        <span className={styles.loginSpan}> 请登录 </span>
      </Link>;


    return (
      <div className={styles.normal}>
        <div className={styles.logoBox}>
          <Row>
            <Col xs={18} sm={12} xl={12} xxl={8}>
              <img className={styles.logo} src={logoPic} alt=" " />
            </Col>
            <Col xs={6} sm={12} xl={12} xxl={16} className={styles.userCol}>
              {userAvatar}
            </Col>
          </Row>
        </div>
        {this.props.children}
      </div>
    );
  }
}


const mapStateToProps =({login_m}) =>{

  console.log('----- login_m ------',login_m)
  return{loginForm:login_m}
}
export default connect(mapStateToProps)(BasicLayout);

