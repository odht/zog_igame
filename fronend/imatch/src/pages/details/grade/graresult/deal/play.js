import { Component } from "react";
import {Row, Col, Table} from 'antd';
import club from '@/assets/svg/club.svg';
import diamond from '@/assets/svg/diamond.svg';
import heart from '@/assets/svg/heart.svg';
import spade from '@/assets/svg/spade.svg';
// const suits=[
//     <img src={spade} style={{width:"12px"}}/>,
//     <img src={club} style={{width:"12px"}}/>,
//     <img src={heart} style={{width:"12px"}}/>,
//     <img src={diamond} style={{width:"12px"}}/>,
// ]
function suits(suit,num){
   return (<span><img src={suit} style={{width:"12px"}}/>{num}</span>)
}
const callData=[
    {north:'',earth:<span>1 <img src={spade} style={{width:"12px"}}/></span> ,south:'P',west:'P'},
    {north:'P',earth:'' ,south:'',west:''},
    {},
    {},
    {},
]
const callColumns=[{
    title:'北',
    dataIndex:'north',
    key:'north',
    align:'center'
},{
    title:'东',
    dataIndex:'earth',
    key:'earth',
    align:'center'
},{
    title:'',
    dataIndex:'1',
    key:'1'
},{
    title:'南',
    dataIndex:'south',
    key:'south',
    align:'center'
},{
    title:'西',
    dataIndex:'west',
    key:'west',
    align:'center'
}];

const resultColumns=[
    {title:'结果',dataIndex:'result',key:'result'},
    {title:'首攻',dataIndex:'first',key:'first'},
    {title:'南北得分',dataIndex:'snscore',key:'snscore'},
    {title:'东西得分',dataIndex:'ewscore',key:'ewscore'},
    {title:'南北IMP',dataIndex:'nsimp',key:'nsimp'},
    {title:'东西IMP',dataIndex:'ewimp',key:'ewimp'},
];
const resultData=[
    {result:<span>W 3<img src={spade} style={{width:"12px"}}/> X</span>,first:<span>2<img src={spade} style={{width:"12px"}}/></span>,snscore:'',ewscore:140,nsimp:'',ewimp:1},
    {},
    {},
    {},
    {}
];
const processColumns=[{
    title:'北',
    dataIndex:'north',
    key:'north',
    align:'center'
},{
    title:'东',
    dataIndex:'earth',
    key:'earth',
    align:'center'
},{
    title:'南',
    dataIndex:'south',
    key:'south',
    align:'center'
},{
    title:'西',
    dataIndex:'west',
    key:'west',
    align:'center'
},{
    title:'北',
    dataIndex:'north1',
    key:'north1',
    align:'center'
},{
    title:'东',
    dataIndex:'earth1',
    key:'earth1',
    align:'center'
},{
    title:'南',
    dataIndex:'south1',
    key:'south1',
    align:'center'
}];
const processData=[
    {north:suits(spade,2),earth:suits(spade,5) ,south:suits(spade,'K'),west:suits(spade,6),north1:'',earth1:'' ,south1:''},
    {north:'',earth:'' ,south:suits(spade,2),west:suits(spade,3),north1:suits(spade,4),earth1:suits(spade,5) ,south1:''},
    {north:'',earth:suits(club,6) ,south:suits(club,8),west:suits(club,7),north1:suits(club,10),earth1:'' ,south1:''},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
]
export default class Play extends Component{
   render(){
       return(
           <div style={{width:'900px',margin:'0 auto'}}>
            <Row>
                <Col span={9}>
                <h2 style={{textAlign:'center'}}>牌型分布</h2>
                <Row>
                    <Col span={8}>
                        <div>局况</div>
                        <div>无双</div>
                    </Col>
                    <Col span={8}>
                        <div>张三</div>
                        <div>{suits(spade)} J7</div>
                        <div>{suits(heart)} K9863</div>
                        <div>{suits(diamond)} QJ732</div>
                        <div>{suits(club)} Q</div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div>赵六</div>
                        <div>{suits(spade)} J7</div>
                        <div>{suits(heart)} K9863</div>
                        <div>{suits(diamond)} QJ732</div>
                        <div>{suits(club)} Q</div>
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <div>王五</div>
                        <div>{suits(spade)} J7</div>
                        <div>{suits(heart)} K9863</div>
                        <div>{suits(diamond)} QJ732</div>
                        <div>{suits(club)} Q</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        
                        <div>{suits(spade)} J7</div>
                        <div>{suits(heart)} K9863</div>
                        <div>{suits(diamond)} QJ732</div>
                        <div>{suits(club)} Q</div>
                        <div>李四</div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                </Col>
                <Col span={15}>
                    <h2 style={{textAlign:'center'}}>打牌过程</h2>
                    <Table size='xs'   columns={processColumns} dataSource={processData} pagination={false} bordered />
                </Col>
            </Row>
            <Row>
                <Col span={9}>
                    <h2 style={{textAlign:'center'}}>叫牌过程</h2>
                    <Table size='xs'   columns={callColumns} dataSource={callData} pagination={false} bordered />
                </Col>
                <Col span={15}>
                    <h2 style={{textAlign:'center'}}>打牌结果</h2>
                    <Table columns={resultColumns} size='xs' dataSource={resultData} bordered={true} pagination={false}/>
                </Col>
            </Row>
           </div>
       )
   }
}