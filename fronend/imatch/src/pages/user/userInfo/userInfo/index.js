import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import 'antd/dist/antd.css';
import userPic from '../../../../assets/icon.png';


var userInfo={
    name:"王自健",
    gender:"先生",
    level:"桥牌终身大师",
    nickName:"孤独根号三",
    phone:"11012012306",
    weChat:"WZJ1314",
    QQ:"5543164",
    email:"wangzijian@sina.com",
    address:"中国河北省石家庄市裕华区裕华路110号",
    matchTeam:"河北宏鸿桥牌队"
}

class userInfoBlock extends Component{
    
    state = {
    }

    render(){
        return(
            <div className={styles.userBox}>
                <div className={styles.topTitle}>
                    个人中心
                </div>
                <Row className={styles.userInfoBox} >
                    <Col lg={1} md={1} ></Col>
                    <Col lg={7} md={7} >
                        <div className={styles.userNameBox}>
                            {/* <img src={userInfo.avatar} className={styles.userPic}/> */}
                            <img src={userPic} className={styles.userPic} alt='UserPic'/>
                            <p className={styles.nameBox}>{userInfo.name} {userInfo.gender}</p>
                            <p className={styles.levelBox}>{userInfo.level}</p>
                        </div>
                    </Col>
                    <Col lg={1} md={1} ></Col>
                    <Col lg={15} md={15}>
                    <div className={styles.baseInfoBox}>
                        <div>
                            <span className={styles.infoTitle}>游戏昵称：</span>
                            <span className={styles.infoContent}>{userInfo.nickName}</span>
                        </div>
                        <div>
                            <span className={styles.infoTitle}>联系电话：</span>
                            <span className={styles.infoContent}>{userInfo.phone}</span>
                        </div>
                        {/* <div>
                            <span className={styles.infoTitle}>微信：</span>
                            <span className={styles.infoContent}>{userInfo.weChat}</span>
                        </div>
                        <div>
                            <span className={styles.infoTitle}>QQ号：</span>
                            <span className={styles.infoContent}>{userInfo.QQ}</span>
                        </div> */}
                        <div>
                            <span className={styles.infoTitle}>邮箱：</span>
                            <span className={styles.infoContent}>{userInfo.email}</span>
                        </div>
                        <div>
                            <span className={styles.infoTitle}>联系地址：</span>
                            <span className={styles.infoContent}>{userInfo.address}</span>
                        </div>
                        <div>
                            <span className={styles.infoTitle}>棋牌队伍：</span>
                            <span className={styles.infoContent}>{userInfo.matchTeam}</span>
                        </div>
                    </div>
                </Col>
                </Row>
            </div>
            
        );
    }
}


export default userInfoBlock;

// const mapStateToProps = ({ login_m }) => {
    
//     console.log(login_m);
//     console.log(login_m.userInfo);
//     userInfo = login_m.userInfo;
//     console.log(userInfo);
//     return { userInfo: login_m.userInfo }
// }


// export default connect(mapStateToProps)(userInfoBlock);