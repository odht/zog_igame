import React, { Component } from 'react';
import settings from '../game/settings';
import Table from './Table';
//import Bid from '../views/BidPanel'
import Bid from '../views/pc/BidPanel'
import Result from '../../Game/Point/Result'
/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 */

class Game extends Component {
    state={
        scene:0,
        table_id: null,
    }
    constructor(props) {
        /**
         * 属性列表：
         *  屏幕大小
         * 
         */
        super(props);        
        this._initApp();// 屏蔽鼠标右键
        this.width = window.screen.width;
        this.height = window.screen.height;
        console.log('width:' + this.width)
        console.log('height:' + this.height)
        if (this.width < 400) settings.scale = 0.5;
    }

    toResult=(table_id)=>{
        // this.props.setHiddenState(false);
        this.setState({
            scene:1,
            table_id:table_id
        })
    }
    toTable=()=>{
        this.setState({
            scene:0,
        })
    }
    /**
     * 做一些初始化操作，比如屏蔽鼠标右键。
     * 屏蔽下来刷新等。
     */
    _initApp() {
        if (1) return;  // 去掉本行
        window.document.oncontextmenu = function () {
            //alert('请不要点击鼠标右键！');
            return false;
        }
        //plus.device.setWakelock( true );
        document.onkeydown = function (e) { // 屏蔽f5,f12 keycode == 116,123
            e = window.event || e;
            var keycode = e.keyCode || e.which;
            if ([116,123].indexOf(keycode) != -1) {  
                if (window.event) {// ie
                    try { e.keyCode = 0; } catch (e) { }
                    e.returnValue = false;
                } else {// firefox
                    e.preventDefault();
                }
            }
        }

    }
    render() {
        return (
            <div>
                {this.state.scene===0?
                <Table toResult={this.toResult} setHiddenState={this.props.setHiddenState}> 
                    <Bid />
                </Table>
                :null}
                {this.state.scene===1?
                <Result table_id={this.state.table_id} toTable={this.toTable} setHiddenState={this.props.setHiddenState}/>
                :null
                }
            </div>
        );
    }
}

//export default Table
export default Game
