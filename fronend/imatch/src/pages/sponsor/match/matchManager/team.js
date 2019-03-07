/**
 * title: 参赛队 - 智赛桥牌
 * index: 2
 */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Table } from 'antd'
async function change(){

}
export default (props) => {
    const columns = [{
        title: "队伍编号",
        dataIndex: 'name',
        align: "center"
    }, {
        title: "队名",
        dataIndex: 'name',
        align: "center"
    }, {
        title: "名次",
        dataIndex: 'name',
        align: "center"
    }, {
        title: "领队/教练",
        dataIndex: 'name',
        align: "center"
    }, {
        title: "队员",
        dataIndex: 'name',
        align: "center"
    }, {
        title: "操作",
        dataIndex: "action",
        align: "center",
        render: (text, record) => {
            return (
                <>
                    <a href="javascript:void 0">修改名单</a>
                    <a href="javascript:void 0">删除</a>
                </>
            )
        }
    }]
    return (
        <div style={{}}>
            <Button type="primary" style={{ marginBottom: 20 }} onClick={change}>添加队</Button>
            <Table columns={columns} dataSource={[]} bordered />
        </div>
    )
}