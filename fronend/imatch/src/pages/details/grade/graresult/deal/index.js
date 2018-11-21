import React, { Component } from "react";
import styles from './index.css'
import club from '@/assets/svg/club.svg';
import diamond from '@/assets/svg/diamond.svg';
import heart from '@/assets/svg/heart.svg';
import spade from '@/assets/svg/spade.svg';

import { Table } from "antd";
import { connect } from "dva";
import { lookup } from '@/utils/tools'





class Deal extends Component {
  state = {
    card_str: [],
    BoardData: [],
    isDone: true,
    loading: true,
  }
  componentDidMount() {
    const {
      dispatch,
      location: { query: { deal_id } }
    } = this.props;
    //　BoardData　组合
    let BoardTable = [];
    dispatch({
      type: 'ogDeal/read',
      payload: { id: parseInt(deal_id) }
    }).then(() => {
      const { odooData: { ogDeal } } = this.props;
      const card_strData = lookup(deal_id, ogDeal);
      const board_ids = card_strData[0].board_ids;
      if (card_strData.length > 0) {
        this.setState({
          card_str: card_strData[0].card_str,
        })
        dispatch({
          type: 'ogBoard/read',
          payload: { id: board_ids }
        }).then(() => {

          const { odooData: { ogBoard } } = this.props;
          const BoardData = lookup(board_ids, ogBoard)

          const table_ids = BoardData.map(item => item.table_id[0])
          // const match_ids = Array.from(new Set(BoardData.map(item => item.match_id[0])))
          const match_ids = BoardData.map(item => item.match_id[0]);
          const a = BoardData.filter((item) => item.state != 'done');
          if (a.length == 0) {
            this.setState({
              isDone: false,
            })
          }
          dispatch({
            type: 'ogTable/read',
            payload: { id: table_ids },
          }).then(() => {
            const { odooData: { ogTable } } = this.props;
            const tableData = lookup(table_ids, ogTable);
            BoardTable = tableData.map(item => {
              const [ply1, ply2, ply3, ply4] = item.room_type === 'open' ?
                [[...item.north_id || '', 'N'], [...item.south_id || '', 'S'], [...item.east_id || '', 'E'], [...item.west_id || '', 'W']]
                : [[...item.east_id || '', 'E'], [...item.west_id || '', 'W'], [...item.north_id || '', 'N'], [...item.south_id || '', 'S']]
              return {
                room_type: item.room_type,
                ply1, ply2, ply3, ply4

              }
            })
          })

          dispatch({
            type: 'ogMatch/read',
            payload: { id: match_ids },
          }).then(() => {
            const { odooData: { ogMatch } } = this.props;
            const matchData = lookup(match_ids, ogMatch);
            BoardTable = BoardTable.map((item, key) => {
              const matchNumber = matchData[key].number;
              const BoardDataItem = BoardData[key];
              return item = { ...item, match_number: matchNumber, ...BoardDataItem };
            })
            this.setState({
              BoardData: BoardTable,
              loading: false,
            })
          })
        })
      }
    })
  }
  render() {
    const { card_str, BoardData, isDone, loading } = this.state;
    //发牌人 比赛名称 排位　第几轮
    let dealer = '';
    let game = '';
    let phase = '';
    let round = '';
    if (BoardData.length > 0) {
      dealer = BoardData[0].dealer;
      game = BoardData[0].game_id[1];
      phase = BoardData[0].phase_id[1];
      round = BoardData[0].round_id[1];
    }
    //　牌排列
    let n_card_str = [];
    let w_card_str = [];
    let e_card_str = [];
    let s_card_str = [];
    if (card_str.length > 0) {
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
      dataIndex: 'match_number',
      render: renderNumber,
    }, {
      title: '主队',
      dataIndex: 'ply1',
      colSpan: 2,
      render: (text, row) => {
        return text.length > 1 ? `${row.ply1[2]}  ${row.ply1[1]}` : `${row.ply1[0]}`
      }
    }, {
      dataIndex: 'ply2',
      colSpan: 0,
      render: (text, row) => {
        return text.length > 1 ? `${row.ply2[2]}  ${row.ply2[1]}` : `${row.ply2[0]}`
      }
    },
    {
      title: "客队",
      dataIndex: 'ply3',
      colSpan: 2,
      render: (text, row) => {
        return text.length > 1 ? `${row.ply3[2]}  ${row.ply3[1]}` : `${row.ply3[0]}`
      }
    }, {
      dataIndex: 'ply4',
      colSpan: 0,
      render: (text, row) => {
        return text.length > 1 ? `${row.ply4[2]}  ${row.ply4[1]}` : `${row.ply4[0]}`
      }
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
    return (
      <div>
        <div className={styles.matchText}>
          <h1>
            <span className={styles.matchTextGame}>{game}</span>
            <span className={styles.matchTextPhase}>{phase}</span>
            <span className={styles.matchTextRound}>{round}</span>
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
            {/*<p>Datum 60</p>*/}
          </div>
        </div>
        <Table
          bordered
          loading={loading}
          rowKey={row => row.id}
          dataSource={BoardData}
          columns={columns}
        />
      </div>
    )
  }
}


export default connect(({ odooData }) => ({ odooData }))(Deal)