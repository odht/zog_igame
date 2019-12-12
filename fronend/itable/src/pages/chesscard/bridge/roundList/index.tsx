/**
 * title: 轮次列表 - 智赛棋牌
 */
import React, { PureComponent, useReducer } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin, Row, Col, Card } from 'antd';
import Odoo from '@/odoo'
import { connect } from 'dva';
import { PopData, turnData, ChangeIndexArrayInArry } from '@/utils';
import { BridgeProps, doing_table_ids, _id } from '..';
import Search from './search';
import styles from './index.less';
import { close } from 'fs';
//props,和state
interface DvaLocation extends Location {
    state: {
        game_id: number
        doing_table_ids: Array<doing_table_ids>
    },
}
interface GameListProps extends BridgeProps {
    location?: DvaLocation;
}
interface GameListState {
    dataSource: Array<any>,
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
        if (!props.location.state||!props.location.state.game_id) {
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
        const { location: { state: { game_id, } } } = this.props;
        const cls = Odoo.env('og.round');
        console.log(this.state)
        domain = [...domain, ...[['game_id', '=', game_id,]]]
        const ids = await cls.search_read(domain, {}, { order: 'id' });
        console.log(ids);
        await this.setState({ totalIds: turnData(ids) })
    }
    changeData = (domain) => {
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
        const { location: { state: { game_id } } } = this.props;
        this.setState({ loading: true });
        const cls = Odoo.env('og.round');
        const fields = {
            name: null,
            number: null,
            room_type: null,
            date_from: null,
            date_thru: null,
            state: null,
            phase_id: null
        }
        const pageIds = await this.getIds(page, pageSize)
        console.log(pageIds)
        let dataSource = await cls.read(pageIds, fields);

        this.setState({
            dataSource: dataSource,
            loading: false,
        })
    }
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
    aaa = (data) => {
        console.log(data);
        const { location: { state } } = this.props;
        router.push({
            pathname: '/chesscard/bridge/gameList',
            state: {
                ...state,
                round_id: data.id
            }
        })
    }
    render() {
        const { dataSource, loading, totalIds, doing_table_id, domain } = this.state;
        const { location: { state: { game_id } } } = this.props;
        const total = totalIds.length
        // const url="http://192.168.1.131:3000/search?"+'sid='+localStorage.getItem('sid')+'&uid='+localStorage.getItem('uid')
        const url = '/igame/#/game/' + Number(doing_table_id);
        // const url='https://www.baidu.com/'
        console.log(this.state);
        return (
            <>
                <Search
                    loading={loading}
                    domain={domain}
                    changeData={this.changeData}
                    game_id={game_id}
                />
                <Spin spinning={loading} >
                    <div className="gutter-example" style={{ width: '100%', height: '100%' }}>
                        <Row gutter={16}>
                            {dataSource.map((item, index) => {
                                return (
                                    <Col
                                        key={index}
                                        className={styles.gutterRow}
                                        xs={24} sm={24} md={4} lg={4} xl={4}
                                        onClick={this.aaa.bind(this, item)}>

                                        <Card title={item.phase_id.name}> {item.name.split(item.phase_id.name)[1]} </Card>
                                    </Col>
                                )
                            })
                            }
                        </Row>
                    </div>
                </Spin>
            </>
        )
    }
}
export default connect(({ login }) => ({ login }))(GameList)