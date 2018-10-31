import React from 'react';
import { Table, Row, Col } from 'antd';
import './team.css';
const member = (<div>
                  <Row>
                    <Col span={4}>111111</Col><Col span={4}>111111</Col><Col span={4}>111111</Col><Col span={4}>111111</Col><Col span={4}>111111</Col><Col span={4}>111111</Col>
                  </Row>
                  <Row>
                    <Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col>
                  </Row>
                  <Row>
                    <Col span={4}>56%</Col><Col span={4}>56%</Col><Col span={4}>56%</Col><Col span={4}>56%</Col><Col span={4}>56%</Col><Col span={4}>56%</Col>
                  </Row>
                </div>
               )
const dataSource = [{
  key: '1',
  number: '1',
  team: '从一而终',
  ranking: '12',
  coach:'王伟荣',
  member:"姜周伟",
  pay:'未交费'
}, {
  key: '2',
  number: '2',
  team: '从一而终',
  ranking: '13',
  coach:'王伟荣',
  member:"姜周伟",
  pay:'未交费'
},{
  key: '3',
  number: '3',
  team: '从一而终',
  ranking: '16',
  coach:'王伟荣',
  member:"姜周伟",
  pay:'未交费'
},{
  key: '4',
  number: '4',
  team: '从一而终',
  ranking: '33',
  coach:'王伟荣',
  member:"姜周伟",
  pay:'未交费'
},{
  key: '5',
  number: '5',
  team: '从一而终',
  ranking: '53',
  coach:'王伟荣',
  member:"姜周伟",
  pay:'未交费'
},{
  key: '6',
  number: '6',
  team: '从一而终',
  ranking: '63',
  coach:'王伟荣',
  member:"姜周伟",
  pay:'未交费'
}];

const columns = [{
  title: '队伍编号',
  dataIndex: 'number',
  key: 'number',
  align:'center',
  width:95
}, {
  title: '队名',
  dataIndex: 'team',
  key: 'team',
  align:'center',
  width:95
}, {
  title: '名次',
  dataIndex: 'ranking',
  key: 'ranking',
  align:'center',
  width:95
},{
  title: '领队/教练',
  dataIndex: 'coach',
  key: 'coach',
  align:'center',
  width:100
},{
  title: '队员',
  dataIndex: 'member',
  key: 'member',
  align:'center',

  render: () => member
},{
  title: '缴费状态',
  dataIndex: 'pay',
  key: 'pay',
  align:'center',
  width:95,
  render:()=>(<a style={{color:"red"}}>未交费</a>)
},{
  title: '',
  dataIndex: 'modify',
  key: 'modify',
  align:'center',
  width:95,
  render:()=>(<a>修改名单</a>)
}];
export default function() {
  return (
    <div style={{width:"900px"}}>
      <Table 
      bordered={true} 
      dataSource={dataSource}
      columns={columns} 
      rowClassName={() => 'editable-row'}
        />
    </div>
  );
}
