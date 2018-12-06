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
        {
            title: '名次', dataIndex: 'number', render: (text, index, key) => {
                return key + 1
            }
        },
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
            render: (text, record) => { return `${record.score_close.toFixed(2)}` }
        },
        { title: '罚分', dataIndex: 'punish' },
    ]
}];


class Graresult extends Component {
    state = {
        loading: true,
    }
    timer = null
    getData(props) {
        const {
            dispatch,
            location: { state: { roundData: { deal_ids, match_ids, team_info_ids } } }
        } = props;
        dispatch({
            type: "ogMatch/read",
            payload: { id: match_ids }
        })
        dispatch({
            type: 'ogTeamRoundInfo/read',
            payload: { id: team_info_ids }
        })
        dispatch({
            type: 'ogDeal/read',
            payload: { id: deal_ids }
        }).then(() => {
            this.setState({
                loading: false
            })
        })
    }
    componentDidMount() {
        this.getdatas()
    }
    getdatas = () => {
        this.getData(this.props)
        this.timer = setInterval(() => {
            this.getData(this.props)
        }, 180000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
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
            odooData: { ogMatch, ogTeamRoundInfo, ogDeal },
            location: { state: { roundData: { match_ids, team_info_ids, deal_ids, name, game_id, id } } },
            location: { state },
        } = this.props;
        const { loading } = this.state;
        // 牌组 
        const matchData = lookup(match_ids, ogMatch)
        const teamRoundInfoData = lookup(team_info_ids, ogTeamRoundInfo).sort((prestate, nextstate) => {
            return nextstate.score_close - prestate.score_close;
        });
        const dealData0 = lookup(deal_ids, ogDeal);
        const dealData = dealData0.map(item => {
            return (
                <Link
                    style={{ padding: 3 }}
                    key={item.id}
                    to={{
                        pathname: '/details/grade/graresult/deal',
                        query: { deal_id: item.id, round_id: id },
                        state,
                    }}>{item.number}
                </Link>
            )
        })
        return (
            <div>
                <div className={styles.title} >
                    <span>{game_id[1]} {name}</span>
                </div>

                <div>
                    <Row type='flex' justify='center'>
                        <Col xs={24} xl={16}  >
                            <ResultDataTable
                                loading={loading}
                                matchData={matchData}
                                state={state}
                            />
                            <div className={styles.dealData}>
                                {/*  <Row>
                                    <Col span={12}>点击桌号 查看计分表</Col>
                                    <Col span={12}><Link to='/details/grade/score'>瑞士成绩赛表</Link></Col>
                                </Row>
                                <Row>
                                    <Col span={12}>点击队名 查看对阵记录</Col>
                                    <Col span={12}><Link to='/details/grade/score/rank'>瑞士成绩赛表（按名次排序）</Link></Col>
                                </Row>
                             */}
                                {/*  <Col span={12}><Link to='/details/grade/datumn'></Link>   </Col>*/}
                                牌：{dealData}
                            </div>
                        </Col>
                        <Col xs={24} xl={8}>
                            {
                                <Table
                                    loading={loading}
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

            </div >
        )
    }
}

export default connect(({ odooData, ogGame }) => ({ odooData, ogGame }))(Graresult);
