import React, { Component } from "react";
import { Card, Row, Col, Table, Button } from "antd";
import { connect } from 'dva';
import styles from './index.css';
import { deepCopy,turnData } from '@/utils/tools'
import odoo from '@/odoo-rpc/odoo';
const renderNumber = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    if (index % 2 === 0) {
        obj.props.rowSpan = 2;
    } else {
        obj.props.rowSpan = 0;
    }
    return obj;
};

const columns = [{
    title: '牌号',
    dataIndex: 'number',
    render: renderNumber,
    align: "center",
}, {
    title: '房间',
    dataIndex: 'room_type',
    align: "center",
}, {
    title: '庄家',
    dataIndex: 'declarer',
    align: "center",
}, {
    title: '定约',
    dataIndex: 'contract',
    align: "center",
}, {
    title: '结果',
    dataIndex: 'result',
    align: "center",
    render: (text) => {
        if (parseInt(text) > 0) {
            return `+${text}`
        } else {
            return text
        }
    }
}, {
    title: 'NS',
    dataIndex: 'ns_point',
    align: "center",
    render: (text) => {
        if (text == '0') {
            return ''
        } else {
            return text;
        }
    }
}, {
    title: 'EW',
    dataIndex: 'ew_point',
    align: "center",
    render: (text) => {
        if (text == '0') {
            return ''
        } else {
            return text;
        }
    }
}, {
    title: 'IMPs',
    children: [{
        title: '主队',
        dataIndex: 'host_imp',
        render: renderNumber,
        align: "center",
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };
            if (index % 2 === 0) {
                if (value == '0') {
                    obj.props.rowSpan = 2;
                    obj.children = ""
                } else {
                    obj.props.rowSpan = 2;
                }
            } else {
                obj.props.rowSpan = 0;
            }
            return obj;
        }
    }, {
        title: '客队',
        dataIndex: 'guest_imp',
        render: renderNumber,
        align: "center",
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };
            if (index % 2 === 0) {
                if (value == '0') {
                    obj.props.rowSpan = 2;
                    obj.childrenls = ""
                } else {
                    obj.props.rowSpan = 2;
                }
            } else {
                obj.props.rowSpan = 0;
            }
            return obj;
        }
    }]
}];
const dataSource = [
    { number: 1, room: "开", banker: "E", dingyue: "1NT", result: "-1", ns: "150", ew: "", host: "12", guest: "" },
    { number: 1, room: "闭", banker: "S", dingyue: "2NT", result: "2", ns: "", ew: "100", host: "0", guest: "23" },
    { number: 2, room: "开", banker: "E", dingyue: "1NT", result: "-1", ns: "150", ew: "", host: "", guest: "23" },
    { number: 2, room: "闭", banker: "S", dingyue: "2NT", result: "2", ns: "", ew: "100", host: "", guest: "23" },
    { number: 3, room: "开", banker: "E", dingyue: "1NT", result: "-1", ns: "150", ew: "", host: "12", guest: "" },
    { number: 3, room: "闭", banker: "S", dingyue: "2NT", result: "2", ns: "", ew: "100", host: "12", guest: "23" }

]
class Round extends Component {
    state = {
        dealData:{},
        lineData:{},
        tableData:{},
        loading: true,
    }
    printText = React.createRef();
    componentDidMount() {
        this.getdata()
        // const {
        //     location: { state: { matchData } },
        // } = this.props
        // const {
        //     dispatch,
        // } = this.props;

        // dispatch({
        //     type: 'ogDeal/read',
        //     payload: { id: matchData.deal_ids }
        // })
        // dispatch({
        //     type: 'ogTable/read',
        //     payload: { id: [matchData.open_table_id[0], matchData.close_table_id[0]] }
        // })
        // dispatch({
        //     type: 'ogMatchLine/read',
        //     payload: { id: matchData.line_ids },
        // }).then(() => {
        //     // this.setState({
        //     //     loading: false,
        //     // })
        // })
    }
    handlerPrintScore() {

        var newstr = document.getElementById('print').innerHTML;
        document.body.innerHTML = newstr;
        window.print();
        return false;
    }
    getdata =async () => {
        const {
            location: { state: { matchData } },
        } = this.props
        const tableFields = {
            north_id: null,
            west_id: null,
            east_id: null,
            south_id: null,
        }
        const matchLineFields = {
            open_declarer: null,
            close_declarer: null,
            open_contract: null,
            close_contract: null,
            open_result: null,
            close_result: null,
            open_ns_point: null,
            close_ns_point: null,
            open_ew_point: null,
            close_ew_point: null,
            host_imp: null,
            guest_imp: null,
            open_board_id: null,
            close_board_id: null,
        }
        const dealFields={
            number:null
        }
        const {deal_ids,line_ids}=matchData;
        const table_ids=[matchData.open_table_id[0], matchData.close_table_id[0]];

        const MatchLine = odoo.env('og.match.line');
        const originLineData = await MatchLine.read(line_ids,matchLineFields);

        const Deal=odoo.env('og.deal');
        const originDealData=await Deal.read(deal_ids,dealFields);
       
        const Tables=odoo.env('og.table');
        const originTableData=await Tables.read(table_ids,tableFields);

        const lineData=turnData(deepCopy(originLineData))
        const dealData=turnData(deepCopy(originDealData))
        const tableData=turnData(deepCopy(originTableData))

        await this.setState({
            lineData,
            dealData,
            tableData,
            loading:false
        })
    }
    render() {
        const {
            location: { state: { matchData } },
        } = this.props

        const { loading,dealData,tableData,lineData } = this.state;
        // const dealData = lookup(matchData.deal_ids, ogDeal);
        // 开id, 闭室id
        // const tableData = lookup([matchData.open_table_id[0], matchData.close_table_id[0]], ogTable);
        // 开室 N W E S 人
        let openN, openW, openE, openS;
        // 闭室 N W E S人
        let closeN, closeW, closeE, closeS;
        // 结分表
        // const lineData = lookup(matchData.line_ids, ogMatchLine);
        // 牌号 房间 庄家 定约 结果 NS EW IMPS 主队 客队
        // let number, room_type, declarer, contract, result, NS, EW, IMPS_host, IMPS_Guest;
        // opme_room  close_room;
        let open_room = [];
        let close_room = [];
        //imps vps 比分
        let IMPS = '';
        let Vps = '';
        // match 比赛名称 轮次  双方名称 imps vps 比分
        let match_name, match_round, matchVs;
        if (tableData && tableData.length > 0) {
            openN = tableData[0].north_id[1];
            openW = tableData[0].west_id[1];
            openE = tableData[0].east_id[1];
            openS = tableData[0].south_id[1];
            closeN = tableData[1].north_id[1];
            closeW = tableData[1].west_id[1];
            closeE = tableData[1].east_id[1];
            closeS = tableData[1].south_id[1];
        }
        //　　比赛对手　轮次　imps vps 比分
        if (lineData && lineData.length > 0) {
            IMPS = `${matchData.host_imp} : ${matchData.guest_imp}`
            Vps = `${matchData.host_vp.toFixed(2)} : ${matchData.guest_vp.toFixed(2)}`
            match_name = matchData.game_id[1];
            match_round = matchData.round_id[1];
            matchVs = <span className={styles.match}>{matchData.host_id[1]} <span className={styles.VS}>VS</span> {matchData.guest_id[1]}</span>
        }
        if (lineData && lineData.length > 0) {
            lineData.map((item, index) => {
                //总Vps
                // open_Vps += item.host_vps;
                // close_Vps += item.guest_vps;
                // 牌号
                const number = dealData[index] ? dealData[index].number : '';
                // 房间开闭室
                const open_room_type = '开';
                const close_room_type = '闭';
                // 庄家
                const open_declarer = item.open_declarer;
                const close_declarer = item.close_declarer;
                //定约
                const open_contract = item.open_contract;
                const close_contract = item.close_contract;
                //结果 
                const open_result = item.open_result;
                const close_result = item.close_result;
                //NS得分
                const open_ns_point = item.open_ns_point;
                const close_ns_point = item.close_ns_point;
                //EW得分
                const open_ew_point = item.open_ew_point;
                const close_ew_point = item.close_ew_point;
                //IMPs
                const host_imp = item.host_imp;
                const guest_imp = item.guest_imp;
                //id 
                const open_id = item.open_board_id[0];
                const close_id = item.close_board_id[0];
                open_room.push({
                    room_type: open_room_type,
                    number: number,
                    declarer: open_declarer,
                    contract: open_contract,
                    result: open_result,
                    ns_point: open_ns_point,
                    ew_point: open_ew_point,
                    host_imp: host_imp,
                    guest_imp: guest_imp,
                    id: open_id,
                })
                close_room.push({
                    room_type: close_room_type,
                    number: number,
                    declarer: close_declarer,
                    contract: close_contract,
                    result: close_result,
                    ns_point: close_ns_point,
                    ew_point: close_ew_point,
                    host_imp: host_imp,
                    guest_imp: guest_imp,
                    id: close_id,
                })
            })
        }
        const lineArray = [...open_room, ...close_room];
        // 排序
        const lineSource = lineArray.sort((a, b) => {
            return b.id - a.id && a.number - b.number;
        })
        return (
            <div style={{ width: "800px", margin: "0 auto" }}>
                <div className={styles.butbox}>
                    <Button
                        type="primary"
                        onClick={this.handlerPrintScore}
                        className={styles.printButton}>
                        打印成绩
                  </Button>
                </div>
                <div id="print" >
                    <h2 style={{ textAlign: "center", marginTop: 15 }}>{match_name}：{match_round}</h2>
                    <div style={{ textAlign: "center", 'fontSize': 20, marginBottom: 10 }}>{matchVs}</div>
                    <Row type="flex" justify="end">
                        <Col span={10} >
                            <Card
                                title="开室"
                                bordered={true}
                                style={{ width: 330 }}
                                headStyle={{ background: "green", textAlign: "center" }}
                            >
                                <div className={styles.header}>
                                    <div className={styles.table}>
                                        <div className={styles.tableN}>{openN}</div>
                                        <div className={styles.tableW}>{openW}</div>
                                        <div className={styles.tableNWES}>
                                            <div className={styles.tableN}>N</div>
                                            <div className={styles.tableW}>W</div>
                                            <div className={styles.tableE}>E</div>
                                            <div className={styles.tableS}>S</div>
                                        </div>
                                        <div className={styles.tableE}>{openE}</div>
                                        <div className={styles.tableS}>{openS}</div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={4}></Col>
                        <Col span={10}>
                            <Card
                                title="闭室"
                                bordered={true}
                                style={{ width: 334 }}
                                headStyle={{ background: "green", textAlign: "center" }}
                            >
                                <div className={styles.header}>
                                    <div className={styles.table}>
                                        <div className={styles.tableN}>{closeN}</div>
                                        <div className={styles.tableW}>{closeW}</div>
                                        <div className={styles.tableNWES}>
                                            <div className={styles.tableN}>N</div>
                                            <div className={styles.tableW}>W</div>
                                            <div className={styles.tableE}>E</div>
                                            <div className={styles.tableS}>S</div>
                                        </div>
                                        <div className={styles.tableE}>{closeE}</div>
                                        <div className={styles.tableS}>{closeS}</div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Table
                        loading={loading}
                        style={{ marginTop: 10 }}
                        rowKey={row => row.id}
                        bordered
                        columns={columns}
                        pagination={false}
                        dataSource={lineSource}
                        size='xs'
                    />
                    <Row >
                        <Col className={styles.IMPS} span={6} >IMPs</Col><Col className={styles.IMPSr} span={18} >{IMPS}</Col>
                        <Col span={6} className={styles.vps}>VPs</Col><Col className={styles.vpsr} span={18}>{Vps}</Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Round