//  成绩表
//  LSY
//  2018-9-6
import React,{Component} from 'react'
import {connect} from 'dva'
import {lookup} from '@/utils/tools'
import styles from './index.css';
import GradeList from '../../../component/GradeList';
import * as detail from '../../../../mock/detail';
import Search from 'antd/lib/input/Search';

const { gradeData } = detail;
class grade extends Component{
    componentWillMount(){
        const dispatch=this.props.dispatch;
        const {query}=this.props.location
        const id=query.id
        dispatch({
            type:"ogGameRound/search",
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
        const dataSource=this.getdata('ogGameRound')
        console.log(dataSource);
        
        return(
            <div className={styles.normal}>
            <GradeList
                dataSource={dataSource}
            />
        </div>
        )
    }
}
export default connect(({odooData,ogGameRound})=>({odooData,ogGameRound}))(grade)
