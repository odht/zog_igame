import React, {Component} from 'react';
import { Row, Col, Card } from 'antd';
import styles from './index.css';
import culturePic from '../../assets/culture.jpg';
import tellUsPic from '../../assets/tellUs.png';
import logo from '../../assets/logo1.png'

class MineBlock extends Component{

    render(){
        return(
            <React.Fragment>
                <img className={styles.culturePic} src={culturePic} alt="企业文化"/>
                <div className={styles.usTitle}>
                    <span className={styles.usEng}>ABOUT US</span>
                    <p><span className={styles.usLine}>─────────</span><span className={styles.usCn}>关于我们</span><span className={styles.usLine}>─────────</span></p>
                </div>

        {/* 企业介绍 */}
                <div className={styles.companyInfo}>
                    <img className={styles.companyInfoPic} src={logo}  alt="公司LOGO" />
                    <h2>北京欧德慧通信息技术有限公司</h2>
                    <p style={{ textIndent:'2em' }}>北京欧德慧通信息技术有限公司成立于2015年，注册资金100万，是一家有着丰富项目经验的IT产业公司。公司服务于各个行业，提供技术开发，技术推广，技术转让，技术咨询以及技术服务，销售公司自行开发的产品以及提供计算机系统服务，基础软件服务，应用软件服务。
                        多年以来本着“诚实做人，踏实做事，用心服务”的宗旨，通过我们的专业水平和不懈努力,三年来，一直秉承以用户需求为核心，在专注互联网市场开拓的同时,为多家企业提供技术服务，优质、用心的服务赢得了众多企业的信赖和好评，逐渐树立起公司良好品牌。并且完善了售后服务体系。我们相信,通过我们的不断努力和追求，一定能够实现与各个企业的互利共赢。
                    </p>
                </div>

                <div style={{marginBottom:'10px'}}>
                    <img className={styles.tellUsPic} src={tellUsPic} slt="联系我"/>  
                    <div className={styles.tellUsContent}>
                        <div className={styles.tellUsComp}>北京欧德慧通信息技术有限公司</div>
                        <p>联系人：张先生</p>
                        <p>手机：139 1013 3451</p>
                        <p>邮箱：13910133451@163.com</p>
                        <p>地址：河北省石家庄市建设南大街269号</p>
                        <p>网址：http://www.odooht.com</p>  
                    </div>
                </div>     
            </React.Fragment>
        );
    };
}


export default MineBlock;