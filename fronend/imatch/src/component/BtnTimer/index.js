import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './index.less';


class BtnTimer extends Component{
    
    state={
        btnTimerTitle:true,
        timeCount: 60,
        btnDisable:false
    }

    // 获取验证码倒计时
    btnTimerHandle = () => {
        this.setState({
            btnTimerTitle:false,
            btnDisable:true
        });
        let timeCount = this.state.timeCount;
        const timer = setInterval(() => { 
            this.setState({ 
                timeCount: --timeCount
            }, 
            () => { 
                if (timeCount === 0) { 
                    clearInterval(timer); 
                    this.setState({ 
                        btnTimerTitle: true, 
                        btnDisable:false,
                        timeCount: 60 
                    }) 
                } 
            }); 
        }, 1000);
    }

    render(){

        return(
            <Button
                onClick={this.btnTimerHandle} 
                style={{ width: '65px', marginLeft: '5px', fontSize: '10px', textAlign:'center' }}
                disabled={this.state.btnDisable}
                size='small'
            >
                {
                    this.state.btnTimerTitle
                    ?
                    <span>获取验证码</span>
                    :
                    <span>{this.state.timeCount}</span>
                }
            </Button>
        )
    }
}


export default BtnTimer;