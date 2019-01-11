import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'dva/router';
import styles from './index.css';
import culturePic from '../../assets/culture.jpg';
import logoPic from '../../assets/logo1.png';
class NewsBlock extends Component{

  render(){
    return(
      <React.Fragment>
        <img className={styles.culturePic} src={culturePic} alt="企业文化"/>
          <div className={styles.newsTitle}>
            <span className={styles.newsEng}>NEWS CENTER</span>
            <p><span className={styles.newsLine}>─────────</span><span className={styles.newsCn}>新闻中心</span><span className={styles.newsLine}>─────────</span></p>
          </div>
          <Row>
            <Col xs={0} md={7} className={styles.leftPart}>
                <div className={styles.caseCenterTitle} >优秀案例</div>
                <div className={styles.caseCenter}>
                    <a href='#'>
                    <div className={styles.caseItem}>
                        <img className={styles.logoPic} src={logoPic} alt="欧德慧通LOGO"/>
                        <div className={styles.caseContent}>
                            智赛棋牌
                        </div>
                    </div>
                    </a>
                    <a href='#'>
                    <div className={styles.caseItem}>
                        <img className={styles.logoPic} src={logoPic} alt="欧德慧通LOGO"/>
                        <div className={styles.caseContent}>
                            智赛棋牌智赛棋牌智赛棋牌智赛棋牌
                        </div>
                    </div>
                    </a>
                    <a href='#'>
                    <div className={styles.caseItem}>
                        <img className={styles.logoPic} src={logoPic} alt="欧德慧通LOGO"/>
                        <div className={styles.caseContent}>
                            智赛棋牌
                        </div>
                    </div>
                    </a>
                    <a href='#'>
                    <div className={styles.caseItem}>
                        <img className={styles.logoPic} src={logoPic} alt="欧德慧通LOGO"/>
                        <div className={styles.caseContent}>
                            智赛棋牌智赛棋牌智赛棋牌智赛棋牌
                        </div>
                    </div>
                    </a>
                    <Link to={{pathname:'/'}}>
						<div style={{ fontSize:'10px',textAlign:'right' }}> 更多案例 >></div>
					</Link>
                </div>
                <div className={styles.tellUsTitle} >联系我们</div>
                <div className={styles.tellUs}>
                    <p>企业：欧德慧通</p>
                    <p>联系人：张先生</p>
                    <p>手机：139 1013 3451</p>
                    <p>邮箱：13910133451@163.com</p>
                    <p>地址：河北省石家庄市建设南大街269号</p>
                    <p>网址：http://www.odooht.com</p>
                </div>
            </Col>
            <Col xs={0} md={1}></Col>
            <Col xs={24} md={16} className={styles.rightPart}>
                <a href='#'>
                <div className={styles.newsBlock}>
                    <div className={styles.newsDate}>
                        <span> 2018 / 12 </span>
                        <p> 04 </p>
                    </div>
                    <div className={styles.newsContent}>
                        <h3>鸿宏杯桥牌赛</h3>
                        <p>2018年，宏鸿杯桥牌赛</p>
                    </div>
                </div>
                </a>
                <a href='#'>
                <div className={styles.newsBlock}>
                    <div className={styles.newsDate}>
                        <span> 2018 / 12 </span>
                        <p> 04 </p>
                    </div>
                    <div className={styles.newsContent}>
                        <h3>鸿宏杯桥牌赛</h3>
                        <p>2018年，宏鸿杯桥牌赛</p>
                    </div>
                </div>
                </a>
                <a href='#'>
                <div className={styles.newsBlock}>
                    <div className={styles.newsDate}>
                        <span> 2018 / 12 </span>
                        <p> 04 </p>
                    </div>
                    <div className={styles.newsContent}>
                        <h3>鸿宏杯桥牌赛</h3>
                        <p>2018年，宏鸿杯桥牌赛</p>
                    </div>
                </div>
                </a>
                <a href='#'>
                <div className={styles.newsBlock}>
                    <div className={styles.newsDate}>
                        <span> 2018 / 12 </span>
                        <p> 04 </p>
                    </div>
                    <div className={styles.newsContent}>
                        <h3>鸿宏杯桥牌赛</h3>
                        <p>2018年，宏鸿杯桥牌赛</p>
                    </div>
                </div>
                </a>
                <a href='#'>
                <div className={styles.newsBlock}>
                    <div className={styles.newsDate}>
                        <span> 2018 / 12 </span>
                        <p> 04 </p>
                    </div>
                    <div className={styles.newsContent}>
                        <h3>鸿宏杯桥牌赛</h3>
                        <p>2018年，宏鸿杯桥牌赛</p>
                    </div>
                </div>
                </a>
                <a href='#'>
                <div className={styles.newsBlock}>
                    <div className={styles.newsDate}>
                        <span> 2018 / 12 </span>
                        <p> 04 </p>
                    </div>
                    <div className={styles.newsContent}>
                        <h3>鸿宏杯桥牌赛</h3>
                        <p>2018年，宏鸿杯桥牌赛</p>
                    </div>
                </div>
                </a>
            </Col>  
          </Row>
      </React.Fragment>  
        );
  }
}


export default NewsBlock;