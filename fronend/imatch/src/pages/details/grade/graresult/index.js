//成绩以及排名
//LSY
//2018-9-6

import React, { Component } from 'react';
import ResultDataTable from '../../../../component/ResultDataTable';
import styles from './index.css';
import { Row, Col, Table } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { lookup ,turnData} from '@/utils/tools';
import odoo from '@/odoo-rpc/odoo';

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
        matchData:null,
        dealData:null,
        teamInfodealData:null,
    }
    timer = null
    turnArray=(data)=>{
        return data.map((item)=>Object.values(item)[0])
    }
    getData(props) {
        // const {
        //     dispatch,
        //     location: { state: { roundData: { deal_ids, match_ids, team_info_ids } } }
        // } = props;
        // console.log(deal_ids, match_ids, team_info_ids);
        
        // dispatch({
        //     type: "ogMatch/read",
        //     payload: { id: match_ids }
        // })
        // dispatch({
        //     type: 'ogTeamRoundInfo/read',
        //     payload: { id: team_info_ids }
        // })
        // dispatch({
        //     type: 'ogDeal/read',
        //     payload: { id: deal_ids }
        // }).then(() => {
        //     // this.setState({
        //     //     loading: false
        //     // })
        // })
    }
    componentDidMount() {
        
        // this.getdatas()
        this.getNewData()
    }
    // getdatas = () => {
    //     this.getData(this.props)
    //     // this.timer = setInterval(() => {
    //     //     this.getData(this.props)
    //     // }, 180000)
    // }
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
    getNewData=async ()=>{
        const {
            location: { state: { roundData: { match_ids, team_info_ids, deal_ids, name, game_id, id } } },
            location: { state },
        } = this.props;
        const matchFileds={
            close_table_id:{id:null,name:null},
            date_from:null,
            date_thru:null,
            deal_ids:{id:null},
            game_id:{id:null,name:null},
            guest_id:{id:null,name:null},
            guest_imp:null,
            guest_vp:null,
            host_id:{id:null,name:null},
            host_imp:null,
            host_vp:null,
            imp_manual:null,
            line_ids:{id:null},
            name:null,
            number:null,
            open_table_id:{id:null,name:null},
            phase_id:{id:null,name:null},
            round_id:{id:null,name:null},
            vp_manual:null,
        }
        const dealFields={
            card_str:null,
            dealer:null,
            game_id:{id:null,name:null},
            name:null,
            number:null,
            schedule_id:{id:null,name:null},
            vulnerable:null,
            board_ids:{id:null},
        }
        const teamInfoFields={
            id: null,
            name: null,
            imp: null,
            last_in_phase: null,
            imp_opp: null,
            number: null,
            phase_id: { id: null, name: null },
            opp_team_id: { id: null, name: null },
            score: null,
            score_close: null,
            score_manual: null,
            score_uom: null,
            vp: null,
            vp_opp: null,
            game_id: { id: null, name: null },
            team_id: { id: null, name: null },
            match_id: { id: null, name: null },
            round_id: { id: null, name: null },
        }
        const Match = odoo.env('og.match');
        const ptns = await Match.browse(match_ids, matchFileds);
        let matchData = ptns.look(matchFileds);
        const Deal=odoo.env('og.deal');
        const dealptn=await Deal.browse(deal_ids,dealFields);
        let dealData=dealptn.look(dealFields);
       
        const TeamInfo=odoo.env('og.team.round.info');
        const TeamInfoptn=await TeamInfo.browse(team_info_ids,teamInfoFields);
        let teamRoundInfoData=TeamInfoptn.look(teamInfoFields);
        turnData(matchData);
        turnData(dealData);
        turnData(teamRoundInfoData);
         const dealLinkData=dealData.map(item => {
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
            console.log(dealData);
            
        await this.setState({
            matchData,
            dealData:dealLinkData,
            teamRoundInfoData,
            loading:false
        })
        console.log(matchData,dealData,teamRoundInfoData);
        
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
        
        const {matchData,teamRoundInfoData,dealData}=this.state
        console.log(teamRoundInfoData,dealData);
        
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
