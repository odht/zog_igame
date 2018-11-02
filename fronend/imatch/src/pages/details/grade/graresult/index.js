//成绩以及排名
//LSY
//2018-9-6

import React, { Component } from 'react';
import ResultDataTable from '../../../../component/ResultDataTable';
import styles from './index.css';
import { Row, Col, Table } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import {lookup} from '@/utils/tools'

const columnRank=[{
    title:'赛队排名',
    children:[
        {title:'名词',dataIndex:'number',key:'number'},
        {title:'参赛队',dataIndex:'team',key:'team'},
        {title:'VPs',dataIndex:'vps',key:'vps',className:styles.red},
        {title:'罚分',dataIndex:'punish',key:'punish'},
    ]
}];
const dataRank=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(function(item){
    return {number:item,team:'衢州方正',vps:20,punish:''}
});
class result extends Component{
    id=this.props.location.query.id
    componentWillMount() {
        const {dispatch}=this.props;
        dispatch({
            type:'ogBoard/search',
            payload:{}
        })
    } 
    getdata = (model) => {//获取数据
        const { ids } = this.props[model];     
        const data = this.props.odooData[model];
		const dataSource = lookup(ids, data);
		return dataSource
	}
    render(){
        const data=this.getdata("ogBoard");
        console.log(data)
        return (
            <div>
                <div style={{ textAlign: 'center' }} >
                    <h2>公开团体赛 排位赛第1轮</h2>
                </div>
                
                <div>
                    <Row type='flex' justify='center'>
                        <Col span={9}>
                            <ResultDataTable />
                            <div style={{width:"600px"}}>
                                <Row>
                                    <Col span={12}>点击桌号 查看计分表</Col>
                                    <Col span={12}><Link to='/details/grade/score'>瑞士成绩赛表</Link></Col>
                                </Row>
                                <Row>
                                    <Col span={12}>点击队名 查看对阵记录</Col>
                                    <Col span={12}><Link to='/details/grade/score/rank'>瑞士成绩赛表（按名次排序）</Link></Col>
                                </Row>
                                <Row>
                                    <Col span={12}><Link to='/details/grade/datumn'>Datumn</Link>   </Col>
                                    <Col span={12}>牌：<Link to='/details/grade/1'>1</Link> 2 3 4 5 6 7 8</Col>
                                </Row>
                            </div>
                        </Col>
                        <Col  span={6}>
                         <Table
                            size='xs'
                            columns={columnRank}
                            dataSource={dataRank}
                            pagination={false}
                            bordered
                        />
                        </Col>
                    </Row>
                </div>
                
            </div>
        )
    }
}
export default connect(({odooData,ogBoard})=>({odooData,ogBoard}))(result)
