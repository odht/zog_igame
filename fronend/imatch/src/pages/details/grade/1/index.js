import { Component } from "react";
import styles from './index.css'
import club from '../../../../assets/svg/club.svg';
import diamond from '../../../../assets/svg/diamond.svg';
import heart from '../../../../assets/svg/heart.svg';
import spade from '../../../../assets/svg/spade.svg';

import direction from '../../../../assets/direction.png';
import one from '../../../../assets/one.png';
import { Table ,Row, Col } from "antd";
import { Link } from "react-router-dom";
const renderContent= (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index % 2) {
      obj.props.rowSpan = 0;console.log(index)
    }else{
        obj.props.rowSpan = 2;
    }
    return obj;
  }
const suits=[club,diamond,heart,spade];
const seats=['E', 'N', 'W','S']
const columns = [{
    title: '桌号',
    dataIndex: 'number',
    key: '1',
    render:renderContent,
    align:"center",
    className:styles.blue
  }, {
    title: '主队',
    dataIndex: 'host1',
    key: '2',
    colSpan: 2,
    align:"center",
    className:styles.blue
  },
  {
    title: '主队',
    dataIndex: 'host2',
    key: '22',
    colSpan: 0,
    align:"center",
    className:styles.blue
  }, {
    title: '客队',
    dataIndex: 'guest',
    key: '31',
    colSpan: 2,
    align:"center", 
    className:styles.red
  },
  {
    title: '客队',
    dataIndex: 'guest2',
    key: '33',
    colSpan: 0,
    align:"center",
    className:styles.red
  },{
    title: '',
    dataIndex: 'kb',
    key: '3',
    align:"center",
  },
  {
    title: '',
    dataIndex: 'play',
    key: '13',
    align:"center",
    render:()=>(<Link to='/details/grade/1/play'>play</Link>)
  }, {
    title: '庄家',
    dataIndex: 'banker',
    key: '4',
    align:"center",
  }, {
    title: '定约',
    dataIndex: 'dingyue',
    key: '5',
    align:"center",
    render:(item,row,index)=>(<div><span>{item}</span> <img src={suits[index]} style={{width:"13px"}}/></div>)
  },{
    title: '结果',
    dataIndex: 'result',
    key: '6',
    align:"center",
  }, {
    title: 'NS',
    dataIndex: 'ns',
    key: '7',
    align:"center",
  }, {
    title: 'EW',
    dataIndex: 'ew',
    key: '8',
    align:"center",
  },{
    title: 'Datum',
    dataIndex: 'datum',
    key: '9',
    align:"center",
  }, {
    title: 'ximp',
    dataIndex: 'ximp',
    key: '10',
    align:"center",
  }, {
    title: '主队IMP',
    dataIndex: 'himp',
    key: '11',
    align:"center",
    render:renderContent
  },{
    title: '客队IMP',
    dataIndex: 'gimp',
    key: '12',
    render:renderContent,
    align:"center",
  }, ];


const dataSource=[
    {number:1,host1:"N 蔡兴坤",host2:"S 俞敏敏",guest:"E 徐竹",guest2:"W 周建",kb:"开室",banker:"E",dingyue:"1",result:"+1",ns:"",ew:420,datum:122,ximp:1,himp:"",gimp:8},
    {number:1,host1:"E 袁卫鸿",host2:"W 孙铭",guest:"N 黄灏",guest2:"S 徐学峰",kb:"开室",banker:"N",dingyue:"3",result:"+1",ns:"",ew:420,datum:122,ximp:1,himp:"",gimp:8},
    {number:2,host1:"N 蔡兴坤",host2:"S 俞敏敏",guest:"E 徐竹",guest2:"W 周建",kb:"开室",banker:"E",dingyue:"6",result:"+1",ns:"",ew:420,datum:122,ximp:1,himp:"",gimp:8},
    {number:1,host1:"E 袁卫鸿",host2:"W 孙铭",guest:"N 黄灏",guest2:"S 徐学峰",kb:"开室",banker:"N",dingyue:"Q",result:"+1",ns:"",ew:420,datum:122,ximp:1,himp:"",gimp:8}


]

const dealerColumn=[
 { title: '',
  dataIndex: 'number',
  key: '1',
  render:(item,row,index)=>(seats[index]),
  align:"center",
},
  { title: <img src={spade} style={{width:"14px"}}/>,
  dataIndex: 'spade',
  key: '2',
  align:"center",
},
{ title: <img src={heart} style={{width:"14px"}}/>,
  dataIndex: 'heart',
  key: '3',
  align:"center",
},
{ title: <img src={diamond} style={{width:"14px"}}/>,
  dataIndex: 'diamond',
  key: '4',
  align:"center",
},
{ title: <img src={club} style={{width:"14px"}}/>,
  dataIndex: 'club',
  key: '5',
  align:"center",
},
  { title: 'NT',
  dataIndex: 'nt',
  key: '6',
  align:"center",},
]
const dealerData=[
  {spade:1,heart:'-',diamond:'-',club:'-',nt:'-'},
  {spade:'-',heart:'2',diamond:'-',club:'-',nt:'-'},
  {spade:'-',heart:'-',diamond:'3',club:'-',nt:'-'},
  {spade:'-',heart:'-',diamond:'-',club:'5',nt:'-'}
]
export default class Result extends Component{


    render(){
        return (
            <div>
            <div style={{width:"900px",margin:"0 auto"}}>
                <h2 style={{textAlign:"center"}}>公开团体赛：排位赛</h2>
                <h3 style={{textAlign:"center"}}>排位赛第1轮：第一副牌</h3>
                
                <Row type='flex'>
                  <Col offset={8} span={8}><div style={{width:"300px",margin:"0 auto"}}>
                   <table style={{width:"100%"}}>
                       <tr>
                           <td><img src={one}/></td>
                           <td>
                            <tr><span><img src={spade} style={{width:"15px"}}/> J7</span></tr>
                            <tr><span><img src={heart} style={{width:"15px"}}/> K9863</span></tr>
                            <tr><span><img src={diamond} style={{width:"15px"}}/> QJ732</span></tr>
                            <tr><span><img src={club} style={{width:"15px"}}/> Q</span></tr>
                           </td>
                           <td><tr>发牌：N</tr><tr>局况：None</tr></td>
                       </tr>
                       <tr>
                       <td><tr><span><img src={spade} style={{width:"15px"}}/> J7</span></tr>
                            <tr><span><img src={heart} style={{width:"15px"}}/> K9863</span></tr>
                            <tr><span><img src={diamond} style={{width:"15px"}}/> QJ732</span></tr>
                            <tr><span><img src={club} style={{width:"15px"}}/> Q</span></tr></td>
                           <td>
                            <img src={direction}/>
                           </td>
                           <td><tr><span><img src={spade} style={{width:"15px"}}/> J7</span></tr>
                            <tr><span><img src={heart} style={{width:"15px"}}/> K9863</span></tr>
                            <tr><span><img src={diamond} style={{width:"15px"}}/> QJ732</span></tr>
                            <tr><span><img src={club} style={{width:"15px"}}/> Q</span></tr></td>
                       </tr>
                       <tr>
                       <td></td>
                           <td>
                            <tr><span><img src={spade} style={{width:"15px"}}/> J7</span></tr>
                            <tr><span><img src={heart} style={{width:"15px"}}/> K9863</span></tr>
                            <tr><span><img src={diamond} style={{width:"15px"}}/> QJ732</span></tr>
                            <tr><span><img src={club} style={{width:"15px"}}/> Q</span></tr>
                           </td>
                           <td></td>
                       </tr>
                   </table>
                </div></Col>
                  <Col span={8}>
                    <Row type="flex"  align='middle' style={{height:'100%',width:'100%'}}>
                      <Col style={{color:"grey",fontSize:'200%',fontWeight:'bold'}} span={12} offset={6}>Datum 180</Col>
                      <Col span={12} offset={6}>
                        <Table columns={dealerColumn} dataSource={dealerData} pagination={false} size="xs" bordered/>
                      </Col>
                    </Row>
                  </Col>
                </Row>
            </div>
            <Table
             columns={columns}
             bordered
             dataSource={dataSource}
             size='xs'
             />
            </div>
            )
    }
}
    