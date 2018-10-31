import { Component } from "react";
import { Card, Row, Col, Table } from "antd";
import { Link } from "dva/router";
const renderNumber = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index%2 ===0) {
      obj.props.rowSpan = 2;
    }else{
        obj.props.rowSpan = 0;
    }
    return obj;
  };
  
const columns = [{
    title: '牌号',
    dataIndex: 'number',
    key: 'number',
    render:renderNumber,
    align:"center",
  }, {
    title: '房间',
    dataIndex: 'room',
    key: 'room',
    align:"center",
  }, {
    title: '庄家',
    dataIndex: 'banker',
    key: 'banker',
    align:"center",
  },{
    title: 'play',
    dataIndex: 'play',
    key: 'play',
    align:"center",
    render:()=>(<Link to='/details/grade/1/play'>play</Link>)
  },{
    title: '定约',
    dataIndex: 'dingyue',
    key: 'dingyue',
    align:"center",
  }, {
    title: '结果',
    dataIndex: 'result',
    key: 'result',
    align:"center",
  }, {
    title: 'NS',
    dataIndex: 'ns',
    key: 'ns',
    align:"center",
  },{
    title: 'EW',
    dataIndex: 'ew',
    key: 'ew',
    align:"center",
  }, {
    title: 'IMPs',
   children:[{
    title: '主队',
    dataIndex: 'host',
    key: 'host',
    render:renderNumber,
    align:"center",
   },{
    title: '客队',
    dataIndex: 'guest',
    key: 'guest',
    render:renderNumber,
    align:"center",
   }]
  }];
  const dataSource = [
      {number:1,room:"开",banker:"E",dingyue:"1NT",result:"-1",ns:"150",ew:"",host:"12",guest:""},
      {number:1,room:"闭",banker:"S",dingyue:"2NT",result:"2",ns:"",ew:"100",host:"0",guest:"23"},
      {number:2,room:"开",banker:"E",dingyue:"1NT",result:"-1",ns:"150",ew:"",host:"",guest:"23"},
      {number:2,room:"闭",banker:"S",dingyue:"2NT",result:"2",ns:"",ew:"100",host:"",guest:"23"},
      {number:3,room:"开",banker:"E",dingyue:"1NT",result:"-1",ns:"150",ew:"",host:"12",guest:""},
      {number:3,room:"闭",banker:"S",dingyue:"2NT",result:"2",ns:"",ew:"100",host:"12",guest:"23"}

]
export default class Round extends Component{
    render(){
        return(
            <div style={{width:"800px",margin:"0 auto"}}>
                <h2 style={{textAlign:"center"}}>公开团体赛：排位赛第1轮</h2>
                <div style={{textAlign:"center"}}>法尔胜 VS  育贤海外队</div>
               
                <Row type="flex" justify="space-around">
                    <Col span={10} >
                        <Card
                        title="开室"
                        bordered={true}
                        style={{ width: 350 }}
                        headStyle={{ background: "green", textAlign: "center" }}
                        >
                        <Row type="flex" align="middle">
                            <Col span={8}>王岩 010923</Col>
                            <Col span={8}>
                            <Row>卢燕 022216</Row>
                            <Row>
                                <div style={{ height: "50px", backgroundColor: "black" }} />
                            </Row>
                            <Row>刘艳010918</Row>
                            </Col>
                            <Col span={8}>王健 002345</Col>
                        </Row>
                        </Card>
                        </Col>
                    <Col span={10}>
                    <Card
                title="闭室"
                bordered={true}
                style={{ width: 350 }}
                headStyle={{ background: "green", textAlign: "center" }}
                >
                <Row type="flex" align="middle">
                    <Col span={8}>董永灵 002223</Col>
                    <Col span={8}>
                    <Row>刘姝 010920</Row>
                    <Row>
                        <div style={{ height: "50px", backgroundColor: "black" }} />
                    </Row>
                    <Row>周利华 011410</Row>
                    </Col>
                    <Col span={8}>古玲 010839</Col>
                </Row>
                </Card></Col>
                </Row>
                
                <Table
                bordered
                columns={columns}
                pagination={false}
                dataSource={dataSource}
                size='xs'
                />
                <Row>
                    <Col span={6}style={{border:'1px solid grey'}}>IMPs</Col><Col  span={18} style={{border:'1px solid grey',textAlign:'right'}}>10 : 09</Col>
                    <Col span={6} style={{border:'1px solid grey'}}>VPs</Col><Col style={{border:'1px solid grey',textAlign:'right'}}span={18}>10.44 : 9.56</Col>
                </Row>
            </div>
        )
    }
}