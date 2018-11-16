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
        const { dispatch, location: { query: table_id } } = this.props;
        const { type } = vals;
        let valus;
        if (type === "pass") {
            valus = {
                contract: 'Pass',
                openlead: '',
                result: 0,
                number: vals.number,
                declarer: null,
                id: vals.id
            }
        } else {
            valus = {
                contract: vals.contract.join(""),
                openlead: vals.openlead.join(""),
                result: vals.result.join("") === "=" ? 0 : parseInt(vals.result.join("")),
                number: vals.number,
                declarer: vals.declarer,
                id: vals.id
            }
        }
        if (vals) {
            const { id, declarer, contract, openlead, result } = valus;
            dispatch({
                type: 'ogBoard/writeResult',
                payload: { id, declarer, contract, openlead, result }
            }).then(() => {
                const { location: { query: { table_id } } } = this.props;
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
            })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.odooData.ogBoard) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        let scoringData = [];
        const { boardData } = this.state;

        if (boardData && boardData.length > 0) {
            scoringData = boardData.sort((currentVal, nextVal) => { return currentVal.id - nextVal.id });
            boardData.map(item => {
                if (!item.declarer) {
                    item.declarer = null
                }
                if (!item.contract) {
                    item.contract = null;
                }
                if (!item.openlead) {
                    item.openlead = null;
                }
                if (!item.result) {
                    item.result = null;
                } else {
                    const { result } = item;
                    if (result.toString().split('').length === 1 && result !== 0) {
                        item.result = `\+${item.result.toString()}`;
                    } else if (result.toString().split('').length === 1 && result === 0) {
                        item.result = `=${item.result.toString()}`;
                    } else {
                        item.result = item.result.toString();
                    }
                }
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