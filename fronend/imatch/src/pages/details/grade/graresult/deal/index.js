import React, { Component } from "react";
import styles from './index.css'
import club from '@/assets/svg/club.svg';
import diamond from '@/assets/svg/diamond.svg';
import heart from '@/assets/svg/heart.svg';
import spade from '@/assets/svg/spade.svg';
import { Table } from "antd";
import { connect } from "dva";


// 引入odoo-rpc
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
  title: '桌号',
  dataIndex: 'number',
  render: renderNumber,
}, {
  title: '主队',
  dataIndex: 'ply1',
  colSpan: 2,
  // render: (text, row) => {
  //   return text.length > 1 ? `${row.ply1[2]}  ${row.ply1[1]}` : `${row.ply1[0]}`
  // }
}, {
  dataIndex: 'ply2',
  colSpan: 0,
  // render: (text, row) => {
  //   return text.length > 1 ? `${row.ply2[2]}  ${row.ply2[1]}` : `${row.ply2[0]}`
  // }
},
{
  title: "客队",
  dataIndex: 'ply3',
  colSpan: 2,
  // render: (text, row) => {
  // return text.length > 1 ? `${row.ply3[2]}  ${row.ply3[1]}` : `${row.ply3[0]}`
  // }
}, {
  dataIndex: 'ply4',
  colSpan: 0,
  // render: (text, row) => {
  // return text
  // return text.length > 1 ? `${row.ply4[2]}  ${row.ply4[1]}` : `${row.ply4[0]}`
  // }
}, {
  dataIndex: 'room_type'
}, {
  title: "庄家",
  dataIndex: 'declarer',
}, {
  title: "定约",
  dataIndex: 'contract',
}, {
  title: '结果',
  dataIndex: 'result',
}, {
  title: 'NS',
  dataIndex: 'ns_point',
}, {
  title: 'EW',
  dataIndex: 'ew_point',
}, {
  title: 'Datum',
}, {
  title: 'ximp',
}, {
  title: '主队IMP',
  dataIndex: 'host_imp',
  render: renderNumber,
}, {
  title: '客队IMP',
  dataIndex: 'guest_imp',
  render: renderNumber,
}]




// 嵌套






class Deal extends Component {
  state = {
    dealData: {},
    loading: true,
    isDone: true,
    roundData: {},
  }

  // 获取
  handleDeal = async (match_ids) => {
    const fields = {
      card_str: null,
      number: null,
      dealer: null,
      game: null,
      schedule_id: { id: null, name: null },
      phase: null,
      round: null,
      board_ids: {
        state: null,
        number: null,
        contract: null,  // 定约
        declarer: null,   //庄家
        result: null,     //结果
        ns_point: null, //南北得分,
        ew_point: null, //东西得分
        table_id: {
          id: null,
          room_type: null, // 开闭室
          south_id: { id: null, name: null }, //玩家
          north_id: { id: null, name: null },
          east_id: { id: null, name: null },
          west_id: { id: null, name: null },
          round_id: { id: null, name: null },
        },
        match_id: {
          phase_id: { id: null, name: null },
          id: null,
          name: null,
          number: null, //桌
          game_id: null,   //
          guest_vp: null,
          host_vp: null,
          host_imp: null,
          guest_imp: null,
          phase: null,
        },
      }

    }
    const id = parseInt(match_ids);
    const Deal = odoo.env('og.deal');
    const ptns = await Deal.browse(id, fields);
    const dealData = ptns.look(fields);
    const { card_str } = dealData;
    const { board_ids } = dealData;
    const bidding = board_ids.filter((item) => item.state != 'done');
    if (bidding.length == 0 ) {
      this.setState({
        isDone: false,
      })
    }
    this.setState({
      dealData,
      card_str,
    })
  }

  // 获取round
  handleGetRound = async (round_id) => {
    const fields = {
      id: null,
      name: null,
      game_id: { id: null, name: null },
      phase_id: { id: null, name: null },
    }
    const id = parseInt(round_id);
    const round = odoo.env('og.round');
    const rod = await round.browse(id, fields);
    const roundData = rod.look(fields);
    this.setState({
      roundData,
    })
  }
  componentDidMount() {
    const {
      location: { query: { deal_id, round_id } }
    } = this.props;
    this.handleDeal(deal_id)
    this.handleGetRound(round_id)
  }
  render() {
    const { dealData, card_str, isDone, roundData = {} } = this.state;

    const { phase_id = {}, name, game_id = {} } = roundData;
    const { name: phase } = phase_id;
    const { name: game } = game_id;
    // const { phase_id: { name: phase }, name, game_id: { name: game } } = roundData;
    let dealer = '';
    let BoardData = []
    if (dealData) {
      const { board_ids = [] } = dealData;
      dealer = dealData.dealer;
      board_ids.map(board => {
        const {
          contract,
          declarer,
          ew_point,
          ns_point,
          result,
          table_id: {
            south_id,
            north_id,
            east_id,
            west_id,
            room_type,
          },
          match_id: {
            guest_imp,
            guest_vp,
            host_imp,
            host_vp,
            id,
            name,
            number, } } = board;
        // 处理主队客队队员
        const [ply1, ply2, ply3, ply4] = room_type === 'open' ?
          [[north_id.name || '', 'N'], [south_id.name || '', 'S'], [east_id.name || '', 'E'], [west_id.name || '', 'W']]
          : [[east_id.name || '', 'E'], [west_id.name || '', 'W'], [north_id.name || '', 'N'], [south_id.name || '', 'S']]
        BoardData.push({
          ply1,
          ply2,
          ply3,
          ply4,
          contract,
          declarer,
          ew_point,
          ns_point,
          result,
          guest_imp,
          guest_vp,
          host_imp,
          host_vp,
          id,
          name,
          number,
          room_type
        });
      })
      BoardData.sort((arr1, arr2) => {
        return arr1.number - arr2.number
      }).sort((room1, room2) => {
        return room1.room_type - room2.room_type
      })
    }

    //　牌排列
    let n_card_str = [];
    let w_card_str = [];
    let e_card_str = [];
    let s_card_str = [];
    if (card_str) {
      const card_strArray = card_str.split(' ');
      const card_nwes_strArray = card_strArray.map(item => {
        return item.split('.');
      })
      n_card_str = card_nwes_strArray[0];
      w_card_str = card_nwes_strArray[1];
      e_card_str = card_nwes_strArray[2];
      s_card_str = card_nwes_strArray[3];
    }
    const cardsvg = (index) => {
      let src
      switch (index) {
        case 0:
          src = spade;
          break;
        case 1:
          src = heart;
          break;
        case 2:
          src = diamond;
          break
        case 3:
          src = club;
          break
        default:
          src = spade
          break;
      }

      return <img src={src} alt={index} className={styles.icons}></img>
    }
    const cardList = (cardArray) => {
      if (cardArray.length > 0) {
        return cardArray.map((item, index) => {
          return (
            <div key={index} className={styles.flex}>
              {cardsvg(index)}
              <p className={styles.cardText}>{item}</p>
            </div>

          )
        })
      } else {
        return ''
      }
    }
    return (
      <div>
        <div className={styles.matchText}>
          <h1>
            <span className={styles.matchTextGame}>{game}</span>
            <span className={styles.matchTextPhase}>{phase}</span>
            <span className={styles.matchTextRound}>{name}</span>
          </h1>
        </div>
        <div className={styles.header}>
          <div className={styles.table}>
            <div className={styles.tableN}> {isDone ? '' : cardList(n_card_str)}</div>
            <div className={styles.tableW}>{isDone ? '' : cardList(w_card_str)}</div>

            <div className={styles.tableN}></div>
            <div className={styles.tableW}></div>
            <div className={styles.tableNWES}>
              <div className={styles.tableN}>N</div>
              <div className={styles.tableW}>W</div>
              <div className={styles.tableE}>E</div>
              <div className={styles.tableS}>S</div>
            </div>
            <div className={styles.tableE}>{isDone ? '' : cardList(e_card_str)}</div>
            <div className={styles.tableS}>{isDone ? '' : cardList(s_card_str)}</div>
            <div className={styles.tableE}></div>
            <div className={styles.tableS}></div>
          </div>
          <div className={styles.datum}>
            <p>发牌人：{dealer}</p>
            <p>Datum 60</p>
          </div>
        </div>
        <Table
          bordered
          rowKey={row => row.id}
          dataSource={BoardData}
          columns={columns}
        />
      </div >
    )
  }
}


export default connect(({ odooData }) => ({ odooData }))(Deal)