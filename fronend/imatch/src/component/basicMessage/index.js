import React from 'react';
import { Card, Button } from 'antd';
import router from 'umi/router';
const ListDecorator = ({ detailData, announcement }) => {
    // const annList = announcement.map(child => <a key={child.id} to="#"><p >{child.text}</p></a>)
    return (
        <>
            {/* <Row gutter={18}> */}
            {/* <Col span={14}> */}
            
                <p><span style={{fontWeight:""}}>比赛名称：</span>{detailData.name}</p>
                <p><span >报名截止时间：</span>{detailData.endtime}</p>
                <p><span >比赛开始时间：</span>{detailData.date_from}</p>
                <p><span >比赛结束时间：</span>{detailData.date_thru}</p>
                <p><span >主办单位：</span>{detailData.host}</p>
                <p><span >承办单位：</span>{detailData.sunit}</p>
                <p><span >协办单位：</span>{detailData.unit}</p>
                {/* <p><span >状态：</span>{detailData.state}</p> */}
                <p><span style={{ letterSpacing: 13 }} >裁判：</span>{detailData.referee}</p>
                <p><span style={{ letterSpacing: 13 }}  >仲裁：</span>{detailData.arbitration}</p>
            
        </>
    )
}
export default ListDecorator;