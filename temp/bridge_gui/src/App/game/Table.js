/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 * 
 * <TableView table={this} />
 *  把控制器直接给到 view 也就是说控制器的事件处理和 state 都给到了view
 *  event 和 state 就是  view 的输入数据。
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import settings from '../game/settings';
import Card from './Card'
//import BidPanel from './BidPanel'
import Clock from '../views/pc/Clock'
import { Imps, Seats, Tricks } from '../views/pc/Headers'
import Prepare from '../views/pc/Prepare'
//import Claim from './Claim'
//import Debug from './Debug'
//import './Table.css'
import Models from '../models/model'
import Sound from './Sound'
//import PCTableView from '../views/pc/PCTableView' // 包含 TableView.css
import MobileTableView from '../views/mobile/MobileTableView';

import TableModel from '../models/Table';
/**
 * Table 一桌游戏
 *      1 是牌桌的容器组件，或者说是控制器组件(MVC)
 *      2 state       ：数据由 模型计算提供。
 *      3 事件        ：处理函数,主要是触发 setState。
 *      4 通过 context api 把 state 保存起来（暂时没用到）
 *      5 调用 tableview 显示界面。
 * TableModel 是模型组件。
 *      所有数据计算，尤其是 state 的计算，都在这里进行。控制器调用。
 */
class Table extends Component {
    state = TableModel.state; // 从模型获得 state
    /**
     * 重构参考： 打牌的几个阶段，应该在规则里面，调入进来。
     * 属性列表：
     *  scene: 1 叫牌，2 打牌 3 claim 4 展示比分
     *         1 
     *  deals: 牌，除了自己的牌，其他人的牌应该不显示
     *  seat：ESWN 自己做在那个方位。
     *  csize: 牌的大小 手机 80像素比较合适。
     *  board：桌面上打出来的四张牌。用于清理桌面。
     * 
     * 其他：
     * 
     *  字体大小：fontSize:this.height * 0.04 + 'px'
     */
    constructor(props) {

        super(props);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        console.log(this.height * 0.2)
        // this.calldata = [['1C','2C','PASS','PASS'],['3H','PASS','PASS','4NT'],
        //                 ['PASS','PASS','PASS','']]
        // this.board = []; // 桌面上的四张牌
        // this.cards = [];
        this.claimseat = 'east'; // east,south...
        //this.zindex = 10;
        this.timer = { stop: null, start: null }; // 用于控制 倒计时
        this.center = null; // 桌子的中心 {x,y}
        // this._csize = null; // 牌的大小
        this._csize = TableModel.csize;
        this.deals = 'XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX'
        //this.deals = Models.deals()[0];
        //this.myseat = 'west'               // 用户坐在 南
        this.seat = {
            east    : [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // seat 用于记录坐标 
            south   : [{ x: 0, y: 0 }, { x: 0, y: 0 }], // 第一个xy 是 四个区域左上角坐标
            west    : [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // 第二个xy 是 出牌4个区域坐标。
            north   : [{ x: 0, y: 0 }, { x: 0, y: 0 }]   // 也就是牌出到什么地方。
        }
        // ref 用来记录 四个发牌位置的div引用
        this.ref = {};
        Table.seats.forEach(key => this.ref[key] = React.createRef())
        this.ref.board = React.createRef();
        //this.state.cards = this.initDeals() // 把以上牌初始化放到桌子上(不发牌)
        //this.state.cards = this.initCards() // 把以上牌初始化放到桌子上(不发牌)
        this.state.cards = TableModel.state.cards;
        //this.cards = Card.createComponents(this.state.cards);

        // console.log('this.state.cards:',this.state.cards)
    }
    /**
     * 通过计算获得 Card 的 size
     */
    get csize() {
        /*  短路语法 牌的大小 可以计算在下面的函数内。
            可以考虑用 vh 改造，所有计算都按照比例计算。
        */
        return this._csize || (() => {
            return this.height * 0.18;
        })()
    }

    /**
     * 完成挂载后，要计算 各个位置的坐标。
     * _initSeat 初始化 发牌位置 出牌位置等坐标
     */
    componentDidMount() {
        this._initSeat(); // 
        // this._initVideo('table02open');
        //console.log(parseInt(center.y) - parseInt(this.csize) * 0.7 / 2)
    }


    /**
    * 根据dom 定位 初始化 发牌位置 出牌位置 坐标
    * const center 为桌子中心
    * const seats  为四个发牌区域div 左上角坐标
    * 
    * 注意 控制器（本代码）里包含和 dom 打交道的代码。Model 里尽可能都是纯函数
    * 计算结果保存在 TableModel.seat 里面，包含发牌位置，和出牌位置
    * 把两个 dom 定位（xy） 发给模型用于计算。Model 中应该尽可能是纯函数
    * 计算结果保存到 TableModel.seat 里面，包含发牌位置，和出牌位置
    * TableModel.initSeat(center, seats)
    */
    _initSeat() {
        const center = {
            x: this.ref.board.current.offsetTop +
                this.ref.board.current.clientHeight / 2,
            y: this.ref.board.current.offsetLeft +
                this.ref.board.current.clientWidth / 2
        };
        const seats = {
            'east'  : { x: 0, y: 0 }, 'south' : { x: 0, y: 0 },
            'west'  : { x: 0, y: 0 }, 'north' : { x: 0, y: 0 },
        }
        for (let key in seats) {
            seats[key]['y'] = this.ref[key].current.offsetTop;
            seats[key]['x'] = this.ref[key].current.offsetLeft;
        }

        TableModel.initSeat(center, seats)
    }
    /**
     * 清理 出牌区域（4张牌）
     * 调用：
     * 输入：
     * 输出：
     */
    clearBoard = () => {
        TableModel.clearBoard()
        this.setState({
            cards: TableModel.state.cards
        })
        Sound.play('clear')
    }

    /**
     * 打出一张牌
     * @param {card} item
     */
    play = (item) => {
        if (item.active == 2) {
            TableModel.preplay(item);
            this.setState({ cards: TableModel.state.cards });
        } else if (item.active == 3) {
            TableModel.play(item);
            this.setState({ cards: TableModel.state.cards });
            Sound.play('play');
            if (TableModel.board.length == 4) setTimeout(this.clearBoard, 1000)
        } else return;
    }

    /**
     * 触发 claim
     * 考虑增加参数为 seat
     */
    claim = () => {
        this.setState({
            scene: 3
        })
    }
    /**
     * 预留发送 数据接口
     */
    handleClaim = () => {
        console.log('发送　claim 请求。')
        console.log('接收到，同意设置　scene=4,不同意，设置为２')
    }
    /**
     * 用户准备
     * 
     * 接受一个用户编号。考虑修改为座位
     * 
     * 输入：0-3 代表 四个位置
     * 输出：
     *      this.state.user[seat].ready = 1; 某个用户准备好
     *      this.state.scene = 1; 场景切换
     *      this.deal() 发牌
     *      setState 触发渲染
     */
    handleReady = (se) => {
        TableModel.userReady(se);
        if (TableModel.userAllReady()) {
            TableModel.state.scene = 1;
            this.deal(); // 这里也有 setState 但是 它是异步的。只执行一次
        }
        this.setState({
            user: TableModel.state.user,
            scene: TableModel.state.scene
        })
    }
    /**
     * 发牌
     * 调用：
     * 输出：TableModel.dealCards() 返回 cards 的位置和出牌绑定
     */
    deal = () => {
        this.setState({
            cards: TableModel.dealCards(this.play)
        }); // todo：考虑这里修改 动画速度。
        Sound.play('deal')
    }

    /**
     * 设置牌的 active 状态。
     * 把编号 在nums里 的牌设置成 active 状态
     * nums 是一个数组
     * active 是目标状态。*      
     * active     0,1,2,3  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
     */
    setActive = (nums, active = 0) => {
        this.setState({
            cards: TableModel.setActive(nums, active)
        })
    }
    /**
     * 给某一个座位倒计时
     * 为了降低组件的耦合性。将本组件动态挂载到 DOM 上。
     * 利用 unmountComponentAtNode 进行卸载。
     * p, offset 都是闹钟出现位置的微调。
     */
    timing = (seat, time, callback) => {
        ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
        const p = this.height * 0.18;
        const offset = {
            east: { x: p, y: 0 },
            south: { x: 0, y: p },
            west: { x: -p * 0.66, y: 0 },
            north: { x: 0, y: -p * 0.66 }
        }

        const top = TableModel.seat[seat][1]['y'] + offset[seat].y;
        const left = TableModel.seat[seat][1]['x'] + offset[seat].x;
        const style = {
            position: 'absolute',
            top: top,
            left: left,
            width: '10%'
        }
        const clock = (
            <div style={style}>
                0.
            </div>
        );
        ReactDOM.render(
            clock,
            document.querySelector('#clock')
        )

    }

    /**
     * 显示比赛结果
     * 输入：Models.getResult(); 从外部获得比赛结果数据
     * 输出：构造 页面样式显示出来。
     */
    showResult = () => {
        const result = Models.getResult();
        const re = <div className='result'>
            <img src='/cards/medal.svg' width="20%" />
            <div style={{ lineHeight: this.height * 0.12 + 'px', }}>{result}</div>
            <button onClick={this.hideResult}>下一局</button>
        </div>;
        ReactDOM.unmountComponentAtNode(document.querySelector('#result'));
        ReactDOM.render(
            re,
            document.querySelector('#result')
        )

    }
    /**
     * 隐藏比赛结果
     */
    hideResult = () => {
        ReactDOM.unmountComponentAtNode(document.querySelector('#result'));
    }
    /**
     * 显示上一墩牌
     * 桌面上始终52张牌，因此要显示上一墩牌，需要调整某些牌的位置。
     * cards: TableModel.lastTrick(show),
     */
    lastTrick = () => {
        const show = !this.state.lastTrick;
        this.setState({
            cards: TableModel.lastTrick(show),
            lastTrick: !this.state.lastTrick
        });
    }
    /**
     * 视频接口
     * @param {*} channel  频道名
     */
    _initVideo(channel) {
        // eslint-disable-next-line
        var api = streamApi();
    }
    /**
     * 是否调试模式
     * {table.state.debug ? <Debug o={table} /> : null}
     */
    openDebug = () => {
        this.setState({
            debug: !this.state.debug
        })
    }
    /**
     * 显示叫牌
     * 根据 场景 scene 决定是否显示叫牌。
     */
    bid = () => {
        this.state.scene != 1 ? 
            this.state.scene = 1 : this.state.scene = 2;
        this.setState({
            scene: this.state.scene
        })
    }
    render() {
        // 考虑这里判断手机，还是pc，可以通过不同路由来判断。不用自适应。
        this.cards = Card.createComponents(this.state.cards);
        return (
            <MobileTableView table={this} />
        );
    }
}
Table.seats = ['east', 'south', 'west', 'north']
Table.seatscn = ['东', '南', '西', '北']

export default Table;