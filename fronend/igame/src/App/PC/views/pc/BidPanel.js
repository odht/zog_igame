/**
 * todo： bidBlock, bidCard 应该 重新封装成按钮。然后有尺寸和颜色参数。
 *        考虑本组件复杂度，提高后应该进行 mvc 改造。
 *        或者根据新睿桥牌 改造叫牌过程。
 */

import React, { Component } from 'react';
import Motion from '../../libs/Motion'
import './BidPanel.css'

/**
 * BidPanel 叫牌面板
 * 
 * 输入：只有 props.calldata={table.state.calldata} active='1'
 * 输出：暂时只有 state 的变化。未形成任何输出。
 *      考虑应该 由 handleConfirm 事件，形成“最终叫品”
 */
class BidPanel extends Component {
  state = {
    bidblocks: [],
    bidcards: [],
    active: 1
  }
  constructor(props) {
    super(props)
    this.width = window.screen.width;
    const suits = ['NT', 'S', 'H', 'D', 'C'];
    const rank = [1, 2, 3, 4, 5, 6, 7];
    const bids = rank.map((i) => suits.map((j) => i + j))
    //console.log(bids)
    const bidblocks = bids.map((e, i) => e.map((e1, i1) => {
      //let active = (i<5 && i1<3) ? 1:0;
      return { name: e1, active: 1 }
    }))
    this.state.bidcards = [
        { name: 'PASS', active: 1 }, { name: 'ALERT', active: 1 },
        { name: 'X',    active: 1 }, { name: 'XX',    active: 1 },]
    // console.log('bbb................')
    // console.log(bidblocks)
    this.state.bidblocks = bidblocks;
    this.ref = React.createRef();

  }
  /**
   * 处理 叫牌点击事件。
   * 如果 item 是 row,col 则调用 _bidblock() 否则调用 _bidcard
   */
  handleCall = (item) => {
    this.props.bidCall(item.name);
  }

  /**
   * 处理 pass,alert,x,xx
   * 这4个选项应该只能点击一个。
   */
  _bidcard = (item) => {
    if (!this.state.active) return false;
    // console.log('bidcards.........item...........')
    // console.log(item)
    this.state.bidcards.forEach((e) => {
      if (e.name == item.name) e.active = 0;
      else e.active = 1;
    })
    // console.log(this.state.bidcards)
    this.setState({
      bidcards: this.state.bidcards
    })
  }
  /**
   * 叫牌
   * item 点击的叫品 行列坐标。{row, col}
   * 点击某个叫品，其他叫品要联动（active=0/1）
   */
      componentWillReceiveProps(newProps){
        // console.log(newProps)
        const bidblocks = this.state.bidblocks;
        if(newProps.bidCard){
            bidblocks.map((item1, i1) => item1.map((item2, i2) => {
                if(item2.name===newProps.bidCard){
                    for (let i = 0; i < bidblocks.length; i++) {
                        for (let j = 0; j < bidblocks[i].length; j++) {
                            if (i < i1 ||
                                (i === i1 && j >= i2)) bidblocks[i][j].active = 0;
                        }
                    }
                }
            }))
        }
        this.setState({
            bidblocks: this.state.bidblocks
        })
    }
  /**
   * 确认提交
   * 这里应该 补充 确认后，叫品是什么。比如：this.bid 记录最后叫品。
   */
  handleConfirm = () => {
    const name = this.state.selectedName;
    if(name){
      this.props.bidCall(name);
    }
    this.setState({
      selectedName : ''
    })
  }
  unclickable(){
    return false
  }
  handleSelecte=(item) => {
    console.log(item)
    if(item.active!==0){
      this.setState({
        selectedName : item.name
      })
    }
  }
  render() {
    const name = this.state.selectedName;
    const {clickable}=this.props
    const bidblocks = this.state.bidblocks.map((e1, i1) => e1.map((e2, i2) => {
      
      return <BidBlock key={e2.name} name={e2.name}
        active={e2.active}
        onclick={clickable ? this.handleSelecte.bind(this, {name:e2.name,active:e2.active}):this.unclickable} />
    }))
    console.log(bidblocks)
    const rows = this.props.calldata.map((item, index) => {
      //console.log(item)
      return <tr key={index}>
        <td key='0'>&nbsp;{index + 1}</td>
        {item.map((item1, index1) => {
          if (!item1) return (
            <td key={index + index1 + 1}></td>
          );
          if (item1.slice(0, 1) == 'A') return (
            <td key={index + index1 + 1} className='alertTd'>
              <img className='suit' src={`/cards/bids/${item1.slice(1)}.svg`} />
            </td>
          );
          return (
            <td key={index + index1 + 1}>
              <img className='suit' src={`/cards/bids/${item1.toUpperCase()}.svg`} />
            </td>
          );
        })}
      </tr>
    })
    return (
      <div id='bidpanel' className='bidpanel' ref={this.ref}>
        <div>
          <table>
            <thead>
              <tr>
                <td>&nbsp;</td><td>东</td><td>南</td><td>西</td><td>北</td>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
        {bidblocks}
        <BidCard name='Pass' active={this.state.bidcards[0].active}
          onclick={clickable ? this.handleSelecte.bind(this, { name: 'Pass' }):this.unclickable}
        />
        <BidCard name='ALERT' active={this.state.bidcards[1].active}
          onclick={clickable ?this.handleSelecte.bind(this, { name: 'ALERT' }):this.unclickable}
        />
        <BidCard name='X' active={this.state.bidcards[2].active}
          onclick={clickable ?this.handleSelecte.bind(this, { name: 'x' }):this.unclickable}
        />
        <BidCard name='XX' active={this.state.bidcards[3].active}
          onclick={clickable ?this.handleSelecte.bind(this, { name: 'xx' }):this.unclickable}
        />
        <span style={{float: 'left',width: '13vh',backgroundColor: '#7a88e8',margin: '1%'}}>
          <BidCard name={name} active={1} 
            onclick={()=>{}}
          />
        </span>
        
        <button onClick={this.handleConfirm}>确认</button>
      </div>
    );
  }
}
/**
 * 输入： 
 *    props.name    : 3NT 叫品
 *    props.active  : 0,1 是否可点击
 *    props.onclick : 由父组件做点击处理
 * 输出：
 *    props.onclick : 通过事件 影响 state.bidblocks，state.bidcards
 */
class BidBlock extends Component {
  render() {
    const suit = this.props.name.slice(-1);
    const bgcolor = { T: '#eeeeee', S: '#ddddFF', H: '#FFdddd'
                    , D: '#ffffcc', C: '#ccffcc' };
    const style = {
      backgroundColor: `${bgcolor[suit]}`,
    }
    let animation = {brightness:0};
    if (this.props.active == 0) animation['brightness'] = 0.6
    if (this.props.active == 1) animation['brightness'] = 1

    return (
      <Motion animation={animation} className='bidblock'>
        <div className='cn1' onClick={this.props.onclick} style={style}>
          <img className='suit' src={`/cards/bids/${this.props.name}.svg`} />
        </div>
      </Motion>
    );
  }
}
/**
 * 输入：
 *    props.name    ：PASS,ALERT,X,XX
 *    props.active  ：1 （亮，可点）0 （灰，点中）
 * 输出：
 * 
 * 
 * todo：他应该接收一个 props 函数，接收输出。也就是被点击后的状态。
 *      通过 props 接收也可以，通过 context api 接收也可以。
 */
class BidCard extends Component {
  render() {
    const bgcolor = { Pass: '#88FF88', X: '#FF8888', XX: '#FF3333', ALERT: '#8888FF' };
    const width = { Pass: '13vh', X: '13vh', XX: '13vh', ALERT: '13vh' };
    const style = {
      backgroundColor: `${bgcolor[this.props.name]}`,
      width: `${width[this.props.name]}`,
    }
    let animation = {};
    if (this.props.active == 0)
      animation && (animation['brightness'] = 0.6);
    if (this.props.active == 1) {
      animation && (animation['brightness'] = 1);
    }
    return (
      <Motion animation={animation} className='bidcard'> 
        <div className='cn1' onClick={this.props.onclick} style={style}>
        {this.props.name ? <img className='suit' src={`/cards/bids/${this.props.name}.svg`} />:""}
          
        </div>
      </Motion>
    );
  }
}

export default BidPanel;
