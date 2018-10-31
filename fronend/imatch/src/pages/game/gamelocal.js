import React from 'react';
import TeamList from'./index';
import * as index from './index';
const {TeamData}= index;
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
