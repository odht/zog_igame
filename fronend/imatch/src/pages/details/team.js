import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import './team.css';
import { connect } from 'dva';
import { lookup } from '@/utils/tools'


const columns = [{
  title: '队名',
  dataIndex: 'name',
  key: 'name',
  align: 'center',
  width: 95
}, {
  title: '',
  dataIndex: 'modify',
  key: 'modify',
  align: 'center',
  width: 95,
  render: () => (<a>修改名单</a>)
}];

class Team extends Component {
  state = {
    loading: true,
  }
  componentWillMount() {
    const { location: { state: { gameData: { team_ids } } }, dispatch } = this.props;
    // const Game = lookup(id, this.props.odooData.ogGame)
    // const dataSource = Game.team_ids;
    dispatch({
      type: 'ogTeam/read',
      payload: { id: team_ids }
    }).then(() => {
      this.setState({
        loading: false,
      })
    })
  }
  render() {
    const { location: { state: { gameData: { team_ids } } }, odooData: { ogTeam } } = this.props;
    const { loading } = this.state;
    const dataSource = lookup(team_ids, ogTeam)
    return (
      <div style={{ margin: '0 auto' }}>
        <Table
          loading={loading}
          bordered={true}
          rowKey={row => row.id}
          columns={columns}
          dataSource={dataSource}
          pagination={{
						showQuickJumper: true,
						showSizeChanger: true,
						pageSizeOptions: ['10', '15', '20'],
					}}
        />
      </div>)
  }
}


export default connect(({ odooData }) => ({ odooData }))(Team)
