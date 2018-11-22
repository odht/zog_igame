/**
 * todo： 仔细考虑下 TableModel 的设计。静态属性的问题。
 * import { TableModel } from '../models/Table';
 * import TableModels from '../models/Table';
 */


import React, { Component } from 'react';
import Models from '../../models/model'
import { TableModel } from '../../models/Table';
import TableModels from '../../models/Table';
import Card from '../../game/Card';



/**
 * props.o  
 * 就是 调用 Debug 组件的父组件 Table
 * 我们为了测试 Table 把 Table 传递进来，然后进行测试。
 * 
 * 注意在 render 定义方法，可能造成重复定义的问题。以为是测试用例，暂且这样
 */
export default class Debug extends Component {
    render() {
        const o = this.props.o;

        /**
         * 从上级组件 传递古来 Table 实例。
         * 然后给 Table 实例添加了一些测试用例。
         * 如果不添加本 测试代码。这些方法就不会加载给 Table
         */
        // =====  测试用例开始 =================================================
        o.testClock = function () {
            this.timing('east', 2,
                () => this.timing('south', 2,
                    () => this.timing('west', 2,
                        () => this.timing('north', 2,
                            () => console.log('倒计时结束！')
                        )
                    )
                )
            )
        }
        /**
         * 测试出牌
         * 简单测试，已无实际用途。
         */
        o.test1 = function () {
            const cards = this.state.cards;
            cards[0][0].animation = {
                top: 200,
                left: 200,
            }
            this.setState({
                cards: cards
            })
        }
        o.testActive = function () {
            // 52 张牌 对应 东南西北 四个人的牌
            const nums = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, //17, 18, 19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
                39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
            //const nums = [13,14,15,16];
            this.setActive(nums);

        }
        o.test3 = function () {
            this.clearBoard();
        }
        /**
         * 打开明手的牌。
         * 从 Models 获得数据。
         * 修改 seat 方位可以打开不同方位的牌。
         */
        o.testDummy = function (seat1) {
            const seat = seat1;
            let index = 0
            const dCards = Models.openDummy().cards.split('.');
            let cards = this.state.cards[TableModel.seats.indexOf(seat)];
            dCards.forEach((item1, index1) => {
                item1.split('').forEach((item2, index2) => {
                    // 这里。
                    cards[index].card = item2 + Card.suits[index1]
                    cards[index].onclick = this.play(cards[index]);
                    index++;
                })
            })
            //this.state.cards[Table.seats.indexOf(seat)] = cards;
            this.setState({
                cards: this.state.cards
            })
            console.log('openDummy..............')
            console.log(this.state.cards)

        }
        /**
     * 测试上以墩牌的显示
     */
        o.testLastTrick = function () {
            this.lastTrick(false);
            // if(this._showLastTrick) this._showLastTrick = false;
            // else this._showLastTrick = true;
            // this.lastTrick(this._showLastTrick);
        }
        /**
       * 叫牌测试
       */
        o.testBid1 = function () {
            const bids = [{ seat: 'west', bid: 'A1C' }, { seat: 'north', bid: 'PASS' },
            { seat: 'east', bid: 'PASS' }, { seat: 'south', bid: '2H' },
            { seat: 'west', bid: 'PASS' }, { seat: 'north', bid: 'PASS' },
            { seat: 'east', bid: 'A3C' }, { seat: 'south', bid: 'PASS' },
            { seat: 'west', bid: 'PASS' }, { seat: 'north', bid: '3H' },
            { seat: 'east', bid: 'PASS' }, { seat: 'south', bid: 'PASS' },
            { seat: 'west', bid: 'A3S' }, { seat: 'north', bid: 'PASS' },
            { seat: 'east', bid: 'PASS' }, { seat: 'south', bid: 'PASS' }]
            bids.forEach((item) => {
                TableModels.call(item.seat, item.bid)
            })
            console.log('calldata111....')
            //console.log(this.state.calldata)
            o.setState({
                calldata: TableModels.state.calldata
            })
        }

        o.testUsersReady = function () {
            const login = (seat, uname) => {
                this.state.user[seat].name = uname;
                this.setState({ user: this.state.user })
            }
            setTimeout(login.bind(this, 'east', '张三丰'), 1000)
            setTimeout(login.bind(this, 'south', '李四'), 2000)
            setTimeout(login.bind(this, 'west', '王五'), 3000)
            setTimeout(login.bind(this, 'north', '赵六'), 4000)
        }

        o.testChat = function () {
            const elMsg = document.querySelector('#message')
            const elSay = document.querySelector('#say')
            elMsg.innerHTML =
                "<div>" + TableModel.myseat + ':' + elSay.value + "</div>" + elMsg.innerHTML
        }

        // =====  测试用例结束 =================================================

        return (
            <div className='debug' style={{ position: 'absolute' }}>
                <button onClick={o.testUsersReady}>登录</button>
                <button onClick={o.deal}>发牌</button>
                <button onClick={o.test1.bind(o)}>出牌</button>
                <button onClick={o.testActive.bind(o)}>阻止出牌</button>
                <button onClick={o.test3.bind(o)}>清理桌面</button>
                <br />
                <button onClick={o.testDummy.bind(o, 'east')}>明手东</button>
                <button onClick={o.testDummy.bind(o, 'west')}>明手西</button>
                <button onClick={o.testDummy.bind(o, 'north')}>明手北</button>
                <br />
                <button onClick={o.bid.bind(o)}>显示叫牌</button>
                <button onClick={o.testBid1.bind()}>叫牌</button>
                <button onClick={o.testClock.bind(o)}>倒计时</button>
                <button onClick={o.testLastTrick.bind(o)}>上一墩牌</button>
                <br />
                <button onClick={o.showResult}>显示结果</button>
            </div>
        )
    }
}