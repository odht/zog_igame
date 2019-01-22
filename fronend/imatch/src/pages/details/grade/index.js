//  成绩表
//  LSY
//  2018-9-6
import React, { Component } from 'react'
import styles from './index.css';
import GradeList from '../../../component/GradeList';
import odoo from '@/odoo-rpc/odoo';
import { deepCopy, turnData } from '@/utils/tools'
class grade extends Component {
    state = {
        roundData: null,
        loading: true,
    }
    componentDidMount() {
        const {
            location: { state: { gameData } },
        } = this.props;
        this.getData(gameData.id)
    }
    getData = async (ids) => {
        const fieldsTeam =
        {
            name: null,
            id:null,
            player_ids:{id:null,name:null},
			team_ids:null,
            round_ids: {
                date_from: null,
                date_thru: null,
                deal_ids: null,
                game_id: null,
                match_ids: null,
                name: null,
                number: null,
                phase_id: null,
                schedule_id: null,
                table_ids: null,
                team_info_ids: null,
            }
        }
        const id = parseInt(ids, 10);
        const Game = odoo.env('og.game');
        const gameData = await Game.read(id, fieldsTeam);
        const originRoundData = gameData.round_ids;

        const roundData=turnData(deepCopy(originRoundData));//不稳定的转换函数，用于修改成符合视图渲染的数据

        await this.setState({
            roundData: roundData,
            loading: false,
        })
    }
    turnArray = (data) => {
        return data.map((item) => Object.values(item)[0])
    }
    render() {
        const {
            location: { state: { gameData } },
        } = this.props;
        const { loading, roundData } = this.state;

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
export default grade
