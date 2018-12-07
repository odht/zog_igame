import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import settings from '../game/settings';
import Card from '../game/Card'
// import Models from '../models/model'

/**
 * 本案例是为了测试 ReactDOM.render 方法对组件的挂载。
 * 注意参考文档。ReactDOM.render 方法可以返回 对组件的引用。
 * TODO：能否实现重新挂载？
 */


class TestMotion extends Component {
    rd = null;
    state = {
        x: 100,
        y: 0
    }
    onclick = () => {
        this.setState({
            x: 200,
            y: 200
        })
        ReactDOM.render(this.cards,document.querySelector('#nbody'))
    }
    componentDidMount(){
        const cards = <Card
            size='80'
            card='5D'
            rotate='0'
            position={{ x: this.state.x, y: this.state.y }}
        />
        this.cards = cards;
        ReactDOM.render(cards,document.querySelector('#mbody'))
    }
    render() {
        console.log('render.')
        return (
            <div>
                <div>{this.state.x},{this.state.y}</div>
                <div id='mbody'></div>
                <button onClick={this.onclick}>变化</button>
                <div id='nbody'></div>
            </div>
        );
    }
}

export default TestMotion;