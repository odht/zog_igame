import React from 'react';
import Debug from './Debug'
import Claim from './Claim'
import BidPanel from './BidPanel'
//import Table from '../../game/Table'
import { Imps, Seats, Tricks } from './Headers'
import Prepare from './Prepare'
//import UserTag from './UserTag'
import './MobileTableView.css'
/**
 * 用来模拟 table 对象保证 tableview 组件可独立测试。
  */
const _tableObj = {
  cards: [],
  state: {
    scene: 0,
    calldata: [['1C', '2C', 'PASS', 'PASS'], ['3H', 'PASS', 'PASS', '4NT'], ['PASS', 'PASS', 'PASS', '']],
    user: {
      east: { ready: 0, name: '张三', face: '/imgs/face1.png', rank: '大师' },
      south: { ready: 0, name: '李四', face: '/imgs/face2.png', rank: '专家' },
      west: { ready: 0, name: '王五', face: '/imgs/face1.png', rank: '王者' },
      north: { ready: 0, name: '赵六', face: '/imgs/face2.png', rank: '钻石' }
    },
  },
  ref: { east: null, south: null, west: null, north: null },
  openDebug: e => null,
  debug: e => null,
  lastTrick: e => null,
  timer: { stop: e => null, start: e => null },
  claim: e => null,
  bid: e => null,
}

/**
 * TableView 的用途
 * 增加 TableView 的目的是 把 牌桌的排版进行单独设置。增加view1,2,3
 * 本代码原本是在 Table 的 render 里写的。
 * 完整 copy 到这里，然后替换 this 为 this.props.table 进行简单的替换完成。
 */
const MobileTableView = (props) => {
  // 只要 table 和 cards 传入即可。
  const table = props.table;
  const mwidth = window.innerWidth;
  console.log('thissss:',this);
  table.css = {  // 参考 PCTableView 去掉 table.css
    table: {
        width: mwidth,
        height: this.height,
        fontSize: mwidth * 0.04 + 'px'
    },
    panel: {
        top: mwidth * 0.32,
        left: mwidth * 0.2,
        width: mwidth * 0.6,
        height: mwidth * 0.6
    },
    header: {
        width: mwidth,
        height: mwidth * 0.2,
    },
    body: {
        width: mwidth,
        height: mwidth,
        fontSize: mwidth * 0.04 + 'px'
    },
    footer: {
        width: mwidth,
        height: '40px',
    },
    east: {
        top: mwidth * 0.2,
        width: mwidth * 0.2,
        height: mwidth * 0.6,
    },
    south: {
        width: mwidth,
        height: mwidth * 0.2,
    },
    west: {
        top: mwidth * 0.2,
        width: mwidth * 0.2,
        height: mwidth * 0.6,
    },
    north: {
        width: mwidth,
        height: mwidth * 0.2,
    },
    re: {
        width: mwidth * 0.19,
        height: mwidth * 0.19,
    },
    board: {
        width: mwidth * 0.6,
        height: mwidth * 0.6,
        top: mwidth * 0.2,
        left: mwidth * 0.2,
    },
    result: {
        width: mwidth * 0.6,
        height: mwidth * 0.2,
        top: mwidth * 0.6,
        left: mwidth * 0.2,
        zIndex: 1000,
        textAlign: 'center',
        fontSize: mwidth * 0.06 + 'px',
    }
  }

  const cards = table.cards;
  console.log('table1:',table);
  const stat = Object.values(table.state.user).map(e => e.ready)
  return (
    <div>
      {(table.state.scene == 1) ?
        <div className='panel' style={table.css.panel}>
          <BidPanel calldata={table.state.calldata} />
        </div> : null
      }
      <div id='table' className='table' style={table.css.table}>
        <div id='header' className='header' style={table.css.header}>
          <div className='re' style={table.css.re}><Imps /></div>
          <div onClick={table.openDebug} className='re' style={table.css.re}><Seats /></div>
          <div onClick={table.testLastTrick} className='re' style={table.css.re}><Tricks /></div>
          <button onTouchEnd={table.claim} className="claimbtn">摊牌</button>
          {/* <div className='re' id='lastTrick' style={table.css.re}>上墩牌</div>*/}
          {/* 注意比赛结果会挂载到下面的div */}
          <div id='result' style={table.css.re}></div>
          <div id='sound'></div>
        </div>
        <div id='body' className='body' style={table.css.body}>
          {table.state.lastTrick ? <div id='lastTrick' className='lastTrick'></div> : null}
          {table.state.scene == 3 ? <Claim number='8' myclaim={table.claimseat == table.myseat} onSubmit={table.handleClaim} /> : null}
          <div id='clock'></div>
          <div id='east' className='east' style={table.css.east} ref={table.ref.east}></div>
          <div id='west' className='west' style={table.css.west} ref={table.ref.west}></div>
          <div id='south' className='south' style={table.css.south} ref={table.ref.south}></div>
          <div id='north' className='north' style={table.css.north} ref={table.ref.north}></div>
          <div id='board' className='board' style={table.css.board} ref={table.ref.board}>
            <div className='userTag'><div className='seat'>
              {/* <UserTag user={table.state.user['east']} table={table} /> */}
              {/* {Table.seatscn[Table.seats.indexOf(table._shift('east'))]}:
              {table.state.user[table._shift('east')].name} */}
              </div></div>
            <div className='userTag'><div className='seat'>
              {/* <UserTag user={table.state.user['south']} table={table} /> */}
              {/* {Table.seatscn[Table.seats.indexOf(table._shift('south'))]}:
              {table.state.user[table._shift('south')].name} */}
              </div></div>
            <div className='userTag'><div className='seat'>
              {/* <UserTag user={table.state.user['west']} table={table} /> */}
              {/* {Table.seatscn[Table.seats.indexOf(table._shift('west'))]}:
              {table.state.user[table._shift('west')].name} */}
              </div></div>
            <div className='userTag'><div className='seat'>
              {/* <UserTag user={table.state.user['north']} table={table} /> */}
              {/* {Table.seatscn[Table.seats.indexOf(table._shift('north'))]}:
              {table.state.user[table._shift('north')].name} */}
              </div></div>
            {table.state.scene == 0 ? <Prepare stat={stat} ready={table.handleReady} /> : null}
          </div>
          {cards}
        </div>
        {table.state.debug ? <Debug o={table} /> : null}
        <div id='message' className='message'></div>
        <div id='footer' className='footer' style={table.css.footer}>
          <input id='say' type='text' defaultValue='请输入……' />
          <input type='button' value='发送' onClick={table.testChat} />
        </div>
      </div>
    </div >
  );
}

export default MobileTableView;