import React, { Component } from 'react';
import Scoringtable from '@/component/Scoringtable';
import styles from './score.css';
import { connect } from 'dva';
import { lookup } from '@/utils/tools';



@connect(({ odooData }) => ({ odooData }))
export default class Home extends Component {
    state = {
        boardData: []
    }
    componentDidMount() {
        const { dispatch, location: { query: { table_id } } } = this.props;
        dispatch({
            type: 'ogTable/read',
            payload: { id: parseInt(table_id) }
        }).then(() => {
            const { odooData: { ogTable } } = this.props;
            const tableData = lookup(parseInt(table_id), ogTable);
            const board_ids = tableData[0].board_ids;
            dispatch({
                type: 'ogBoard/read',
                payload: { id: board_ids }
            }).then(() => {
                const { odooData: { ogBoard } } = this.props;
                const boardData = lookup(board_ids, ogBoard)
                this.setState({
                    boardData: boardData
                })
            })
        })

    }
    writeSoringData = (vals) => {
        // const { dispatch } = this.props;
        // const valus = {
        //     contract: vals.contract.join(""),
        //     openlead: vals.openlead.join(""),
        //     result: vals.result.join(""),
        //     number: vals.number,
        //     declarer: vals.declarer,
        //     ew_point: vals.ew_point,
        //     ns_point: vals.ns_point,
        //     id: vals.id
        // }
        // const { id, declarer, contract, openlead, result } = valus;
        // dispatch({
        //     type: 'ogBoard/writeResult',
        //     payload: { id, declarer, contract, openlead, result }
        // }).then(() => {
        //     dispatch({
        //         type: 'ogBoard/read',
        //         payload: { id: 10 }
        //     })
        // })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.odooData.ogBoard) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        // const { odooData: { ogBoard } } = this.props;
        let scoringData = [];
        const { boardData } = this.state;

        if (boardData && boardData.length > 0) {
            console.log(boardData);
            scoringData = boardData;
            boardData.map(item => {
                
                // const { result } = item[0];
                // if (result.toString().split('').length === 1 && result !== '=') {
                //     result_new = `\+${item[0].result.toString()}`;
                // } else if (result.toString().split('').length === 1 && result === '=') {
                //     result_new = `=${item[0].result.toString()}`;
                // } else {
                //     result_new = item[0].result.toString();
                // }
                item.contract='dfefe'
                item.openlead='dfedfe'
                item.result = '++'
            })
        }
        return (
            <div>
                <div className={styles.headerTitle}>
                    <h1 className={styles.headerTitleText}>计分表</h1>
                </div>
                <div style={{ background: '#fff' }}>
                    <Scoringtable
                        writeSoringData={this.writeSoringData}
                        scoringData={scoringData}
                    />
                </div>
            </div>
        )
    }
}