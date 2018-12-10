//  成绩表
//  LSY
//  2018-9-6
import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.css';
import GradeList from '../../../component/GradeList';
import odoo from '@/odoo-rpc/odoo';
import { lookup, turnData } from '@/utils/tools'
class grade extends Component {
    state = {
        roundData: null,
        loading: true,
    }
    componentDidMount() {
        // const {
        //     location: { state: { gameData: { round_ids } } },
        //     dispatch,
        // } = this.props;
        // dispatch({
        //     type: "ogRound/read",
        //     payload: { id: round_ids }
        // }).then(() => {
        //     this.setState({
        //         loading: false,
        //     })
        // })
        const {
            location: { state: { gameData } },
        } = this.props;
        this.getData(gameData.id)
    }
    getData = async (ids) => {
        const fieldsTeam =
        {
            name: null,
            round_ids: {
                date_from: null,
                date_thru: null,
                deal_ids: { id: null },
                game_id: { id: null, name: null },
                match_ids: { id: null },
                name: null,
                number: null,
                phase_id: { id: null, name: null },
                schedule_id: { id: null, name: null },
                table_ids: { id: null },
                team_info_ids: { id: null },
            }
        }
        // const test = {
        //     date_from: null,
        //     date_thru: null,
        //     deal_ids: { id: null },
        //     game_id: { id: null, name: null },
        //     match_ids: { id: null },
        //     name: null,
        //     number: null,
        //     phase_id: { id: null, name: null },
        //     schedule_id: { id: null, name: null },
        //     table_ids: { id: null },
        //     team_info_ids: { id: null },
        // }
        // // const {
        // //     odooData: { ogRound },
        // //     location: { state: { gameData } },
        // // } = this.props;
        // const round_ids=this.props.location.state.gameData.round_ids
        // const round = odoo.env('og.round');
        // const ptnss = await round.browse(round_ids, test);
        // const roundsData = ptnss.look(test);
        // console.log(roundsData);
        


        const id = parseInt(ids, 10);
        const Game = odoo.env('og.game');
        const ptns = await Game.browse(id, fieldsTeam);
        const gameData = ptns.look(fieldsTeam);
        console.log(gameData);
        let roundData = gameData.round_ids;
        console.log(roundData);
        turnData(roundData);//不稳定的转换函数，以下注释部分更精准(直接修改字段)，用于修改成符合视图渲染的数据
        // roundData.map((item) => {
        //     item.deal_ids = this.turnArray(item.deal_ids);
        //     item.match_ids = this.turnArray(item.match_ids);
        //     item.team_info_ids = this.turnArray(item.team_info_ids);
        //     item.game_id = Object.values(item.game_id);
        //     return item
        // })

        await this.setState({
            roundData: gameData.round_ids,
            loading: false,
        })
    }
    turnArray = (data) => {
        return data.map((item) => Object.values(item)[0])
    }
    render() {
        const {
            odooData: { ogRound },
            location: { state: { gameData } },
        } = this.props;
        const { loading, roundData } = this.state;
        console.log(roundData);
        console.log(gameData.round_ids);

        return (
            <div className={styles.normal}>
                <GradeList
                    loading={loading}
                    dataSource={roundData}
                    gameData={gameData}
                />
            </div>
        )
    }
}
export default connect(({ odooData }) => ({ odooData }))(grade)
