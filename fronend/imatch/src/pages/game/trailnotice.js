import { Component } from "react";
import styles from './trailnotice.css';
import TeamList from'./index';
import * as index from './index';
import {connect} from 'dva';
const {TeamData}= index;
@connect(({  odooData,ogGame }) => ({  odooData,ogGame }))
class Trailnotice extends  Component{
  componentDidMount(){
    const {dispatch} =this.props;
    dispatch({
      type:"ogGame/search",
      payload:{}
    })
  }
  render(){
    console.log(this.props.odooData)
    return (
      <div className={styles.normal}>
      <TeamList
         TeamData={TeamData}
        />
    </div>
    )
  }
}

export default  Trailnotice;