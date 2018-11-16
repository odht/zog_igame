/**
 * 重点测试内容：
 * 
 *  test1 验证了：即使我们 实例化了 两个 Card 但如果参数变化不大仍然可以出发动画。好局部刷新。
 *  key 非常重要。是一个key 才会是一个连续的动画。 才会局部刷新
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import settings from '../game/settings';
import Card from '../game/Card'

class TestRender extends Component {
    state = {
        card: []
    }
    constructor(props){
        super(props)
        this.state.card[0] = <Card
            key     ={12}
            seat    ={'east'}   // 这张牌是那个方位的
            table   ={{zindex:2,cards:[]}}
            index   ={2}
            rotate  ={20}
            size    ={80}           // 牌的大小
            card    ={'5D'}
            position={{ x: 110, y:10 }}   // 考虑一个默认位置。
        />

    }
    componentDidMount(){
    }
    test1 = ()=>{
        let card = this.state.card;
        card[0] = <Card
            key     ={12}
            seat    ={'1east'}   // 这张牌是那个方位的
            table   ={{zindex:1,cards:[]}}
            index   ={1}
            rotate  ={-20}
            size    ={80}           // 牌的大小
            card    ={'5D'}
            position={{ x: 110, y:10 }}   // 考虑一个默认位置。
        />
        this.setState({
            card: card
        })
    }
    render(){
        return (
            <div>2222
                2222
                {this.state.card}
                <button onClick={this.test1}>测试1</button>
                <button onClick={this.test2}>测试2</button>
            </div>
        )
        
    }
}

export default TestRender;