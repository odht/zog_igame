import React from 'react';
import { Card, Col, Row } from 'antd';
import styles from './index.less';
import router from 'umi/router';
import { Button, notification } from 'antd';


const openNotification = () => {
 
  const btn = (
    <Button type="primary" size="small" >
      确认
    </Button>    
  );
  const btn1=(
      <Button>取消</Button>
  )
  notification.open({
    message: '报名需缴纳200元报名费，确认报名？',  
    btn,btn1,
   
  });
};
  const close = () => {
    const btn = (
        <Button type="primary" size="small" >
              取消
        </Button>)
  };
 
  
const ListDecorator = ({detailData, announcement} ) => {
    console.log(detailData)
    // const annList = announcement.map(child => <a key={child.id} to="#"><p >{child.text}</p></a>)
    return (
        <div style={{ background: '#ECECEC', padding: '15px' }}>
            {/* <Row gutter={18}> */}
                {/* <Col span={14}> */}
                    <Card title="报名信息" bordered={false}>
                        <p><span className={styles.list_text}>比赛名称：</span>{detailData.name}</p>
                        <p><span className={styles.list_text}>赛队名称：</span></p>
                        <p><span className={styles.list_text}>领队：</span></p>
                        <p><span className={styles.list_text}>教练：</span></p>
                        <p><span className={styles.list_text}>队员1：</span></p>
                        <p><span className={styles.list_text}>队员2：</span></p>
                        <p><span className={styles.list_text}>队员3：</span></p>
                        <Button  style={{width:80,marginRight:15,background:'#ECECEC'}} onClick={openNotification}>提交 </Button>  
                    <Button  style={{width:80,background:'#ECECEC'}} onClick={()=>router.push(`../team/signupGame`)}>取消</Button>
                    
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
