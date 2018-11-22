import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import settings from '../game/settings';
import Card from './Card'
import Models from '../models/model'

/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 */
class Table extends Component {
    constructor(props) {
        /**
         * 重构参考： 打牌的几个阶段，应该在规则里面，调入进来。
         * 属性列表：
         *  scene: 1 叫牌，2 打牌 3 claim 4 展示比分
         *         1 
         *  deals: 牌，除了自己的牌，其他人的牌应该不显示
         *  seat：ESWN 自己做在那个方位。
         */

        super(props);
        this.deals = 'XXXXXXXXXXXXX QJ98.A5.J853.QT4 XXXXXXXXXXXXX XXXXXXXXXXXXX'
        this.cards = this.initDeals() // 把以上牌初始化放到桌子上(不发牌)
        this.seat = 'S'               // 用户坐在 南
        this.width = window.screen.width;
        this.height = window.screen.height;
        console.log('width:' + this.width)
        console.log('height:' + this.height)
        if (this.width < 400) settings.scale = 0.5;
    }
    /**
     * 初始化扑克：把牌放到桌子上等待发牌。
     * TODO: 
     */
    initDeals() {
        const suits = ['S', 'H', 'D', 'C'];
        const deals = this.deals.split(' ')
        const cards = []
        // 遍历4个方向的牌
        let rotate = 0;
        let x = 5 , y = 5;

        deals.forEach((item, index1) => {
            cards[index1] = []              // index1 四个方位
            const suit = item.split('.')
            // 遍历 每个花色
            x = y = 5; // 初始化位置
            // 横向的牌 做一下调整位置。因为
            if ('02'.indexOf(index1) != -1) { 
                x = 16;
                y = -10;
            }
            rotate += 90;
            suit.forEach((s, index2) => {      // index2 四个花色
                cards[index1][index2] = [];
                //console.log(s,index)
                for (var i = 0; i < s.length; i++) {
                    cards[index1][index2][i] = (
                        <Card
                            size='80'
                            card={s[i] + suits[index2]}
                            rotate={rotate}
                            position={{ x: x, y: y }}
                        />
                    )
                    //x = x + 20; // x 坐标 位移15像素
                }
            });
        });
        return cards;
    }
    /**
     * 发牌
     * deals 四个人的牌
     */
    deal(deals) {

    }
    /**
     * 把特定的牌挂载到特定的位置上。
     */
    componentDidMount() {
        const mountEast = document.querySelector('#east')
        const mountSouth = document.querySelector('#south')
        const mountWest = document.querySelector('#west')
        const mountNorth = document.querySelector('#north')
        ReactDOM.render(this.cards[0], mountEast);
        ReactDOM.render(this.cards[1], mountSouth);
        ReactDOM.render(this.cards[2], mountWest);
        ReactDOM.render(this.cards[3], mountNorth);
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
                backgroundColor: '#880000'
            },
            south: {
                position: 'absolute',
                bottom: '0px',
                width: this.width,
                height: '90px',
                backgroundColor: '#008800'
            },
            west: {
                position: 'absolute',
                top: '90px',
                width: '90px',
                height: this.width - 180,
                backgroundColor: '#880000'
            },
            north: {
                position: 'absolute',
                top: '0',
                width: this.width,
                height: '90px',
                backgroundColor: '#008800'
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
                border: '1px solid red'
            }

        }
        //const deals = this.props.deals;
        const deals = Models.deals()[0];
        console.log(deals);
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
                        <div id='east' style={css.east}>east</div>
                        <div id='west' style={css.west}>west</div>
                        <div id='south' style={css.south}>south</div>
                        <div id='north' style={css.north}>north</div>
                        <div id='board' style={css.board}>
                        </div>
                    </div>
                    <button onClick={this.deal}>发牌</button>
                    <div id='footer' style={css.footer}>footer</div>
                </div>
            </div>
        );
    }
}

//export default Table
export default Table