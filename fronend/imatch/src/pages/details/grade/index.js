//  成绩表
//  LSY
//  2018-9-6
import React, { Component } from 'react'
import { connect } from 'dva'
import { lookup } from '@/utils/tools'
import styles from './index.css';
import GradeList from '../../../component/GradeList';


class grade extends Component {
    componentDidMount() {
        const { location: { query: { id } }, dispatch } = this.props;
        //请求ogGame
        dispatch({
            type: 'ogGame/read',
            payload: { id: parseInt(id) }
        }).then(() => {
            const { odooData: { ogGame } } = this.props;
            const { round_ids } = lookup(id, ogGame);
            dispatch({
                type: "ogRound/read",
                payload: { id: round_ids }
            })
        })
    }
    render() {
        const { odooData: { ogRound } } = this.props;
        return (
            <div className={styles.normal}>
                <GradeList
                    dataSource={ogRound}
                />
            </div>
        )
    }
}
export default connect(({ odooData, ogGameRound }) => ({ odooData, ogGameRound }))(grade)
