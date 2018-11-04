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
        const {
            location: { state: { gameData: { round_ids } } },
            dispatch,
        } = this.props;
        dispatch({
            type: "ogRound/read",
            payload: { id: round_ids }
        })
    }
    render() {
        const {
            odooData: { ogRound },
            location: { state: { gameData } },
        } = this.props;
        return (
            <div className={styles.normal}>
                <GradeList
                    dataSource={ogRound}
                    gameData={gameData}
                />
            </div>
        )
    }
}
export default connect(({ odooData }) => ({ odooData }))(grade)
