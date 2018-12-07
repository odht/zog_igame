/**
 * Card.2.js  Table.2.js  是 已经完成的 发牌出牌。
 * 但是 组件的结构 考虑进行改进。比如 card 写成纯 Ui 组件。
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import settings from '../game/settings';
import Card from './Card'
import Models from '../models/model'

/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 */
class Table extends Component {
    state = {
        cards: null // 考虑这里不用 cards 只用必要的数字
    }
    /**
     * 重构参考： 打牌的几个阶段，应该在规则里面，调入进来。
     * 属性列表：
     *  scene: 1 叫牌，2 打牌 3 claim 4 展示比分
     *         1 
     *  deals: 牌，除了自己的牌，其他人的牌应该不显示
     *  seat：ESWN 自己做在那个方位。
     *  csize: 牌的大小 手机 80像素比较合适。
     */
    constructor(props) {

        super(props);
        this.cards = [];
        this.zindex = 10;
        this.width = window.screen.width;
        this.height = window.screen.height;
        this.center = null; // 桌子的中心 {x,y}
        this._csize = null; // 牌的大小
        this.deals = 'XXXXXXXXXXXXX QJ98.A5.J853.QT4 XXXXXXXXXXXXX XXXXXXXXXXXXX'
        this.deals = Models.deals()[0];
        this.myseat = 'S'               // 用户坐在 南
        this.seat = {
            'east': [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // seat 用于记录坐标 
            'south': [{ x: 0, y: 0 }, { x: 0, y: 0 }], // 第一个xy 是 四个区域左上角坐标
            'west': [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // 第二个xy 是 出牌4个区域坐标。
            'north': [{ x: 0, y: 0 }, { x: 0, y: 0 }]   // 也就是牌出到什么地方。
        }
        // ref 用来记录 四个发牌位置的div引用
        this.ref = {};
        for (let key in this.seat) this.ref[key] = React.createRef()
        this.ref.board = React.createRef();
        //this.state.cards = this.initDeals() // 把以上牌初始化放到桌子上(不发牌)
        this.state.cards = this.initCards() // 把以上牌初始化放到桌子上(不发牌)
    }
    /**
     * 通过计算获得 Card 的 size
     */
    get csize() {
        // 短路语法 牌的大小 可以计算在下面的函数内。
        return this._csize || (() => {
            return 80;
        })()
    }
    /**
     * 完成挂载后，要计算 各个位置的坐标。
     */
    componentDidMount() {
        this._initSeat(); // 初始化 发牌位置 出牌位置等坐标
        //console.log(parseInt(center.y) - parseInt(this.csize) * 0.7 / 2)
    }
    /**
    * _initSeat 初始化 发牌位置 出牌位置的坐标。 
    * center   桌子的中心
    *          以body 为父元素计算。
    * offset   是四张牌叠放需要错开的空间。（长 - 宽）/ 2
    * this.seat[key][0] 四个座位发牌坐标xy
    * this.seat[key][1] 四个作为出牌坐标xy
    *          出牌坐标计算依据：1）扑克牌的中心点和左上角位置差固定。
    *          因此可以以中心点考虑四个方位的位移 再加减相同的 位置差即可。
    *          注：0.7 是扑克的横竖比例。
    */
    _initSeat() {
        const center = { x: 0, y: 0 };
        center.x = this.ref.board.current.offsetTop +
            parseInt(this.ref.board.current.style.height.slice(0, -2)) / 2
        center.y = this.ref.board.current.offsetLeft +
            parseInt(this.ref.board.current.style.width.slice(0, -2)) / 2
        this.center = center;
        const offset = (this.csize - this.csize * 0.7) / 2;
        // 获得 四个方位的发牌空间左上角坐标, 以及出牌空间左上角 
        for (let key in this.seat) {
            this.seat[key][0]['y'] = this.ref[key].current.offsetTop;
            this.seat[key][0]['x'] = this.ref[key].current.offsetLeft;

            if (key == 'east') {
                this.seat[key][1]['y'] = center.y - this.csize / 2;
                this.seat[key][1]['x'] = center.x + offset - this.csize * 0.7 / 2;
            } else if (key == 'south') {
                this.seat[key][1]['y'] = center.y + offset - this.csize / 2;
                this.seat[key][1]['x'] = center.x - this.csize * 0.7 / 2;
            } else if (key == 'west') {
                this.seat[key][1]['y'] = center.y - this.csize / 2;
                this.seat[key][1]['x'] = center.x - offset - this.csize * 0.7 / 2;
            } else {
                this.seat[key][1]['y'] = center.y - offset - this.csize / 2;
                this.seat[key][1]['x'] = center.x - this.csize * 0.7 / 2;
            }
        }
    }

    /**
     * initCards 从 this.deals 初始化成 Cards 组件为渲染输出做准备，返回到 this.cards
     */
    initCards() {
        const suits = Card.suits                //['S', 'H', 'D', 'C'];
        const deals = this.deals.split(' ')
        let index = 0;               // 复位index 可以让四个人的牌同时发出来
        const cards = [[], [], [], []];            // 初始化二维数组 保存四个方位的牌
        //deals. [XXXXXXXXXXXXX,QJ98.A5.J853.QT4,XXXXXXXXXXXXX,XXXXXXXXXXXXX]
        deals.forEach((item, index1) => {
            // TODO：index 和缓动参数进行分离
            const suit = item.split('.')
            suit.forEach((s, index2) => {      // index2 四个花色  s 'QJ98' 牌点字串
                cards[index1][index2] = [];
                for (var i = 0; i < s.length; i++) {
                    cards[index1][index2][i] = (
                        <Card
                            key={index}
                            seat={Table.seats[index1]}   // 这张牌是那个方位的
                            table={this}
                            index={index++}
                            rotate={0}
                            size={this.csize}           // 牌的大小
                            card={s[i] + suits[index2]}
                            position={{ x: 180, y: 450 }}   // 考虑一个默认位置。
                        />
                    )
                }
            });
        });
        return cards;
    }
    // 如果还是原来的 引用地址 则不变化？
    dealCards() {
        // 下面这样写 应为 cards 值 也就是内存地址不变，因此造成不刷新。
        //const cards = this.state.cards || this.initCards();
        const cards = this.initCards();
        cards.forEach((item, index) => {
            let rotate = 0;
            let seat = Table.seats[index]
            let [x, y] = [this.seat[seat][0].x, this.seat[seat][0].y]
            if ('02'.indexOf(index) != -1) {
                x = x + 16; y = y - 10; rotate = 90;
            } else {
                x = x + 5; y = y + 5;
            }
            item.forEach((item1, index1) => {
                item1.forEach((card, index2) => {
                    cards[index][index1][index2] = <Card
                        key = {card.key}
                        seat = {Table.seats[index]}
                        table = {this}
                        index={card.key}
                        rotate={rotate}
                        size = {this.csize}
                        card = {card.props.card}
                        position={{x:x,y:y}}
                    />
                    if ('02'.indexOf(index) != -1) y = y + 10;
                    else x = x + 20;                    
                });
            });

        })
        return cards;
    }
    test1 = () => {
        alert(33)
        console.log(this.cards)

    }
    deal = () => {
        //const cards = this.initDeals1()
        const cards = this.dealCards()

        console.log('cards....cards1..............')
        console.log(cards)
        // console.log('cards....cards1..............')
        // console.log(cards1)
        // console.log(cards == cards1 || "不等")

        this.setState({
            cards: cards
        });
    }
    render() {
        const css = {
            table: {
                position: 'relative',
                width: this.width,
                height: this.height,
            },
            header: {
                width: this.width,
                height: '90px',
                backgroundColor: '#552211'
            },
            body: {
                position: 'relative',
                width: this.width,
                height: this.width,
                backgroundImage: 'url(/imgs/bg1.png)',
                backgroundSize: '100% 100%',

                //backgroundColor:'#552211'
            },
            footer: {
                position: 'absolute',
                bottom: '0',
                width: this.width,
                height: '40px',
                backgroundColor: '#552211'
            },
            east: {
                position: 'absolute',
                right: '0',
                top: '90px',
                width: '90px',
                height: this.width - 180,
                //backgroundColor: '#880000'
            },
            south: {
                position: 'absolute',
                bottom: '0px',
                width: this.width,
                height: '90px',
                //backgroundColor: '#008800'
            },
            west: {
                position: 'absolute',
                top: '90px',
                width: '90px',
                height: this.width - 180,
                //backgroundColor: '#880000'
            },
            north: {
                position: 'absolute',
                top: '0',
                width: this.width,
                height: '90px',
                //backgroundColor: '#008800'
            },
            re: {
                width: '86px',
                height: '86px',
                backgroundColor: '#ee88ee',
                float: 'left',
                margin: '2px'
            },
            board: {
                position: 'absolute',
                width: this.width - 180 - 2,
                height: this.width - 180 - 2,
                top: '90px',
                left: '90px',
                border: '1px solid #6666aa'
            }

        }
        //const deals = this.props.deals;
        //const deals = Models.deals()[0];
        //console.log(deals);
        //const cards = <Card size='80' card='KS' rotate='0' position={{x:0,y:550}} />
        return (
            /**
             * 设计分析：
             * 桌面布局写在一起，他们是固定不变的。
             * 而所有的card 不要到 布局的子元素里。这样看起来好像父子关系明确。
             * 但实际上：桌子 和 牌在不同的 zIndex 上。因此应该分开来写更加清晰。
             * 牌本身定位 不一定在桌子上，因此应该增加 最外层div
             * 
             * 定位：需要参考 布局的位置。可以取到布局的坐标。然后进行定位。
             *      注意父子组件的 position 设置。
             * 
             * <Card size='80' card='3S' rotate='0' position={{x:0,y:550}} />
             *      size        高度，宽=高×0.7
             *      card        具体那张牌 小写字母代表反面
             *      rotate      横向还是纵向摆放 0 纵向 90 横向
             *      position    定位，以父元素为参考进行绝对定位。
             * 
             */
            <div>
                <div id='table' style={css.table}>
                    <div id='header' style={css.header}>
                        <div style={css.re}>分数</div>
                        <div style={css.re}>方位</div>
                        <div style={css.re}>墩数</div>
                    </div>
                    <div id='body' style={css.body}>
                        <div id='east' style={css.east} ref={this.ref.east}>east</div>
                        <div id='west' style={css.west} ref={this.ref.west}>west</div>
                        <div id='south' style={css.south} ref={this.ref.south}>south</div>
                        <div id='north' style={css.north} ref={this.ref.north}>north</div>
                        <div id='board' style={css.board} ref={this.ref.board}>
                        </div>
                        {this.state.cards}
                    </div>

                    <button onClick={this.deal}>发牌</button>
                    <button onClick={this.test1}>测试出牌</button>
                    <div id='test' style={{ position: 'relative' }}>测试区域</div>
                    <div id='footer' style={css.footer}>footer</div>
                </div>
            </div >
        );
    }
}
Table.seats = ['east', 'south', 'west', 'north']
//export default Table
export default Table