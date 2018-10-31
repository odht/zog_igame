import React,{Component} from 'react';
import TeamList from'./index';
import * as index from './index';
const {TeamData}= index;
class Clock extends Component{
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
export default Clock
