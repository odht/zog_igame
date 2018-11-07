//成绩以及排名
//LSY
//2018-9-6

import React, { Component } from 'react';
import ResultDataTable from '../../../../component/ResultDataTable';
import styles from './index.css';
import { Row, Col, Table } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { lookup } from '@/utils/tools'

const columnRank = [{
    title: '赛队排名',
    children: [
        { title: '名次', dataIndex: 'number' },
        {
            title: '参赛队',
            dataIndex: 'rankTeam',
            key: 'team',
            render: (text, record) => { return `${record.team_id[1]}` }
        },
        {
            title: 'VPs',
            dataIndex: 'rankTeam',
            className: styles.red,
            render: (text, record) => { return `${record.score}` }
        },
        { title: '罚分', dataIndex: 'punish' },
    ]
}];


class Graresult extends Component {
    componentDidMount() {
        const {
            dispatch,
            location: { state: { roundData: { match_ids, team_info_ids } } }
        } = this.props;
        dispatch({
            type: "ogMatch/read",
            payload: { id: match_ids }
        })
        dispatch({
            type: 'ogTeamRoundInfo/read',
            payload: { id: team_info_ids }
        })
    }
    shouldComponentUpdate(props, state) {
        const { odooData: { ogTeamRoundInfo } } = props;
        if (ogTeamRoundInfo) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        // 比赛对战数据
        const {
            odooData: { ogMatch, ogTeamRoundInfo },
            location: { state: { roundData: { match_ids, team_info_ids } } },
            location: { state },
        } = this.props;
        // 牌组 
        let deal = [1];

        const matchData = lookup(match_ids, ogMatch)
        const teamRoundInfoData = lookup(team_info_ids, ogTeamRoundInfo);
        if (matchData && matchData.length > 0) {
            matchData.map(matchItem => {
                deal = matchItem.deal_ids;
            })
        }
        const dealData = deal.sort().map(item => {
            return <Link
                key={item}
                to={{
                    pathname: '/details/grade/deal',
                    query: { deal_id: item },
                    state,
                }}>{item}    </Link>
        })
        return (
            <div>
                <div style={{ textAlign: 'center' }} >
                    <h2>公开团体赛 排位赛第1轮</h2>
                </div>

                <div>
                    <Row type='flex' justify='center'>
                        <Col span={9}>
                            <ResultDataTable
                                matchData={matchData}
                                state={state}
                            />
                            <div style={{ width: "600px" }}>
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
                                    <Col span={12}>牌：{dealData}</Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={6}>
                            {
                                <Table
                                    rowKey={record => record.id}
                                    size='xs'
                                    columns={columnRank}
                                    dataSource={teamRoundInfoData}
                                    pagination={false}
                                    bordered
                                />
                            }
                        </Col>
                    </Row>
                </div>

            </div>
        )
    }
}

export default connect(({ odooData, ogGame }) => ({ odooData, ogGame }))(Graresult);
