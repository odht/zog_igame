import React, { Component } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
export const TeamData = [
  {
    key: 1,
    name: '中国桥牌协会',
    age: '中国桥牌协会',
    time: '2018-9-1',
    tags: '全国',
    ps: '金分'
  },
  {
    key: 2,
    name: '河北省桥牌赛',
    age: '河北省桥牌协会',
    time: '2018-10-10',
    tags: '地方',
    ps: '金分'
  },
  {
    key: 3,
    name: '河南省桥牌协会',
    age: '石家庄分会场',
    time: '2018-11-1',
    tags: '地方',
    ps: '金分'
  },
  {
    key: 4,
    name: '上海桥牌协会',
    age: '中国桥牌协会',
    time: '2018-9-10',
    tags: '地方',
    ps: '金分'
  },
  {
    key: 5,
    name: '石家庄桥牌协会',
    age: '石家庄桥牌协会',
    time: '2018-10-10',
    tags: '会场',
    ps: '金分'
  },
  {
    key: 6,
    name: '郑州桥牌协会',
    age: '石家庄分会场',
    time: '2018-11-10',
    tags: '会场',
    ps: '金分'
  },]



const columns = [
  {
    title: '俱乐部名称',
    dataIndex: 'name',
    width: 150,
    render: text => (<Link to='/details/dhome' target="_black">{text}</Link>)
  },
  {
    title: '主席',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: '成立时间',
    dataIndex: 'time',
    width: 150,
  }, {
    title: '类型',
    dataIndex: 'tags',
    width: 150,
  }, {
    title: '备注',
    dataIndex: 'ps',
    width: 150,
  },]



class TeamList extends Component {
  render() {
    return (
      <div >
        <h1><Table
          columns={columns}
          dataSource={TeamData}
          pagination={{ pageSize: 5 }}
          scroll={{ y: 300 }} /></h1>


      </div>)
  }
}
export default TeamList