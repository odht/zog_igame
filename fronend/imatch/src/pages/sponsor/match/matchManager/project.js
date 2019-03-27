/**
 * title: 项目 - 智赛桥牌
 */
import React, { useEffect, useState, useRef } from 'react';
import { Button,Table } from 'antd'

export default (props) => {
    const columns=[{
        title:"名称",
        dataIndex:'name',
        align:"center"
    },{
        title:"操作",
        dataIndex:"action",
        align:"center",
        render:(text,record)=>{
            return(
                <a href="javascript:void 0">删除</a>
            )
        }
    }]
    return (
        <div style={{maxWidth:"500px"}}>
            <Button type="primary" style={{marginBottom:20}}>添加</Button>
            <Table columns={columns} dataSource={[]} bordered />
        </div>
    )
}