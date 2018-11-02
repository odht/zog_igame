import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import './team.css';

import { lookup} from '@/utils/tools';
import { connect} from 'dva';


// // const member = (<div>
//                   <Row>
//                     <Col span={4}>111111</Col><Col span={4}>111111</Col><Col span={4}>111111</Col><Col span={4}>111111</Col><Col span={4}>111111</Col><Col span={4}>111111</Col>
//                   </Row>
//                   <Row>
//                     <Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col><Col span={4}>姜周伟</Col>
//                   </Row>
//                   <Row>
//                     <Col span={4}>56%</Col><Col span={4}>56%</Col><Col span={4}>56%</Col><Col span={4}>56%</Col><Col span={4}>56%</Col><Col span={4}>56%</Col>
//                   </Row>
//                 </div> )
const columns = [{
  title: '队伍编号',
  dataIndex: 'number',
  key: 'number',
  align: 'center',
  width: 95
}, {
  title: '队名',
  dataIndex: 'name',
  key: 'name',
  align:'center',
  width:95,
}, {
  title: '名次',
  dataIndex: 'ranking',
  key: 'ranking',
  align: 'center',
  width: 95
}, {
  title: '领队/教练',
  dataIndex: 'partner_id',
  key: 'partner_id',
  align:'center',
  width:100
},{
  title: '队员',
  dataIndex: 'player_ids',
  key: 'player_ids',
  align:'center',

  // render: () => member
},{
  title: '缴费状态',
  dataIndex: 'pay',
  key: 'pay',
  align:'center',
  width:95,
  // render:()=>(<a style={{color:"red"}}>未交费</a>)
},{

  title: '',
  dataIndex: 'modify',
  key: 'modify',
  align: 'center',
  width: 95,
  render: () => (<a>修改名单</a>)
}];

class DetailsTeam extends Component {
  componentWillMount(){
    const {dispatch} =this.props;
        dispatch({
            type:'ogGameTeam/search',
            payload:{}
        })
  }
  getdata = (model) => {//获取数据
    const { ids } =  this.props[model];
    const data =   this.props.odooData[model];
    
    const dataSource = lookup(ids, data);
    console.log(dataSource);
    return dataSource
    }
    
  render() {
    const dataSource=this.getdata('ogGameTeam')


class Team extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ogGameTeam/search',
      payload: {}
    })
  }
  getdata = (model) => {//获取数据
    const { ids } = this.props[model];
    const data = this.props.odooData[model];
    const dataSource = lookup(ids, data);
    console.log(dataSource)
    return dataSource
  }
  render() {
    const dataSource = this.getdata('ogGameTeam')
    return (
      <div style={{ width: "900px" }}>
        <Table
          bordered={true}
          // rowKey={row => row.id}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
          // scroll={{ y: 300 }} 
          />
      </div>)
  }
}

}
export default connect(({login,odooData,ogGameTeam})=>({login,odooData,ogGameTeam}))(DetailsTeam)
(({  odooData, ogGameTeam }) => ({  odooData, ogGameTeam }))(Team)

