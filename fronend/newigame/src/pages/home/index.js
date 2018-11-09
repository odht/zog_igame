import React, { Component } from 'react';
import Scoringtable from '../../component/Scoringtable';
import styles from './index.css';
import { connect } from 'dva';
import { lookup } from '@/utils/tools';



@connect(({ odooData }) => ({ odooData }))
export default class Home extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'ogBoard/read',
            payload: { id: 10 }
        })
    }
    writeSoringData = (vals) => {
        const { dispatch } = this.props;
        const valus = {
            contract: vals.contract.join(""),
            openlead: vals.openlead.join(""),
            result: vals.result.join(""),
            number: vals.number,
            declarer: vals.declarer,
            ew_point: vals.ew_point,
            ns_point: vals.ns_point,
            id: vals.id
        }
        const { id, declarer, contract, openlead, result } = valus;
        dispatch({
            type: 'ogBoard/writeResult',
            payload: { id, declarer, contract, openlead, result }
        }).then(() => {
            dispatch({
                type: 'ogBoard/read',
                payload: { id: 10 }
            })
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.odooData.ogBoard) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const { odooData: { ogBoard } } = this.props;
        let scoringData = [];
        if (ogBoard) {
            let result_new = '';
            scoringData = lookup([10], ogBoard);
            const { result } = scoringData[0];
            if (result.toString().split('').length === 1 && result !== '=') {
                result_new = `\+${scoringData[0].result.toString()}`;
            } else if (result.toString().split('').length === 1 && result === '=') {
                result_new = `=${scoringData[0].result.toString()}`;
            } else {
                result_new = scoringData[0].result.toString();
            }
            scoringData[0].result = result_new
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