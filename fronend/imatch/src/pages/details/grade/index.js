//  成绩表
//  LSY
//  2018-9-6
import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.css';
import GradeList from '../../../component/GradeList';


class grade extends Component {
    state = {
        loading: true,
    }
    componentDidMount() {
        const {
            location: { state: { gameData: { round_ids } } },
            dispatch,
        } = this.props;
        dispatch({
            type: "ogRound/read",
            payload: { id: round_ids }
        }).then(() => {
            this.setState({
                loading: false,
            })
        })
    }
    render() {
        const {
            odooData: { ogRound },
            location: { state: { gameData } },
        } = this.props;
        const { loading } = this.state;
        return (
            <div className={styles.normal}>
                <GradeList
                    loading={loading}
                    dataSource={ogRound}
                    gameData={gameData}
                />
            </div>
        )
    }
}
export default connect(({ odooData }) => ({ odooData }))(grade)
