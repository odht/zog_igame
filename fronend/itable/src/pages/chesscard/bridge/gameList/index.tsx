/**
 * title: 游戏桌位 - 智赛棋牌
 */
import React, { PureComponent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin, Tag, Popconfirm } from 'antd';
import Odoo from '@/odoo'
import { connect } from 'dva';
import { PopData, turnData, ChangeIndexArrayInArry } from '@/utils';
import { BridgeProps, doing_table_ids, _id } from '..';
import play from '@/assets/player.svg'
import odoo from '@/odoo';
//props,和state
interface DvaLocation extends Location {
    state: {
        game_id: number
        round_id: number
    },
}
interface GameListProps extends BridgeProps {
    location?: DvaLocation;
}
interface GameListState {
    dataSource: Array<doing_table_ids>,
    loading: boolean,
    totalIds: Array<number>,
    doing_table_id: doing_table_ids,
    dataCache: {},
    pageConfig: {
        page: number,
        pageSize: number
    },
    domain: Array<any>
}
const config = {
    top: "N",
    bottom: "S",
    left: "W",
    right: "E"
}
const Player = (props) => {
    console.log(props);
    const { data, place, type, changeData, location: { state: { userData, game_id, team_ids } } } = props
    const [href, setHref] = useState(React.createRef())
    const team_id = team_ids.filter(item => item.game_id.id === game_id)[0].id
    const partner_id = Number(userData.partner_id.id)
    const table_id = data.table_ids.filter(item => item.room_type === type)[0].id

    const hasPeople = () => {
        const { table_player_ids, room_type } = data.table_ids.find(item => item.room_type === type)
        const has = table_player_ids.length >= 0 && table_player_ids.findIndex(item => item.position === config[place]) > -1
        let player
        if (has) {
            player = table_player_ids.find(item => item.position === config[place])
            console.log(player)
        }
        return { has, player }
    }
    const { has, player } = hasPeople()
    const isUser = player ? player.name === localStorage.userName : false
    const sitdown = async () => {
        const cls = odoo.env('og.table')
        const data = await cls.call('sit_down', [table_id, { partner_id, team_id, pos: config[place] }])
        console.log(data)
        changeData().then((val) => {
            if (data[0] === 0) {
                localStorage.player_id = data[1].player_id
                localStorage.partner_id = userData.partner_id.id
                localStorage.team_id = team_id
                localStorage.table_id = table_id
            }
        })

    }
    const gotoGame = () => {
        if (isUser) {
            href.href = `http://192.168.1.147:3000/#/game?player_id=${localStorage.player_id}&partner_id=${localStorage.partner_id}&table_id=${table_id}&userName=${localStorage.userName}`
            href.click()
        }

    }
    return (
        <div style={{ width: 35, height: 35, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {has ?
                <>
                    <Popconfirm cancelText="取消" okText="确认" title="确定进入游戏？" onConfirm={gotoGame}>
                        <Tag style={{ margin: 0 }} color={isUser && player.online ? "red" : player.online ? "green" : ""}>{player.name}</Tag>
                    </Popconfirm>
                    <a target="_blank" href={"#"} ref={(href) => { setHref(href) }}></a>
                </>
                :
                <Popconfirm cancelText="取消" okText="确认" title="确定选择此方位？" onConfirm={sitdown}>
                    <img src={play} style={{ width: "100%" }} />
                </Popconfirm>
            }
        </div>
    )
}
class GameList extends PureComponent<GameListProps, GameListState> {
    state: GameListState = {
        dataSource: [],
        loading: true,
        totalIds: [],
        doing_table_id: undefined,
        dataCache: {},
        pageConfig: {
            page: 1,
            pageSize: 8
        },
        domain: []
    }
    static getDerivedStateFromProps(props, state) {
        if (!props.location.state || !props.location.state.round_id) {
            router.replace('/chesscard/bridge')
        }
        return { ...state }

        // if (doing_table_ids.length > 0) {
        //     return { ...state, round_id: doing_table_ids[0].round_id.id, domain: [['game_id', '=', game_id]] }
        // } else {
        //     return { ...state, }
        // }

    }

    componentDidMount() {
        const { location: { state } } = this.props;
        if (!state) {
            router.replace('/chesscard/bridge');
        } else if (this.props.login.sid && localStorage.sid) {
            const result = this.getTotal()
            result.then(() => {
                this.getData()
            })
        }
    }

    getTotal = async (domain = []) => {
        const { location: { state: { game_id, round_id } } } = this.props;
        const cls = Odoo.env('og.match');
        console.log(this.state)
        domain = [...domain, ...[['game_id', '=', Number(game_id),], ['round_id', '=', Number(round_id)]]]
        // const doing_ids = doing_table_ids.map((item) => item.id);
        const ids = await cls.search_read(domain, {}, { order: 'id' });
        await this.setState({ totalIds: turnData(ids) })
    }
    changeData = async (domain) => {
        console.log(domain)
        this.setState({ loading: true })
        const result = this.getTotal(domain)
        result.then(() => {
            this.getData()
        })
    }
    /**
     * 获取数据时的起始id
     */
    getIds = (page = 1, pageSize = 8, ) => {
        const start = (page - 1) * pageSize
        const end = pageSize * page
        const { totalIds } = this.state
        console.log(totalIds);
        return totalIds
    }

    getData = async (page = 1, pageSize = 8) => {
        const { location: { state } } = this.props;
        console.log(state)
        this.setState({ loading: true });
        const cls = Odoo.env('og.match');
        const fields = {
            name: null,
            number: null,
            match_id: null,
            round_id: null,
            date_from: null,
            date_thru: null,
            table_ids: {
                room_type: null,
                table_player_ids: {
                    name: null,
                    position: null,
                    online: null,
                },
            },
            state: null,
        }
        const pageIds = await this.getIds(page, pageSize)
        console.log(pageIds)
        let dataSource = await cls.read(pageIds, fields)
        let a = await odoo.env('og.table.player').search_read([['id', '>=', 0]], { position: null, online: null })

        // let dataSource = await cls.read(pageIds, fields);
        console.log(dataSource, a);
        // 添加一个可标记的属性user，以便渲染组件区分
        // dataSource.forEach((item, index) => {
        //     if (doing_table_ids.map((item) => item.id).indexOf(item.id) > -1) {
        //         dataSource[index].user = true
        //     }
        // })

        this.setState({
            dataSource: dataSource,
            loading: false,
        })
    }
    // test = async () => {
    //     const { location: { state: { game_id } } } = this.props;
    //     const fields = {
    //         number: null,
    //         match_id: null,
    //         room_type: null,
    //         round_id: null,
    //         date_from: null,
    //         date_thru: null,
    //         state: null,
    //         player_ids: {
    //             name: null
    //         }
    //     }
    //     const cls = Odoo.env('og.table');
    //     const domain = this.state.domain || [['game_id', '=', game_id,],];
    //     const data = await cls.search_read(domain, fields) || [];
    //     console.log(data);
    //     const trueData = data.filter((item) => {
    //         if (item.state !== 'done') {
    //             const play = item.player_ids.map((item) => item.name);
    //             if (play.indexOf(localStorage.userName) > -1) {
    //                 return true
    //             }
    //         } else {
    //             return false
    //         }
    //     })
    //     console.log(trueData);
    // }
    title = (item) => (
        <span>{item.round_id.name + item.number}
            <span style={{ marginLeft: '3PX', fontSize: "12px" }}>
                {/* <Tag color={item.room_type === 'open' ? "#108ee9" : 'red'}>{item.room_type}</Tag> */}
            </span>
        </span>
    )
    extra = (item) => (
        <span
        >
            {item.name.split(',')[1]}
        </span>
    )
    jump = (item, e) => {
        if (item.user && item.state !== 'done' && item.state !== 'cancel' && item.state !== 'close') {
            this.setState({
                doing_table_id: item.id
            })
            localStorage.setItem('doing_table_id', item.id)
        } else {
            alert('已经打过此桌')
            e.preventDefault()
        }
    }
    renderSit = (data, type, place) => {
        return (
            <Player data={data} place={place} type={type} {...this.props} changeData={this.getData} />
        )
    }
    render() {
        const { dataSource, loading, totalIds, doing_table_id, domain } = this.state;
        const { location: { state: { game_id } } } = this.props;
        const total = totalIds.length
        // const url="http://192.168.1.131:3000/search?"+'sid='+localStorage.getItem('sid')+'&uid='+localStorage.getItem('uid')
        // const url = '/igame/#/game/' + Number(doing_table_id);
        // const url='https://www.baidu.com/'
        console.log(this.state);
        return (
            <>
                {/* <Search
                    loading={loading}
                    domain={domain}
                    changeData={this.changeData}
                    game_id={game_id}
                /> */}
                <Spin spinning={loading}>

                    <TableCard
                        dataSource={dataSource}
                        size={30}
                        scale={0.1}
                        title={this.title}
                        extra={this.extra}
                        render={this.renderSit}

                    />
                    {total > 4 ?
                        <Pagination
                            pageSize={8}
                            onChange={this.getData}
                            total={total} />
                        : null
                    }
                </Spin>
            </>
        )
    }
}

export default connect(({ login }) => ({ login }))(GameList)