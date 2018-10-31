import React from 'react';
import { Table } from 'antd';
import { Link } from 'dva/router';
const dataSource=[1,2,3,4,5,6].map(function(item){
    return {table:item,
        complete:8,
        host:"法尔胜",
        guest:"育贤海外队",
        hostimps:10,
        guestimps:9,
        hostvps:10.44,
        guestvps:9.56
    }
})
const ResultDataTable = () => {

    const columns = [{
        title: "对阵结果",
        children: [{
            title: "桌",
            dataIndex: "table",
            render: (text) => {
                  return <Link to="/details/grade/round">{text}</Link>;
              }
        }, {
            title: "完成",
            dataIndex: "complete"
        }, {
            title: "主队",
            dataIndex: "host",
            render:(text) => {
                return <Link to="/details/grade/2">{text}</Link>;
            }
        }, {
            title: "客队",
            dataIndex: "guest",
        }, {
            title: "IMPS",
            children: [{
                title: "主队",
                dataIndex: "hostimps",
            }, {
                title: "客队",
                dataIndex: "guestimps",
            }]
        }, {
            title: "VPs",
            children: [{
                title: "主队",
                dataIndex: "hostvps",
            }, {
                title: "客队",
                dataIndex: "guestvps",
            }]
        }]
    }]

    return (
        <Table
            pagination={false}
            size='middle'
            columns={columns}
            dataSource={dataSource}
            bordered
        />
    )
}

export default ResultDataTable;