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
import Card from './Card'
import Clock from '../views/pc/Clock'
import { Imps, Seats, Tricks } from '../views/pc/Headers'

import Models from '../models/model'
import Sound from './Sound'
import PCTableView from '../views/pc/PCTableView' // 包含 TableView.css
import  session from '../../User/session'
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

//由当前玩家判断下一个玩家
const NEXTPLAYER = {
    E:'S',
    S:'W',
    W:'N',
    N:'E'
}
class Table extends Component {
   // state = TableModel.state; // 从模型获得 state
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
        /**添加********************************************************************************* */
        this.table_id_list =null;
        this.table_id = null;
        this.board_id_list = null;  //牌号列表
        this.board_id = null;   //当前牌号
        this.channel_id = null;     //公共频道号
        this.my_channel_id =null;   //私有频道号
		this.pollingId = 1;     //消息ID
        this.callResult = 0;    //叫牌时，对'Pass'进行计数，判断是否叫牌结束
        this.dealer = null;     //发牌人
        
        this.dummyCards = null;
        this.dummySeat = null;
        // this.claimnum = 0;      //claim的墩数、方位、庄家剩余的牌
        this.agreeClaim = 0;    //claim时，对防守方是否同意claim计数
        this.claimtrick = 13;    //可claim的数目
        this.playSuit = null;
        this.originData = null; //初始化牌桌时的所有数据
      
        this.lastTrickCard = null    //上墩牌
        this.lastTrickPos = [];  //上墩牌的方位
        this.cards = {N:'',E:'',S:'',W:''};  //保存四个玩家牌的真实数据
        this.zindex = 10;
        this.center = null; // 桌子的中心 {x,y}
        this._csize = null; // 牌的大小
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
        /**添加********************************************************************************* */
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // this.calldata = [['1C','2C','PASS','PASS'],['3H','PASS','PASS','4NT'],
        //                 ['PASS','PASS','PASS','']]
        this.claimseat = 'east'; // east,south...
        this.timer = { stop: null, start: null }; // 用于控制 倒计时
        this.center = null; // 桌子的中心 {x,y}
        this._csize = TableModel.csize;
        this.deals = 'XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX'
        // ref 用来记录 四个发牌位置的div引用
        this.ref = {};
        Table.seats.forEach(key => this.ref[key] = React.createRef())
        this.ref.board = React.createRef();
        this.state = TableModel.state
        window.__Board=TableModel.board;
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
     /*******************************************************开始添加函数 ****************************************************************************/
     sucGetMatch=(data)=>{   //查询到所有未开始的table_id
       
        if(data.length){
     
            this.table_id_list = data;
            this.table_id = data[0];
            Models.join_channel(this.sucChannel,this.failChannel,this.table_id);    //根据桌号进入频道
        }
        else{
            //提示：未查询到待开始的比赛
            alert('您当前没有比赛，请稍后再试',2)
        }
    }

    sucChannel=(data)=>{    //查询公共频道号,board_id,私有频道号,  [2, Array(8), 5]
        const boardData = data.slice(-3); 
        if(data.length===3){ this.setBoardId(boardData) }
     
        if(data.length===4){ 
            this.setState({lastState:data[0]});
            if(data[0]==='All Done'){
                
                alert('您当前没有比赛，请稍后再试',2)
            }else if(data[0]['current_board']){
               
                this.setBoardId(boardData,data[0]['current_board'])
            }else{
                
                this.setBoardId(boardData)
            }
        }
    }
    setBoardId=(data,board_id)=>{
        this.my_channel_id = data[2]; 
        this.board_id_list = data[1];
        this.channel_id = data[0];
        this.board_id = board_id||data[1][0];
        Models.init_board(this.sucInit,this.failInit,this.board_id,this.channel_id);    //初始化牌桌，第三个参数表示牌号
    }
    sucInit=(data)=>{
       
    // {cards:"AQ93.T9632.T7.73 6.K7.K984.AQJ964 K42.AQ5.AJ3.KT85 JT875.J84.Q652.2",dealer:'E',players:[["111 1111 1111", "S", 7],["222 2222 2222", "N", 8],["333 3333 3333", "E", 9],["444 4444 4444", "W", 10]],vulnerable:"NS"}
        this.originData = data;
        this.cards['N'] = data.cards.split(' ')[0];
        this.cards['E'] = data.cards.split(' ')[1];
        this.cards['S'] = data.cards.split(' ')[2];
        this.cards['W'] = data.cards.split(' ')[3];
        this.dealer=data.dealer;
        this.playerCards= []
        data.players.forEach(item=>{    //存储‘我’的方位
            if(item[0]===session.get_name()){
                this.myseat = item[1];
                let playerDirections =  TableModel.confirmDirection(this.myseat);
                this.state.user.east.directionNum=playerDirections.east
                this.state.user.south.directionNum=playerDirections.south
                this.state.user.west.directionNum=playerDirections.west
                this.state.user.north.directionNum=playerDirections.north
            }
        })
        this.state.user.east.name = 'E' + data.players.filter(item=>{if(item[1]==='E')return item})[0][0] ,
        this.state.user.south.name ='S' + data.players.filter(item=>{if(item[1]==='S')return item})[0][0],
        this.state.user.west.name ='W' + data.players.filter(item=>{if(item[1]==='W')return item})[0][0],
        this.state.user.north.name ='N' + data.players.filter(item=>{if(item[1]==='N')return item})[0][0],
        this.setState();
        this.transfer(this.myseat);
       
        if(this.state.lastState){
            this.re_init();
        }
        Models.polling(this.sucPolling,this.failPolling,this.pollingId); 
    }
    sucPolling=(data)=>{
      
        if(data.length && data.slice(-1)[0]['id']!==this.pollingId && data[data.length-1].message.body.indexOf('data-oe-id')===-1){
            //准备遍历消息
            this.dealMsg(data);
        } 
        if(!this.state.toResult){
            Models.polling(this.sucPolling,this.failPolling,this.pollingId)
        }
    }
    failPolling=()=>{return false}
    
    dealMessageBody=(body)=>{
        if(body.substring(3,body.length-4)==='all ready'){
            this.splitCards() ;
        }else if(body.substring(3,body.length-4)==='claim agreed'){
                this.setState({scene:2});
                this.addChatMsg('系统消息','庄家claim成功，正在为您计算本副牌成绩...')
                Models.claim(this.sucClaim,this.failClaim,this.board_id,this.state.claimnum.pos,this.channel_id);
        }else{
            body = body.replace(/u'/g,"'").replace(/ /g,'')
            body = eval('('+body.substring(3,body.length-4)+')')
        
        

            if(body.pos&&body.send_msg){         //收到聊天消息  {pos:'W',send_msg:'msg'}
                this.addChatMsg(body.pos,body.send_msg)
            }
            if(body.board_id&&body.name&&body.pos&&body.number){  //收到叫牌消息  
                this.setState({
                    next:NEXTPLAYER[body.pos]
                })
                
                this.timing(null,0,()=>{},true)   //提示下一个叫牌人
                this.validatePass(body)
            }
            if(body.dummy&&body.openlead&&body.declarer){   //收到叫牌结果信息   {dummy:'N',openlead:'W',declarer:'S',nextplayer:'W',contract:'1S'}
                ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
                this.setState({
                    nextplayer:body.nextplayer,
                    next:body.openlead
                })
               
                this.timing(null,0,()=>{},true);
                this.playRules(body.nextplayer,null,null);      //根据打牌规则提示
                this.setState({
                    cards:TableModel.state.cards,
                    contract:body.contract,
                    declarer:body.declarer,
                    dummy:body.dummy,
                    scene:2
                })
            }
            if(body.number&&body.rank&&body.card&&body.number!==this.state.playCardNumber && this.state.lastState==null){    //收到打牌消息 {ns_win:0,number:1,rank:'5',pos:'W',suit:'C',nextplayer:'W',card:'C5',ew_win:0}
                this.state.playCardNumber = body.number
                // this.setState({lastTrick:false})
                if(this.state.lastTrick){this.lastTrick(false)};
                this.dummyCards = this.cards[this.state.dummy];       //拿到明手的牌
                this.dummySeat = Table.seats[this.state.userdir.indexOf(this.state.dummy)]   //计算明手的方位
                if(body.number===1){this.testDummy(this.dummySeat,this.dummyCards)}
                if(body.number%4===1){  this.playSuit = body.suit; }
                //验证打牌规则，根据打牌规则进行提示
                this.playRules(body.nextplayer,this.playSuit,body.number);    
                if(body.pos===this.state.declarer){this.claimtrick = this.claimtrick-1;}       //计算当前庄家可claim的墩数
                
                const playSeatCard = TableModel.state.cards[this.state.userdir.indexOf(body.pos)]     //拿到当前出牌人对应的牌，应为XXXXXXXXXXXXX
                const setItem = [body.pos,body.card];
                this.recoverTrick(setItem,'play',true);
                this.setState({
                    cards: TableModel.state.cards,
                    ew_win:body.ew_win,
                    ns_win:body.ns_win,
                    nextplayer:body.nextplayer,
                    next:body.nextplayer
                })
                this.timing(null,10,()=>{},true);        //提示下一个出牌人  
             
                if(body.number===52){   //当52张牌全部出完后，查询当前这幅牌的成绩
                    console.log('52张牌已经打完')
                    if(this.board_id_list.indexOf(this.board_id)<=this.board_id_list.length-1){
                        Models.board_points(this.sucBoardPoints,this.failBoardPoints,this.board_id)
                    }
                }
            }
            if(body.pos&&body.num&&body.board){   //收到庄家claim消息  {pos:'W', num:3, board:['SQ','ST']}
                this.setState({claimnum:body})
                if(this.myseat!==body.pos){
                    //展示庄家的牌
                    let claimCard = TableModel.state.cards[this.state.userdir.indexOf(body.pos)].splice(13-body.board.length,body.board.length);  
                    claimCard.map((item1,index1)=>{
                        item1.card = body.board[index1].split('')[1]+body.board[index1].split('')[0];
                        TableModel.state.cards[this.state.userdir.indexOf(body.pos)].push(item1)
                    })
                    this.setState({
                        scene:3,
                        cards: TableModel.state.cards,
                    });
                } 
            }
            if(body.pos&&body.agreeClaim){   //收到防守方是否同意
                const agreeClaimPos = TableModel.unifyDirection(body.pos);
                if(body.agreeClaim==='false'){  //当有防守方拒绝claim时，继续打牌过程
                    this.addChatMsg('系统消息',this.state.user[agreeClaimPos]['name']+' 拒绝庄家的claim请求，请继续打牌')
                    this.setState({scene:2, claimnum:{pos:null, num:0}, claiming:0, claimingState:[]});
                    if(this.state.playCardNumber%4===0){this.playRules(this.state.nextplayer,null,null);}
                    else{this.playRules(this.state.nextplayer,this.playSuit,null);}
                }
                else if(body.agreeClaim==='true'){
                    this.state.claimingState.push(body.pos)
                    this.setState({claimingState:this.state.claimingState})
                    this.addChatMsg('系统消息',this.state.user[agreeClaimPos]['name']+' 同意了庄家的claim请求')
                }
            }
        
            if(body.pos&&body.state==='ready'){
                const seat = Table.seats[this.state.userdir.indexOf(body.pos)]
                this.state.ready[seat]='R'
                this.setState({ready:this.state.ready})
              
            }
        }
    }
    dealMsg = (data) =>{
      
        this.pollingId=data.slice(-1)[0]['id']
        let body = data[data.length-1].message.body;    //"<p>{'board_id': 44, 'number': 1, 'name': u'1S', 'pos': u'S'}</p>"
        
        if(body.substring(3,body.length-4)==='all ready'){
            this.splitCards() ;
        }else if(body.substring(3,body.length-4)==='claim agreed'){
                this.setState({scene:2});
                this.addChatMsg('系统消息','庄家claim成功，正在为您计算本副牌成绩...')
                Models.claim(this.sucClaim,this.failClaim,this.board_id,this.state.claimnum.pos,this.channel_id);
        }else{
            body = body.replace(/u'/g,"'").replace(/ /g,'')
            body = eval('('+body.substring(3,body.length-4)+')')
        
        

            if(body.pos&&body.send_msg){         //收到聊天消息  {pos:'W',send_msg:'msg'}
                this.addChatMsg(body.pos,body.send_msg)
            }
            if(body.board_id&&body.name&&body.pos&&body.number){  //收到叫牌消息  
                this.setState({
                    next:NEXTPLAYER[body.pos]
                })
                
                this.timing(null,0,()=>{},true)   //提示下一个叫牌人
                this.validatePass(body)
            }
            if(body.dummy&&body.openlead&&body.declarer){   //收到叫牌结果信息   {dummy:'N',openlead:'W',declarer:'S',nextplayer:'W',contract:'1S'}
                ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
                this.setState({
                    nextplayer:body.nextplayer,
                    next:body.openlead
                })
               
                this.timing(null,0,()=>{},true);
                this.playRules(body.nextplayer,null,null);      //根据打牌规则提示
                this.setState({
                    cards:TableModel.state.cards,
                    contract:body.contract,
                    declarer:body.declarer,
                    dummy:body.dummy,
                    scene:2
                })
            }
            if(body.number&&body.rank&&body.card&&body.number!==this.state.playCardNumber){    //收到打牌消息 {ns_win:0,number:1,rank:'5',pos:'W',suit:'C',nextplayer:'W',card:'C5',ew_win:0}
                this.state.playCardNumber = body.number
                // this.setState({lastTrick:false})
                if(this.state.lastTrick){this.lastTrick(false)};
                this.dummyCards = this.cards[this.state.dummy];       //拿到明手的牌
                this.dummySeat = Table.seats[this.state.userdir.indexOf(this.state.dummy)]   //计算明手的方位
                if(body.number===1){this.testDummy(this.dummySeat,this.dummyCards)}
                if(body.number%4===1){  this.playSuit = body.suit; }
                //验证打牌规则，根据打牌规则进行提示
                this.playRules(body.nextplayer,this.playSuit,body.number);    
                if(body.pos===this.state.declarer){this.claimtrick = this.claimtrick-1;}       //计算当前庄家可claim的墩数
                
                const playSeatCard = TableModel.state.cards[this.state.userdir.indexOf(body.pos)]     //拿到当前出牌人对应的牌，应为XXXXXXXXXXXXX
                const setItem = [body.pos,body.card];
                this.recoverTrick(setItem,'play',true);
                this.setState({
                    cards: TableModel.state.cards,
                    ew_win:body.ew_win,
                    ns_win:body.ns_win,
                    nextplayer:body.nextplayer,
                    next:body.nextplayer
                })
                this.timing(null,10,()=>{},true);        //提示下一个出牌人  
             
                if(body.number===52){   //当52张牌全部出完后，查询当前这幅牌的成绩
                    console.log('52张牌已经打完')
                    if(this.board_id_list.indexOf(this.board_id)<=this.board_id_list.length-1){
                        Models.board_points(this.sucBoardPoints,this.failBoardPoints,this.board_id)
                    }
                }
            }
            if(body.pos&&body.num&&body.board){   //收到庄家claim消息  {pos:'W', num:3, board:['SQ','ST']}
                this.setState({claimnum:body})
                if(this.myseat!==body.pos){
                    //展示庄家的牌
                    let claimCard = TableModel.state.cards[this.state.userdir.indexOf(body.pos)].splice(13-body.board.length,body.board.length);  
                    claimCard.map((item1,index1)=>{
                        item1.card = body.board[index1].split('')[1]+body.board[index1].split('')[0];
                        TableModel.state.cards[this.state.userdir.indexOf(body.pos)].push(item1)
                    })
                    this.setState({
                        scene:3,
                        cards: TableModel.state.cards,
                    });
                } 
            }
            if(body.pos&&body.agreeClaim){   //收到防守方是否同意
                const agreeClaimPos = TableModel.unifyDirection(body.pos);
                if(body.agreeClaim==='false'){  //当有防守方拒绝claim时，继续打牌过程
                    this.addChatMsg('系统消息',this.state.user[agreeClaimPos]['name']+' 拒绝庄家的claim请求，请继续打牌')
                    this.setState({scene:2, claimnum:{pos:null, num:0}, claiming:0, claimingState:[]});
                    if(this.state.playCardNumber%4===0){this.playRules(this.state.nextplayer,null,null);}
                    else{this.playRules(this.state.nextplayer,this.playSuit,null);}
                }
                else if(body.agreeClaim==='true'){
                    this.state.claimingState.push(body.pos)
                    this.setState({claimingState:this.state.claimingState})
                    this.addChatMsg('系统消息',this.state.user[agreeClaimPos]['name']+' 同意了庄家的claim请求')
                }
            }
        
            if(body.pos&&body.state==='ready'){
                const seat = Table.seats[this.state.userdir.indexOf(body.pos)]
                this.state.ready[seat]='R'
                this.setState({ready:this.state.ready})
              
            }
        }
       
    }

    bidCall=(card)=>{   //牌手的叫牌事件，发送叫牌消息
       
        Models.bid(this.sucBid,this.failBid,this.board_id,this.myseat,card,this.channel_id);
    }
    sucBid=(data)=>{return false}
    failBid=(data)=>{return false}

    //查询叫牌结果的回调事件
    sucCall = ()=>{return false} 
    failCall=()=>{return false}
    handleReady = () => {     //收到牌手的准备消息
        Models.call_ready(this.sucReady,this.failReady,this.board_id,this.myseat);
    }
    sucReady=(data)=>{
        const seat = Table.seats[this.state.userdir.indexOf(this.myseat)] ; 
        this.state.ready[seat]='R' ;
        this.setState({ready:this.state.ready,nextBoard:false})
        const msg = {
            pos: this.myseat,
            state: 'ready',
            next_board:'',
        }
        Models.send_message(this.sucSend,this.failSend,this.channel_id,msg);
    }
    sucSend=(data)=>{
        return false
    }
    re_init=()=>{
        //未准备，准备阶段，叫牌阶段，打牌阶段，claim中，claim完成，
        const lastState=this.state.lastState;
      
        // 1 叫牌阶段 2 出牌阶段 3 claim 等待，4 claim 确认
        // ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
        if(lastState.state==='calling ready'||lastState.state==='start playing'){
            if(this.myseat==='S'){
                this.setState({
                    ready: {east: lastState['east_ready'], south: lastState['south_ready'], west: lastState['west_ready'], north: lastState['north_ready'] }
                })
            }
            if(this.myseat==='N'){
                this.setState({
                    ready: {east: lastState['west_ready'], south: lastState['north_ready'], west: lastState['east_ready'], north: lastState['south_ready'] }
                })
            }
            if(this.myseat==='W'){
                this.setState({
                    ready: {east: lastState['south_ready'], south:lastState['west_ready'], west:lastState['north_ready'], north: lastState['east_ready'] }
                })
            }
            if(this.myseat==='E'){
                this.setState({
                    ready: {east:lastState['north_ready'], south: lastState['east_ready'], west: lastState['south_ready'], north: lastState['west_ready'] }
                })
            }
            if(lastState['east_ready']&&lastState['north_ready']&&lastState['south_ready']&&lastState['west_ready']){
                this.splitCards();
            }
        }

        if(lastState.state==='biding'){     //叫牌阶段断线
            this.splitCards()
            if(lastState.bidder){
                //设置该谁叫牌
                this.setState({next:lastState.bidder})
              
                this.timing('east',0,()=>{},true);
            }
            lastState.call_info.map(item=>{     //{board_id: 44, number: 1, name: '1S', pos: 'S'}
                let body = {board_id:this.board_id, number:item[0], name:item[2], pos:item[1]}
                this.validatePass(body)
                this.setState({
                    ready:{east:'R',west:'R',north:'R',south:'R'}
                });
            });
        }
        if(lastState.state==='playing'){       //打牌阶段断线恢复
            this.setState({scene:2})
            this.setPlayingState();

            //设置可claim的墩数
            this.setClaimtrick()
            //设置已出牌数量
            this.state.playCardNumber = 52-this.state.lastState.unplayed_card.length

            if(lastState.unplayed_card.length===52){
                this.splitCards();
                this.setState({scene:2})
                // ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
            }else{
                
                this.recoverMyCards();      /*恢复自己的牌 */
                this.recoverDeclarerOrDummyCards(lastState.dummy)     /*恢复明手的牌 */
                // if(this.seat != lastState.declarer ){
                //     this.recoverDeclarerOrDummyCards(lastState.declarer)
                // }
                const guardSeat = [];
                if(lastState.board_claim){
                    this.recoverDeclarerOrDummyCards(lastState.declarer)     /*恢复庄家的牌 */
                    //恢复防守的牌
                    this.state.userdir.map(item=>{
                        if(item!==this.myseat&&item!==this.state.declarer&&item!==this.state.dummy){  guardSeat.push({pos:item,num:13}); }
                    });
                }
                else{
                    //恢复防守的牌
                    this.state.userdir.map(item=>{
                        if(item!==this.myseat&&item!==this.state.dummy){  guardSeat.push({pos:item,num:13}); }
                    });
                }
                this.recoverGuardCards(guardSeat);      //恢复防守的牌
                lastState.last_trick.map(item=>{
                    const setItem = [item[0],item[1]];
                    this.recoverTrick(setItem,'last',false);     //恢复上一墩
                })
                lastState.current_trick.map(item=>{
                    const setItem = [item[1],item[2]];
                    this.recoverTrick(setItem,'current',false);     //恢复上一墩
                })

                //恢复自己的牌，去掉已出的牌
                this.filterMyCards()
            }
            /* 恢复验证规则 */
            if(lastState.current_trick.length===4||lastState.current_trick.length===0){
                this.playRules(this.state.nextplayer,null,null);
            }else{
                this.playSuit = lastState.current_trick.slice(0,1)[0][2].split('')[0];
                this.playRules(this.state.nextplayer,this.playSuit,null);
            }
        }

        if(lastState.state==='claiming'){       //claim阶段断线恢复
         
            // this.counterTime();
            this.playSuit = lastState.current_trick.length?lastState.current_trick.slice(0,1)[0][2].split('')[0]:null;
            this.setPlayingState();

            //设置可claim的墩数
            this.setClaimtrick()
            //设置已出牌数量
            this.state.playCardNumber = 52-this.state.lastState.unplayed_card.length
            
            if(lastState.unplayed_card.length===52){
                this.splitCards();
                // ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
                this.setState({scene:2})
            }else{
                 /*恢复自己的牌 */
                 this.recoverMyCards()
                 this.filterMyCards()
                 /*恢复明手的牌 */
                this.recoverDeclarerOrDummyCards(lastState.dummy)

                const guardSeat = [];
                this.state.userdir.map(item=>{
                    if(item!==this.myseat&&item!==this.state.declarer&&item!==this.state.dummy){  guardSeat.push({pos:item,num:13}); }
                })
                 /**恢复防守的牌 */
                 this.recoverGuardCards(guardSeat);
            
                 /**恢复庄家的牌 */
                this.recoverDeclarerOrDummyCards(lastState.declarer)

                lastState.last_trick.map(item=>{
                    const setItem = [item[0],item[1]];
                    this.recoverTrick(setItem,'last',false);     //恢复上一墩
                })
                lastState.current_trick.map(item=>{
                    const setItem = [item[1],item[2]];
                    this.recoverTrick(setItem,'current',false);     //恢复上一墩
                })
            }

            this.setState({scene:3, claiming:1, claimnum:{pos:this.state.declarer, num:lastState.claim_result}})
            // this.claimnum = {pos:this.state.declarer, num:lastState.claim_result}
            if(lastState.north_claim)this.setState({claimingState:['N']})
            if(lastState.south_claim)this.setState({claimingState:['S']})
            if(lastState.west_claim)this.setState({claimingState:['W']})
            if(lastState.east_claim)this.setState({claimingState:['E']})

            this.playRules();
        }
    }
    transfer=(pos)=>{   //根据“我”的方位按照“右，下，左，上”的顺序计算对应的实际方位
        if(pos==='N')this.setState({userdir:['W','N','E','S']})
        if(pos==='E')this.setState({userdir:['N','E','S','W']})
        if(pos==='S')this.setState({userdir:['E','S','W','N',]})
        if(pos==='W')this.setState({userdir:['S','W','N','E']})
    }
    splitCards=()=>{
        //保存本家的牌的真实数据，其余三家用'X'表示牌的数据，四家牌的数据用空格分开
        this.deals = 'XXX.XX.XXXX.XXXX '+ this.cards[this.myseat] +' XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX';
        //二维数组，数组元素是josn对象，josn对象有每一张牌的信息，全部放在state的cards中
        TableModel.state.cards = this.initCards();
        TableModel.state.cards=TableModel.state.cards;
        this.deal();
        //状态变成叫牌阶段
        this.setState({scene:1,next:this.dealer})  
        this.timing(null,0,()=>{},true);
   
    }
    initCards() {
        const suits = Card.suits                    //['S', 'H', 'D', 'C'];
        const deals = this.deals.split(' ')
        let index = 0;                              // 复位index 可以让四个人的牌同时发出来
        const cards = [[], [], [], []];             // 初始化二维数组 保存四个方位的牌
        //deals [XXXXXXXXXXXXX,QJ98.A5.J853.QT4,XXXXXXXXXXXXX,XXXXXXXXXXXXX]
        deals.forEach((item, index1) => {
            const suit = item.split('.')
            // s 表示每一种花色的牌，是一个字符串，牌的数字大小
            suit.forEach((s, index2) => {           // index2 四个花色  s 'QJ98' 牌点字串
                for (var i = 0; i < s.length; i++) {
                    cards[index1].push({
                        onclick: () => false,              // onclick 必须是个函数
                        active: 0,
                        index: index,
                        key: index++,
                        seat: Table.seats[index1],       // 这张牌是那个方位的
                        status: index1==1&&s[i]=='X'?'played':'',
                        size: this.csize,                // 牌的形状大小
                        card: s[i] + suits[index2],      //牌的大小和花色
                        position: { x: this.width / 2, y: this.width * 2 }     // 考虑一个默认位置。
                    });
                }
            });
        });
        return cards;
    }
    validatePass=(body)=>{
        this.call(body.pos,body.name)   //展示叫牌人及叫品
        this.setState({
            bidCard:body.name,
            calldata:this.state.calldata,
        });
     
        body.name==='Pass'?this.callResult ++ : this.callResult = 0;    //计算当前‘Pass’的次数，判断是否叫牌结束
        if(this.callResult===3&&body.number!==3&&body.name==='Pass'){
            Models.call_result(this.sucCall,this.failCall,this.board_id,this.channel_id);
            this.callResult=0
        }else if(this.callResult===3&&body.number!==3&&body.name!=='Pass'){
            this.callResult=0
        }else if(this.callResult===4&&body.number===4){ 
            if(this.board_id_list.indexOf(this.board_id)===this.board_id_list.length-1){
                this.setState({toResult:true})
                this.props.toResult(this.table_id);
               
            }else if(this.board_id_list.indexOf(this.board_id)<this.board_id_list.length-1){
              
                TableModel.state.cards.map(itemSeat=>{
                    itemSeat.map(item=>{
                        item.position.x = this.width / 2;
                        item.position.y = -this.width / 2;
                    })
                })
                this.setState({
                    cards:TableModel.state.cards,
                    scene: 1,    // 0 准备阶段 1 叫牌阶段 2 出牌阶段 3 claim 等待，4 claim 确认
                    calldata:[],
                    bidCard: null,
                })
                TableModel.state.cards = this.initCards();
                this.board_id=this.board_id_list[this.board_id_list.indexOf(this.board_id)+1]
                alert('叫牌失败，即将进入下一副牌', 1, Models.init_board(this.sucInit,this.failInit,this.board_id), true);
            }
            this.callResult=0;
        }
    }
    call = (seat,bid) =>{
        const calldata = this.state.calldata
        if(calldata.length === 0){
            calldata.push(Array(4).fill(null))
            calldata[0][Table.seatscn.indexOf(seat)] = bid;
        }else if(seat === 'E'){
            calldata.push(Array(4).fill(null))
            calldata[calldata.length-1][Table.seatscn.indexOf(seat)] = bid;
        }else{
            calldata[calldata.length-1][Table.seatscn.indexOf(seat)] = bid;
        }
    }
    playRules=(nextplayer,suit,number)=>{   
        TableModel.state.cards.map(item=>{
            item.map(item1=>{
                item1.onclick =  () => false;
                item1.active = 2;
            })
        });
        if(nextplayer&&nextplayer!==this.state.dummy&&this.myseat===nextplayer){
        
            let haveSuit = 0;
            TableModel.state.cards[1].map((item,index)=>{
                if(item['status'] != 'played'){
                    if(suit!==null&&suit!==item.card.split('')[1]){
                        item.active=0; 
                    }else{
                        haveSuit+=1;
                        item.onclick =  this.play(item);
                    }
                }
                return haveSuit;
            }) 
            if(haveSuit===0||number%4===0&&number){TableModel.state.cards[1].map(item=>{item.active=2;item.onclick =  this.play(item);})}
        }else if(nextplayer===this.state.dummy&&this.myseat===this.state.declarer){
            let haveSuit = 0;
            TableModel.state.cards[3].map((item)=>{
                if(item['status'] != 'played'){
                    if(suit!==null&&suit!==item.card.split('')[1]){
                        item.active=0;
                    }else{
                        haveSuit+=1;
                        item.onclick =  this.play(item);
                    }
                }
            })  
            if(haveSuit===0||number%4===0&&number){TableModel.state.cards[3].map(item=>{item.active=2;item.onclick =  this.play(item);})}
        }
        this.setState({cards:TableModel.state.cards})
    }
    setPlayingState=()=>{
        this.setState({
            contract:this.state.lastState.contract,
            declarer:this.state.lastState.declarer,
            dummy:this.state.lastState.dummy,
            ns_win:this.state.lastState.ns_win,
            ew_win:this.state.lastState.ew_win,
            nextplayer:this.state.lastState.player,    //设置下一个出牌人
            next:this.state.lastState.player
        })
        
        this.timing(null,0,()=>{},true);
    }
    setClaimtrick=()=>{
        let countClaim = 0;
        this.state.lastState.unplayed_card.map(item1=>{    //设置可claim的墩数
            if(item1[0]===this.state.declarer){
                countClaim += 1;
            }
        });
        this.claimtrick = countClaim;
    }
    sucPlay=(data)=>{
        Models.sendplay(this.sucSearchPlay,this.failSearchPlay, this.board_id, data, this.channel_id);  //查询出牌结果
    }
    failSearchPlay=()=>{}
    sucSearchPlay=(data)=>{console.log(data)}
    recoverMyCards=()=>{
        const mycards = [[],[],[],[]];       /*恢复自己的牌 */
        let mycardslength = 0;
        let addXX = ['X','X','X','X','X','X','X','X','X','X','X','X','X'];
        this.state.lastState.unplayed_card.map(item=>{
            if(item[0]===this.myseat){
                addXX.pop();
                mycardslength += 1;
                if(item[1].split('')[0]==='S'){mycards[0]+=item[1].split('')[1]}
                if(item[1].split('')[0]==='H'){mycards[1]+=item[1].split('')[1]}
                if(item[1].split('')[0]==='D'){mycards[2]+=item[1].split('')[1]}
                if(item[1].split('')[0]==='C'){mycards[3]+=item[1].split('')[1]}
                
            }
        })
       
        this.deals = 'XXX.XX.XXXX.XXXX '+ mycards.join('.') + addXX.join('') +' XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX';
       
        TableModel.state.cards = this.initCards()
        this.deal();
    }
    recoverGuardCards=()=>{
        const guardSeat = [];
        this.state.userdir.map(item=>{
            if(item!==this.myseat&&item!==this.state.dummy){  guardSeat.push({pos:item,num:13}); }
        });
        guardSeat.map(item=>{
            this.state.lastState.unplayed_card.map(item1=>{
                if(item1[0]===item.pos){ item.num--;  }
            });
        });
        TableModel.state.cards.map(item=>{
            guardSeat.map(item1=>{
                item.map(item2=>{
                    if(item2.seat===Table.seats[this.state.userdir.indexOf(item1.pos)]){
                        if(item1.num){
                            item2.status='played'
                            this.moveToPlayed(item2);
                            item1.num--;
                        }
                    }
                });
            });
        });
        guardSeat.forEach((item)=>{
            let seatIndex = this.state.userdir.indexOf(item.pos);
            let cards = this.state.cards[seatIndex];
            cards =TableModel.resetCards(cards, seatIndex, true)
        })

    }
    recoverDeclarerOrDummyCards=(seat)=>{
        const DeclarerOrDummyCards=['','','',''];      
        const DeclarerOrDummySeat = Table.seats[this.state.userdir.indexOf(seat)]
        this.state.lastState.unplayed_card.map(item=>{
            if(item[0]===seat){
                if(item[1].split('')[0]==='S'){DeclarerOrDummyCards[0]+=item[1].split('')[1]}
                if(item[1].split('')[0]==='H'){DeclarerOrDummyCards[1]+=item[1].split('')[1]}
                if(item[1].split('')[0]==='D'){DeclarerOrDummyCards[2]+=item[1].split('')[1]}
                if(item[1].split('')[0]==='C'){DeclarerOrDummyCards[3]+=item[1].split('')[1]}
                
            }
        });
        this.testDummy(DeclarerOrDummySeat,DeclarerOrDummyCards.join('.'))
    }
    recoverTrick=(Item,which,state)=>{
        let card = null, playSeatCard = null, last = 0;
        card = Item[1].split('')[1]+Item[1].split('')[0]      // 对收到的牌处理成‘5C’的格式
        playSeatCard = TableModel.state.cards[this.state.userdir.indexOf(Item[0])]
       console.log(TableModel.state.cards)
        playSeatCard.map(item=>{
            if(item.card.split('')[0]==='X'&&last===0){
                // if(state&&item['animation']['left']!==this.width / 2){
                   if(state&&item.status !='played'){
                    item.card=card;
                    item.status='played';
                    last=1
                }else if(!state){
                    item.card=card;
                    item.status='played';
                    last=1
                }
            }
        })
        playSeatCard.map((item1,index1)=>{      //动画，将当前出牌人出的牌放到board中，即表现为出牌
            if(item1.card===card){
                TableModel.board.push(item1);
                this.lastTrickPos.push(Item[0]);
                if(which==='last') {
                    this.moveToPlayed(item1)
                }
                if(which==='current'||which==='play') {
                   
                    TableModel.play(item1);
                this.setState({ cards: TableModel.state.cards });
                Sound.play('play'); 
                // if (TableModel.board.length == 4) setTimeout(this.clearBoard, 1000)
                }
            }
        });
        if(TableModel.board.length===4){
            this.lastTrickCard = {pos:this.lastTrickPos,card:TableModel.board};
            if(which==='play'){setTimeout(this.clearBoard, 1000)}
            else{this.clearBoard()}
        }
}
filterMyCards=()=>{
    TableModel.state.cards[this.state.userdir.indexOf(this.myseat)].map(item=>{
        if(item.card.split('')[0]==='X'){
            item.status='played'
            this.moveToPlayed(item)
        }
    })
}
testDummy = (seat1,dummycards) => {
    console.log(seat1)
    console.log(dummycards)
   
    const seat = seat1;
    let index = 0
    const dCards = dummycards.split('.');
    let cards = TableModel.state.cards[Table.seats.indexOf(seat)];
    dCards.forEach((item1, index1) => {
        item1.split('').forEach((item2, index2) => {
            cards[index].card = item2 + Card.suits[index1]
            cards[index].onclick = this.play(cards[index]);
            index++;
        })
    })
    cards.map(item=>{
        if(item['card'].split('')[0]==='X'){
            item.status='played'
            this.moveToPlayed(item)
        }
    })
    TableModel.resetCards(cards, Table.seats.indexOf(seat))
    this.setState({
        cards: TableModel.state.cards
    })
}
moveToPlayed=(item)=>{
    item.animation.left = this.height / 2;
    item.animation.top = -this.height * 2;
    item.zindex= this.zindex++;
    item.active = 3;
}

failPlay=(data)=>{console.log('fail play',data)}

sucBoardPoints=(data)=>{    //查询当前牌成绩的成功回调，调取展示成绩模块进行展示
    this.showResult(data);
}
addChatMsg=(seat,msg)=>{
    const elMsg = document.querySelector('#msg')
    elMsg.innerHTML = 
         elMsg.innerHTML + "<div>" + seat + ' : ' + msg + "</div>"
    
}
testChat = () => {
    const elSay = document.querySelector('#msginput')
    const msg ={
        pos:this.myseat,
        send_msg:elSay.value
    }
    if(this.state.scene===0){   //当scene===0，即处于准备状态时，用公共频道聊天；其他状态时，均用私有频道进行聊天
        Models.send_message(this.sucSend,this.failSend,this.channel_id,msg);
    }else{
        Models.send_message(this.sucSend,this.failSend,this.my_channel_id,msg);
    }
}
sucSend=(data)=>{
    const elSay = document.querySelector('#msginput')
    elSay.value=null;
    console.log(data)
}
failSend=()=>{console.log('fail send')}
sucClaim1=(data)=>{ console.log(data) }
sucClaiming=(data)=>{ console.log(data) ;}
failClaiming=()=>{console.log('fail claiming')}
failClaim1=()=>{console.log('fail claim')}
     /*******************************************************添加函数结束 ****************************************************************************/
    /**
     * 完成挂载后，要计算 各个位置的坐标。
     * _initSeat 初始化 发牌位置 出牌位置等坐标
     */
    componentDidMount() {
        this._initSeat(); 
        Models.get_matches(this.sucGetMatch,this.failGetMatch)
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
        this.lastTrickPos=[];
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
        return ()=>{
            if (item.active == 2) {
                TableModel.preplay(item);
                this.setState({ cards: TableModel.state.cards });
            } else if (item.active == 3) {//先采用收到消息后再打牌
                TableModel.play(item);
                this.setState({ cards: TableModel.state.cards });
                Sound.play('play'); 
                const card = item.card.split('')[1]+item.card.split('')[0];
                Models.play(this.sucPlay,this.failPlay,this.board_id,this.myseat,card);   //发送出牌消息
                if (TableModel.board.length == 4) setTimeout(this.clearBoard, 1000)
            } else return;
        }
    }
    

    /**
     * 触发 claim
     * 考虑增加参数为 seat
     */
    claim = () => {
        if(this.myseat===this.state.declarer){
            this.setState({
                scene: 3
            })
        }
    }
    /**
     * 预留发送 数据接口
     */
    handleClaim = (data) =>{    //庄家发送claim消息
        if(data){  
            Models.claiming(this.sucClaiming,this.failClaiming,this.board_id,'C',data);
            Models.claim1(this.sucClaim1,this.failClaim1,this.board_id,this.myseat,data,this.channel_id);
        }
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
    // handleReady = (se) => {
    //     TableModel.userReady(se);
    //     if (TableModel.userAllReady()) {
    //         TableModel.state.scene = 1;
    //         this.deal(); // 这里也有 setState 但是 它是异步的。只执行一次
    //     }
    //     this.setState({
    //         user: TableModel.state.user,
    //         scene: TableModel.state.scene
    //     })
    // }
    /**
     * 发牌
     * 调用：
     * 输出：TableModel.dealCards() 返回 cards 的位置和出牌绑定
     */
    deal = () => {
        this.setState({
            cards: TableModel.dealCards(this.play())
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
    // timing = (seat, time, callback) => {
    //     ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
    //     const p = this.height * 0.18;
    //     const offset = {
    //         east: { x: p, y: 0 },
    //         south: { x: 0, y: p },
    //         west: { x: -p * 0.66, y: 0 },
    //         north: { x: 0, y: -p * 0.66 }
    //     }

    //     const top = TableModel.seat[seat][1]['y'] + offset[seat].y;
    //     const left = TableModel.seat[seat][1]['x'] + offset[seat].x;
    //     const style = {
    //         position: 'absolute',
    //         top: top,
    //         left: left,
    //         width: '10%'
    //     }
    //     const clock = (
    //         <div style={style}>
    //             0.
    //         </div>
    //     );
    //     ReactDOM.render(
    //         clock,
    //         document.querySelector('#clock')
    //     )

    // }
    timing = (seat, time, callback,addOrReduce) => {
        // ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
        // const p = this.width * 0.25;
        // const offset = {
        //     east: { x: p, y: 0 },
        //     south: { x: 0, y: p },
        //     west: { x: -p * 0.66, y: 0 },
        //     north: { x: 0, y: -p * 0.66 }
        // }
        // const top = this.seat[seat][1]['y'] + offset[seat].y;
        // const left = this.seat[seat][1]['x'] + offset[seat].x;
        // const style = {
        //     position: 'absolute',
        //     top: top,
        //     left: left,
        //     width: '10%',
        //     zIndex:6
        // }
        const style = {
            position: 'absolute',
            top: this.width * 0.08,
            right: this.width*0.05,
            width: '10%',
            height:this.width * 0.10,
            zIndex:6
        }
        const clock = (
            <div style={style}>
                <Clock time={time} callback={callback} addOrReduce={addOrReduce}/>
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

    showResult = (data) => {
        let result = null ;
        TableModel.state.cards.map(itemSeat=>{
            itemSeat.map(item=>{
                item.position.x = this.width / 2;
                item.position.y = -this.width / 2;
            })
        })
        this.setState({cards:TableModel.state.cards})
        data.ew_points?result = data.result+'  EW '+data.ew_points:result = data.result+'  NS '+data.ns_points;
        const re = <div className='result'>
            <img src='/cards/medal.svg' width="20%" />
            <div style={{lineHeight:this.width * 0.12+'px',}}>{result}</div>
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
        if(this.board_id_list.indexOf(this.board_id)<this.board_id_list.length-1){
            this.setState({
                scene: 0,    // 0 准备阶段 1 叫牌阶段 2 出牌阶段 3 claim 等待，4 claim 确认
                calldata:[],
                bidCard: null,
                contract:null,
                declarer:null,
                ns_win:null,
                ew_win:null,
                lastTrick:false,
                debug: false,
                lastTrick:false,
                // lastState: null,
                claimnum:{pos:null, num:0},
                ready:{east: null, south: null, west: null, north: null ,next_board:0},
                claiming:0,
                claimingState:[],
                next:null,
                // nextBoard:true,
            })
            TableModel.state.cards = this.initCards();
            // this.claimnum = 0;      //claim的墩数、方位、庄家剩余的牌
            this.agreeClaim = 0;    //claim时，对防守方是否同意claim计数
            this.claimtrick = 13;    //可claim的数目
            this.originData = null;
            this.board = [];
            this.lastTrickCard = null; 
            this.lastTrickPos = []; 
            this.dummyCards = null;
            this.dummySeat = null;
            Models.join_channel(this.sucChannel,this.failChannel,this.table_id);
            ReactDOM.unmountComponentAtNode(document.querySelector('#result'));
        }
        if(this.board_id_list.indexOf(this.board_id)===this.board_id_list.length-1){
            this.props.toResult(this.table_id);
        }
    }
    /**
     * 显示上一墩牌
     * 桌面上始终52张牌，因此要显示上一墩牌，需要调整某些牌的位置。
     * cards: TableModel.lastTrick(show),
     */
    // lastTrick = () => {
    //     const show = !this.state.lastTrick;
    //     this.setState({
    //         cards: TableModel.lastTrick(show),
    //         lastTrick: !this.state.lastTrick
    //     });
    // }
    lastTrick = (data) => {
        // 在模型里 应该先判断当前 trick 编号。然后决定是否能看lasttrick
        if(this.lastTrickCard){
            const lt = this.lastTrickCard;
            let card = null;
            let show = true;
            if(data){
                if(this.state.lastTrick) show = false;
            }else{
                show = false
            }
            lt.pos.map((item,index)=>{
                card = this._cardIndexOf(lt.card[index].index);
                console.log(lt.card[index].index)
                console.log(card)
                card['animation']['left'] = (show === true) ?
                    TableModel.seat[Table.seats[this.state.userdir.indexOf(item)]][1].x - this.height / 2.9
                    : this.width / 2;
                card['animation']['top'] = (show === true) ?
                TableModel.seat[Table.seats[this.state.userdir.indexOf(item)]][1].y - this.height / 2.9
                    : -this.width * 2;
                card['zIndex']=this.zindex++
                card['animation']['delay']=0;
                this.setState({cards: this.state.cards})
            })
            if(data){
                this.setState({ lastTrick:!this.state.lastTrick  })
            }else{
                this.setState({lastTrick:false})
            }
        }
    }
    _cardIndexOf(index) {
        const i1 = Math.floor(index / 13);
        const i2 = index % 13;
        return this.state.cards[i1][i2];
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
    cancelClaim = ()=>{     //庄家取消claim事件，继续打牌
        this.setState({ scene:2 })
    }

    handleClaimMsg = (data) =>{     //收到防守对庄家claim 的同意或拒绝消息
        const msg={
            pos:this.myseat,
            agreeClaim:data.toString()
        }
        Models.send_message(this.sucSend,this.failSend,this.channel_id,msg);
        if(data){
            Models.ask_claim(this.sucAskClaim,this.failAskClaim,this.board_id,this.myseat,'C')
        }else{
            Models.ask_claim(this.sucAskClaim,this.failAskClaim,this.board_id,this.myseat,'N')
        }
    }
    sucAskClaim=(data)=>{console.log(data)}
    failAskClaim=()=>{console.log('fail ask_claim')}
 
    sucClaim=(data)=>{  //当两个防守均同意claim消息后，claim成功的回调函数
        Models.board_points(this.sucBoardPoints,this.failBoardPoints,this.board_id);
    }
    failClaim=()=>{}
    render() {
        // 考虑这里判断手机，还是pc，可以通过不同路由来判断。不用自适应。
        return (
            <PCTableView table={this} />
        );
    }
}
Table.seats = ['east', 'south', 'west', 'north']
Table.seatscn = ['E','S','W','N']
export default Table;