import React from 'react';
import './UserTag.css'

export default class UserTag extends React.Component{
    render(){
        const user = this.props.user;
        const table = this.props.table;
        const blink = this.props.blink;
        return(
            <div className={blink?"UserTag blink":"UserTag"}>
                <div className='face'>
                    <img src={user.face} />
                </div>
                <div>
                    <div className='uname'>{user.name}</div>
                    <div className='urank'>等级：{user.rank}</div>
                </div>
            </div>
        );
    }
}