import React, { Component } from 'react';
import TeamList from './review';
import * as review from './review';
const { TeamData } = review;
class Clock extends Component {
  render() {
    return (
      <div >
        <TeamList
          TeamData={TeamData}
        />
      </div>
    );

  }
}
export default TeamList
