import React from 'react';

export default (props)=>{
    return (
        <div style={{height:'100%',backgroundColor:'#f3f3f3',paddingTop:'100px'}}>
            <div style={{textAlign:'center',color: '#999',fontSize:'16px',marginBottom:'30px'}}>欢迎来到石家庄桥牌协会</div>
            {props.children}
        </div>
    )
}