import React, { Component } from 'react';
import { connect } from 'dva';

 @connect(({ ogGame, odooData }) => ({ ogGame, odooData }))
 class AddTeam extends Component {
    createAdd = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "ogGame/create",
            payload: {
                vals: { name: "2018河北市赛1111" }
            }
        })
    }
    UnlikTeam = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "ogGame/unlink",
            payload: {
                id:3
            }
        })
    }
    ReadTeam = () => {
        const { dispatch } = this.props;
        dispatch({
            type:"ogGame/read",
            payload:{id:3}
        })
    }
    SearchTeam  = () =>{
        const {dispatch} =this.props;
        dispatch({
            type:'ogGame/search',
            payload:{}
        })
    }
    WriteTeam = () =>{
        const {dispatch} =this.props;
        dispatch({
            type:'ogGame/write',
            payload:{id:2,vals:{name:"xxxxxx"}}
        })
    }
    render() {
        console.log(this.props.odooData)
        return (
            <div>
                <button onClick={this.createAdd}>添加队伍</button>
                <button onClick={this.ReadTeam}>读取数据</button>
                <button onClick={this.SearchTeam}>条件查询</button>
                <button onClick={this.UnlikTeam}>删除队伍</button>
                <button onClick={this.WriteTeam}>修改队伍</button>
                <button onClick={this.WriteTeam}>修改队伍</button>
            </div>
        )
    }
} 