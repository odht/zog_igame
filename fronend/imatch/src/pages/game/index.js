import React, { Component } from 'react';
import styles from './game.css';
import { connect } from 'dva'
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { lookup } from '@/utils/tools'
const columns = [
  {
    title: '赛事名称',
    dataIndex: 'name',
    width: 150,
    render: text => <Link to='/details/dhome' target="_black">{text}</Link>
  },
  {
    title: '举办方',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: '时间',
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
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ogGame/search',
      payload: {}
    })
  }
  getdata = (model) => {//获取数据
    const { ids } = this.props[model];
    const data = this.props.odooData[model];
    const dataSource = lookup(ids, data);
    return dataSource
  }
  render() {
    const dataSource = this.getdata('ogGame')
    return (
      <div className={styles.normal}>
        <h1><Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
          scroll={{ y: 300 }} /></h1>
      </div>)
  }
}


export default connect(({ login, odooData, ogGame }) => ({ login, odooData, ogGame }))(TeamList)
