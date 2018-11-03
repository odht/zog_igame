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
  componentWillMount() {
    const { location: { query: { id } }, dispatch } = this.props;
    dispatch({
      type: 'ogGame/read',
      payload: { id: parseInt(id) }
    }).then(() => {
      const Game = lookup(id, this.props.odooData.ogGame)
      const dataSource = Game.team_ids;
      dispatch({
        type: 'ogTeam/read',
        payload: { id: dataSource }
      })
    })
  }
  render() {
    const {
      odooData: {
        ogTeam, ogGame },
      location: { query: { id } }
    } = this.props;
    const Game = lookup(id, ogGame)
    const dataSource = lookup(Game.team_ids, ogTeam)
    return (
      <div style={{ width: "900px" }}>
        <Table
          bordered={true}
          rowKey={row => row.id}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
          scroll={{ y: 300 }}
        />
      </div>)
  }
}


export default connect(({ odooData, ogTeam, ogGame }) => ({ odooData, ogTeam, ogGame }))(Team)
