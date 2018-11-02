
import React, { Component } from 'react';
// import React from 'react';
import ListDecorator from '../../component/ListDecorator';
import * as detaData from '../../../mock/detail';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { lookup } from '@/utils/tools';
import { connect } from 'dva';
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
    console.log(data);
    const dataSource = lookup(ids, data);
    return dataSource
  }
  render() {
    const dataSource = this.getdata('ogGame')
    const { detailData, announcement } = detaData;

    return (
      <div>
        <ListDecorator
          detailData={detailData}
          announcement={announcement}
        />
        <Link to='/details/join'><Button type='primary'>点击报名</Button></Link>
      </div>
    );
  }
}

export default connect(({ login, odooData, ogGame }) => ({ login, odooData, ogGame }))(TeamList)