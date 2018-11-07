import React from 'react';
import { Card, Col, Row } from 'antd';
import styles from './index.less';

const ListDecorator = ({ detailData, announcement }) => {
    const annList = announcement && announcement.map(child => <a key={child.id} to="#"><p >{child.text}</p></a>)
    return (
        <div style={{ background: '#ECECEC', padding: '15px' }}>
            <Row gutter={18}>
                <Col span={14}>
                    <Card title="比赛信息" bordered={false}>
                        <p><span className={styles.list_text}>比赛名称：</span>{detailData.name}</p>
                        <p><span className={styles.list_text}>比赛时间：</span>{detailData.time}</p>
                        <p><span className={styles.list_text}>主办单位：</span>{detailData.host}</p>
                        <p><span className={styles.list_text}>承办单位：</span>{detailData.unit}</p>
                        <p><span className={styles.list_text}>协办单位：</span>{detailData.sunit}</p>
                        <p><span style={{ letterSpacing: 13 }} className={styles.list_text}>裁判：</span>{detailData.referee}</p>
                        <p><span style={{ letterSpacing: 13 }} className={styles.list_text} >仲裁：</span>{detailData.arbitration}</p>
                        <p><span style={{ letterSpacing: 4 }} className={styles.list_text}>联系人：</span>{detailData.concet}</p>
                        <p><span style={{ letterSpacing: 13 }} className={styles.list_text}>电话：</span>{detailData.phone}</p>
                        <p><span className={styles.list_text}>报名截止：</span>{detailData.endtime}</p>
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="通告" bordered={false}>{annList}</Card>
                </Col>
            </Row>
        </div>
    )
}
export default ListDecorator;
