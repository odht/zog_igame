import React from 'react';
import { Card, Col, Row } from 'antd';
import styles from './index.less';

const ListDecorator = ({ detailData, announcement }) => {
    const { notes } = detailData;
    var notesobj=JSON.parse(notes);
    const annList = announcement && announcement.map(child => <a key={child.id} to="#"><p >{child.text}</p></a>)
    return (
        <div style={{ background: '#ECECEC', padding: '15px' }}>
            <Row gutter={18}>
                <Col span={14}>
                    <Card title="比赛信息" bordered={false} className={styles.list_text}>
                        <p ><span className={styles.list_text} >比赛名称：</span >{detailData.name}</p>
                        <p><span className={styles.list_text}>开始时间：</span>{detailData.date_from}</p>
                        <p><span className={styles.list_text}>结束时间：</span>{detailData.date_thru}</p>
                        <p><span className={styles.list_text}>主办单位：</span>{notesobj.host}</p>
                        <p><span className={styles.list_text}>承办单位：</span>{notesobj.unit}</p>
                        <p><span className={styles.list_text}>协办单位：</span>{notesobj.sunit}</p>
                        <p><span style={{ letterSpacing: 13 }} className={styles.list_text}>裁判：</span>{notesobj.referee}</p>
                        <p><span style={{ letterSpacing: 13 }} className={styles.list_text} >仲裁：</span>{notesobj.arbitration}</p>
                        <p><span style={{ letterSpacing: 4 }} className={styles.list_text}>联系人：</span>{notesobj.concet}</p>
                        <p><span style={{ letterSpacing: 13 }} className={styles.list_text}>电话：</span>{notesobj.phone}</p>
                        <p><span className={styles.list_text}>报名截止：</span>{notesobj.endtime}</p>
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
