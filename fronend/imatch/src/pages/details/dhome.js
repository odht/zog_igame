
import React, { Component } from 'react';
import ListDecorator from '../../component/ListDecorator';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { lookup } from '@/utils/tools';
import { connect } from 'dva';
class TeamList extends Component {
  componentWillMount() {
    
  }

 
  render() {
    const { location: { state:{gameData} } } = this.props;
    return (
      <div>
        <ListDecorator
          detailData={gameData}
        />
        <Link to='/details/join'><Button type='primary'>点击报名</Button></Link>
      </div>
    );
  }

}

export default connect(({ login, odooData, ogGame }) => ({ login, odooData, ogGame }))(TeamList)