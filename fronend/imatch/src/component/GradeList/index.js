//LSY
//2028-9-6
import React from 'react';
import { Table } from 'antd';
import { Link } from 'dva/router';

const GradeList = ({ gradeData }) => {
    const columns = [{
        title: "日期",
        dataIndex: "date",
        align:"center",
        render: (value, row, index) => {
            
            const obj = {
              children: value,
              props: {},
            };
            if (index === 0) {
              obj.props.rowSpan = 4;
            }else if (index === 4) {
              obj.props.rowSpan = 5;
            }else {
              obj.props.rowSpan = 0;
            }
            return obj;
        },
    }, {
        title: "时间",
        dataIndex: 'time',
        align:"center",
       
    }, {
        title: "公开团体赛",
        dataIndex: 'gameteam',
        align:"center",
        render: (text, row) => {
            return (
                <Link to="/details/grade/graresult">{text}</Link>
            )
        }
    }]
    return (
        <div style={{ width:'700px',margin:"0 auto"}}>
            <Table
            columns={columns}
            dataSource={gradeData}
            bordered={true}
            />
        </div>
    )
}

export default GradeList;