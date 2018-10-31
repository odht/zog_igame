import React,{Component} from 'react';
import styles from './data.css';
import { Table } from 'antd';
export const TeamData = [
  {
    key: 1,
    name: '1',
    age: 'VS  北京',
    time: '6：13',
    tags: '6.12：13.88',
  },
  {
    key: 2,
    name: '1',
    age: 'VS  北京',
    time: '6：13',
    tags: '6.12：13.88',
  },
  {
    key: 3,
    name: '1',
    age: 'VS  北京',
    time: '6：13',
    tags: '6.12：13.88',
  },
  {
    key: 4,
    name: '1',
    age: 'VS  北京',
    time: '6：13',
    tags: '6.12：13.88',
  },
  {
    key: 5,
    name: '1',
    age: 'VS  北京',
    time: '6：13',
    tags: '6.12：13.88',
  },
  {
    key: 6,
    name: '1',
    age: 'VS  北京',
    time: '6：13',
    tags: '6.12：13.88',
  },]

const columns = [
  {
    title: '轮次',
    dataIndex: 'name',
    width: 50,
  },
  {
    title: '对阵方',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'IMPs',
    dataIndex: 'time',
    width: 150,
  }, {
    title: 'VPs',
    children: [{
      title: '轮次',
      dataIndex: 'name',
      width: 50,
    },
    {
      title: '对阵方',
      dataIndex: 'age',
      width: 150,
    }]
    //  dataIndex:'tags',
    //  width: 150,
  },]
class TeamList extends Component {
  render() {
    return (
      <div className={styles.normal} >

        <h1><Table
          columns={columns}
          dataSource={TeamData}
          // pagination={{ pageSize: 5 }} 
          scroll={{ y: 300 }}
          size="small"

        />

        </h1>


      </div>)
  }
}


export default TeamList
