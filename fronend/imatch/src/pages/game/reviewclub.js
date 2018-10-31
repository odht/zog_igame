import React from 'react';
import TeamList from'./gameclub';
import * as gameclub from './gameclub';
const {TeamData}= gameclub;
class Clock extends React.Component{
  render(){
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
