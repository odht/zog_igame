import React, { Component } from 'react';
import {Row, Col , Card, List, Icon} from "antd";
import { Link } from 'dva/router';
import styles from './index.css';
import culturePic from '../../assets/culture.jpg';
import IndexCarousel from '../../component/IndexCarousel'


const gnews ={ list:[1,2,3,4,5,6,7,8,9].map(function(item){
    return '全国赛事新闻' + item
})}
const news ={ list:[1,2,3,4,5,6,7,8,9].map(function(item){
    return '石家庄赛事新闻' + item
})}

class NewsBlock extends Component{

    render(){
        return(
            <div style={{paddingTop:'10px', paddingBottom:'10px'}}>
                <IndexCarousel/>
                <div className={styles.newsTitle}>
                    <span className={styles.newsEng}>NEWS CENTER</span>
                    <p><span className={styles.newsLine}>─────────</span><span className={styles.newsCn}>新闻中心</span><span className={styles.newsLine}>─────────</span></p>
                </div>
                <Row gutter={50}>
                    <Col xl={12} xs={24}>
                        <Card title="全国新闻" bordered={true} extra={<a href="#">更多 >></a>}>
                            <List
                                dataSource={gnews.list}
                                renderItem={item => (
                                <List.Item actions={[<span>2018/9/19</span>, <Icon type="right"/>]}>
                                    <div>{item}</div>
                                </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xl={12} xs={24}>
                        <Card title="石家庄新闻" bordered={true} extra={<a href="#">更多 >></a>}>
                        <List
                                dataSource={news.list}
                                renderItem={item => (
                                <List.Item actions={[<span>2018/9/19</span>, <Icon type="right"/>]}>
                                    <div>{item}</div>
                                </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>  
        );
}
}


export default NewsBlock;