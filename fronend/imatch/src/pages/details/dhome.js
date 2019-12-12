
import React, { Component } from 'react';
import ListDecorator from '../../component/ListDecorator';
import { Button } from 'antd';
import { Link } from 'dva/router';
import odoo from '@/odoo-rpc/odoo';

class TeamList extends Component {
  state = {
    teamData: [],
  }
  // getTeam
  getTeam = async () => {
    const { location: { state: { gameData } } } = this.props;
    const Team = odoo.env('og.team');
    const partner_id = localStorage.getItem('patId');
    const TeamPlayer = odoo.env('og.team.player');
    const teamplayer = await TeamPlayer.search([['partner_id', '=', parseInt(partner_id)]]);
    const teamplayer_id = teamplayer.look({ id: null }).length > 0 ? teamplayer.look({ id: null })[0].id : null;
    const team = await Team.search([['game_id', '=', parseInt(gameData.id)], ['player_ids', 'in', parseInt(teamplayer_id)]]);
    const teamData = team.look();
    this.setState({
      teamData: teamData,
    })
  }

  componentDidMount() {
    this.getTeam();
  }



  render() {
    const { location: { state: { gameData } } } = this.props;
    const { teamData } = this.state;
    console.log('----- teamData -----',gameData);
    const uid = localStorage.getItem('uid');
    return (
      <div>
        <ListDecorator
          detailData={gameData}
          // announcement={announcement}
        />
        {teamData.length > 0 || parseInt(uid) === 1 ? '' :
          <Link to={{ pathname: `/details/join`, state: { gameData: gameData } }}>
            <Button style={{ margin: 10 }} type='primary'>点击报名</Button>
          </Link>
        }
      </div>
    );
  }

}

export default TeamList