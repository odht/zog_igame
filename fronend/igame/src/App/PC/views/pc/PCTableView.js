/**
 * TableView 组件
 *    输入参数：table
 *    输出：加载各个界面元素，显示界面。
 * 
 * Debug 纯视图组件
 */
import React from 'react';
import Debug from './Debug'
import Claim from './Claim'
import BidPanel from './BidPanel'
import Card from '../../game/Card'
import { Imps, Seats, Tricks } from './Headers'
import Prepare from './Prepare'
import UserTag from './UserTag'
import Timer from './Timer'
import './PCTableView.css'


/**
 * 用来模拟 table 对象保证 tableview 组件可独立测试。
  */
const _tableObj = {
  cards:[],
  state:{
    scene:0,
    calldata: [['1C','2C','PASS','PASS'],['3H','PASS','PASS','4NT'],['PASS','PASS','PASS','']],
    user: {
      east: { ready: 0, name: '张三', face: '/imgs/face1.png', rank: '大师' },
      south: { ready: 0, name: '李四', face: '/imgs/face2.png', rank: '专家' },
      west: { ready: 0, name: '王五', face: '/imgs/face1.png', rank: '王者' },
      north: { ready: 0, name: '赵六', face: '/imgs/face2.png', rank: '钻石' }
    },    
  },
  ref:{east:null,south:null,west:null,north:null},
  openDebug:e=>null,
  debug:e=>null,
  lastTrick:e=>null,
  timer:{stop:e=>null,start:e=>null},
  claim:e=>null,
  bid:e=>null,
}

/**
 * TableView 的用途
 * 增加 TableView 的目的是 把 牌桌的排版进行单独设置。增加view1,2,3
 * 本代码原本是在 Table 的 render 里写的。
 * 完整 copy 到这里，然后替换 this 为 props.table 进行简单的替换完成。
 * 
 * 单元测试：
 * 开启：//const table = _tableObj;
 */
const TableView = (props) => {
  /* 这里应该对 props 做处理，提高 view 的独立性。
    换句话说，这里对入口数据进行判断。如果入口数据有错误，照样正常显示view
    比如用模拟数据。
  */

  const table = props.table;

  const cards = table.state.cards.map((item1, index1) => {
    return item1.map((item2, index2) => {
        return <Card
            active={item2.active}
            onClick={item2.onclick}
            key={item2.key}
            index={item2.key}
            seat={item2.seat}
            animation={item2.animation || ''}
            card={item2.card}
            size={item2.size}
            position={item2.position}
            zIndex={item2.zIndex}
            status={item2.status}
        />

    });
});
 
  const stat = Object.values(table.state.user).map(e => e.ready)
 const style = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '10%',
    height:this.width * 0.10,
    zIndex:6,
    color:'red',
    fontSize:'50px'
}
const user = table.state.user;
const userInfo = [user.east,user.west,user.south,user.north];
window._UserInfo=userInfo;
const userTags = [];
 for(var i = 0;i<4;i++){
  userInfo.forEach((item)=>{
    if(item.directionNum === i){
      console.log(item.name)
        var userTag = (<div className='userTag'>
                      <div className='seat'>
                        <UserTag user={item} table={table} />
                      </div>
                    </div>)
        userTags.push(userTag)  
    }
    
  })
 }

  return (
    <div style={{height: '100vh',position: 'relative'}}>
      {(table.state.scene == 1) ?
        <div className='panel'>
          <BidPanel calldata={table.state.calldata} active='1' bidCard={table.state.bidCard}
								bidCall={table.bidCall}/>
        </div> : null
      }
      <div id='table' className='table'>
        <div id='header' className='header'>
          <div className='re imps'><Imps /></div>
          <div className='re seats'><Seats /></div>
          <div onClick={table.lastTrick.bind(table)} className='re tricks'>
            <Tricks 
            contract={table.state.contract}
            declarer={table.state.declarer}
            vertical={table.myseat==='N'||table.myseat==='S'?table.state.ns_win:table.state.ew_win}
            transverse={table.myseat==='N'||table.myseat==='S'?table.state.ew_win:table.state.ns_win}
            />
          </div>
          <div className='re time'>
            <Timer
              name='Timer'
              handle={table.timer}
              time='1:2:5'
              callback={() => console.log('计时结束')}/>
          </div>
          <button onTouchEnd={table.claim} onClick={table.claim} className="claimbtn disable">摊牌</button>
          <button onClick={() => table.timer.stop()} onDoubleClick={() => table.timer.start()} className="calljudge">呼叫裁判</button>
          <button onTouchEnd={table.claim} onClick={table.lastTrick.bind(table)} className="lasttrick">上一墩牌</button>
          {/* <button onTouchEnd={table.claim} onClick={table.bid.bind(table)} className="showbid">显示叫牌</button> */}

          {/* <div className='re' id='lastTrick'>上墩牌</div>*/}
          {/* 注意比赛结果会挂载到下面的div */}
          <div id='result'></div>
          <div id='sound'></div>
        </div>

        <div id='body' className='body'>
          {table.state.lastTrick ? <div id='lastTrick' className='lastTrick'></div> : null}
          {table.state.scene == 3 ? <Claim 
           claimseat={table.state.declarer===table.myseat?0:2}
           isDummy={table.state.dummy===table.myseat}
           claimnum={table.state.claimnum}
           active={table.state.claimingState.indexOf(table.myseat)>-1}
           claiming={table.state.claiming}
           number={table.claimtrick} 
           onSubmit={table.handleClaim} 
           onSubmit1={table.handleClaimMsg}
           cancelClaim={table.cancelClaim}

          /> : null}
          <div id='clock'></div>
          <div id = 'next' style = {style}>{table.state.next}</div>
          <div id='east' className='right' ref={table.ref.east}></div>
          <div id='west' className='left' ref={table.ref.west}></div>
          <div id='south' className='down' ref={table.ref.south}></div>
          <div id='north' className='up' ref={table.ref.north}></div>
          <div id='board' className='board' ref={table.ref.board}>
            {userTags}
            {table.state.scene == 0 ? <Prepare stat={stat} ready={table.handleReady} readyState={table.state.ready} /> : null}
          </div>
          {cards}
        </div>
        {table.state.debug ? <Debug o={table} /> : null}

        <div id='footer' className='footer'>
          <div id='video'></div>
          <div id='userlist'>
            <table>
              <tr>
                <td>队员1</td><td></td><td>等级</td>
              </tr>
              <tr>
                <td>队员2</td><td></td><td>等级</td>
              </tr>
              <tr>
                <td>队员3</td><td></td><td>等级</td>
              </tr>
              <tr>
                <td>队员4</td><td></td><td>等级</td>
              </tr>
            </table>

          </div>
          <div id='message' className='message'>
            <div id='msg'>聊天窗口</div>
            <div>
              <input id='msginput' type='text' defaultValue='请输入……' />
              <input id='msgbtn' type='button' value='发送' onClick={table.testChat} />
            </div>
          </div>
          <div id='advertising'></div>
        </div>
        <div id='ad'></div>
      </div>

    </div >
  );
}

export default TableView;