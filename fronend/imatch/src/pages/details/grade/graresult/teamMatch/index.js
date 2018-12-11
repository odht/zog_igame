import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { lookup,turnData } from '@/utils/tools'
import odoo from '@/odoo-rpc/odoo';
class TeamMatch extends Component {
  state = {
    TeamRoundInfoData: [],
    loading: true,
  }
  getData = async (ids) => {
    const fieldsTeam = {
      name: null,
      // player_ids: { id: null, name: null },
      round_info_ids: {
        // id: null,
        name: null,
        imp: null,
        imp_opp: null,
        // number: null,
        // phase_ids: { id: null, name: null },
        opp_team_id: { id: null, name: null },
        score: null,
        // score_close: null,
        // score_manual: null,
        // score_uom: null,
        vp: null,
        vp_opp: null,
        // game_id: { id: null, name: null },
        team_id: { id: null, name: null },
        // match_id: { id: null, name: null },
        round_id: { id: null, name: null },
      },
    }
    const id = parseInt(ids,10);
    const Team = odoo.env('og.team');
    const dealData = await Team.read(id,fieldsTeam);
    const dataSource = turnData(dealData.round_info_ids)
    await this.setState({
      TeamRoundInfoData: dataSource,
      loading: false,
    })
  }
  componentDidMount() {
    const {
      location: { query: { team_id } },
    } = this.props;
    this.getData(team_id)
  }
  render() {
    const { TeamRoundInfoData, loading } = this.state;

    const TeamMatchColumns = [
      {
        title: '轮次',
        dataIndex: 'round_id',
        render: (text, record) => {
          return `${record.round_id[1]}`
        }
      }, {
        title: '对阵方',
        dataIndex: 'opp_team_id',
        render: (text, record) => {
          return `${record.opp_team_id[1]}`
        }
      }, {
        title: 'IMPs',
        children: [{
          title: () => {
            if (TeamRoundInfoData.length > 0 && TeamRoundInfoData[0].team_id.length > 0) {
              return TeamRoundInfoData[0].team_id[1]
            } else {
              ''
            }
          },
          dataIndex: 'imp',

        }, {
          title: '对手',
          dataIndex: 'imp_opp',
        }],
      }, {
        title: 'VPs',
        children: [{
          title: () => {
            if (TeamRoundInfoData.length > 0 && TeamRoundInfoData[0].team_id.length > 0) {
              return TeamRoundInfoData[0].team_id[1]
            } else {
              ''
            }
          },
          dataIndex: 'vp',
          render: (text) => {
            return text.toFixed(2);
          }
        }, {
          title: '对手',
          dataIndex: 'vp_opp',
          render: (text) => {
            return text.toFixed(2);
          }
        }],
      }, {
        title: '总分',
        dataIndex: 'score',
        render: (text) => {
          return text.toFixed(2);
        }
      }
    ]
    return (
      <div>
        <Table
          loading={loading}
          rowKey={row => row.id}
          columns={TeamMatchColumns}
          dataSource={TeamRoundInfoData}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '20'],
          }}
        />
      </div>
    )
  }
}
// export default connect(({ odooData, ogTeam }) => ({ odooData, ogTeam }))(TeamMatch);
export default TeamMatch;