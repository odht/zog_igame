import React from 'react';
import './UserTag.css'

export default class UserTag extends React.Component{
    render(){
        const user = this.props.user;
        const table = this.props.table;
        return(
            <div className='UserTag'>
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