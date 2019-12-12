import React from 'react';
import { Card,Button } from 'antd';
import styles from './index.less';
import router from 'umi/router';
const ListDecorator = ({detailData, announcement} ) => {
    console.log(detailData)
    // const annList = announcement.map(child => <a key={child.id} to="#"><p >{child.text}</p></a>)
    return (
        <div style={{ background: '#ECECEC', padding: '15px' }}>
            {/* <Row gutter={18}> */}
                {/* <Col span={14}> */}
                    <Card title="比赛信息" bordered={false}>
                        <p><span className={styles.list_text}>比赛名称：</span>{detailData.name}</p>
                        <p><span className={styles.list_text}>报名截止时间：</span>{detailData.signEndTime}</p>
                        <p><span className={styles.list_text}>比赛开始时间：</span>{detailData.start_time}</p>
                        <p><span className={styles.list_text}>比赛结束时间：</span>{detailData.over_time}</p>
                        <p><span className={styles.list_text}>主办单位：</span>{detailData.host_unit}</p>
                        <p><span className={styles.list_text}>承办单位：</span>{detailData.undertaking_unit}</p>
                        <p><span className={styles.list_text}>协办单位：</span>{detailData.cooperating_unit}</p>
                        {/* <p><span className={styles.list_text}>状态：</span>{detailData.state}</p> */}
                        <p><span style={{ letterSpacing: 13 }} className={styles.list_text}>裁判：</span>{detailData.referee}</p>
                        <p><span style={{ letterSpacing: 13 }} className={styles.list_text} >仲裁：</span>{detailData.arbitrator}</p>
                        <Button 
                            type='primary'
                            style={{marginTop:20,width:130,height:35}}
                            onClick={()=>router.push(`../team/Team`)}
                        >
                            我要报名
                        </Button>
                    </Card>
                {/* </Col> */}
                {/* <Col span={10}> */}
                    {/* <Card title="通告" bordered={false}>{annList}</Card> */}
                {/* </Col> */}
            {/* </Row> */}
        </div>
    )
}
export default ListDecorator;
