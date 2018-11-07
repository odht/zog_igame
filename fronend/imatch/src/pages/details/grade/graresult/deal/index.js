import React, { Component } from "react";
import styles from './index.css'
import club from '@/assets/svg/club.svg';
import diamond from '@/assets/svg/diamond.svg';
import heart from '@/assets/svg/heart.svg';
import spade from '@/assets/svg/spade.svg';

import direction from '@/assets/direction.png';
import one from '@/assets/one.png';
import { Table, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { connect } from "dva";
import { lookup } from '@/utils/tools'

class Deal extends Component {
  state = {
    card_str: [],
    BoardData: [],
  }
  componentDidMount() {
    const {
      dispatch,
      location: { query: { deal_id } }
    } = this.props;
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
          this.setState({
            BoardData: BoardData,
          })
        })
      }

    })
  }
  shouldComponentUpdate(props, state) {
    const { BoardData, card_str } = state;
    if (BoardData.length > 0 && card_str.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { card_str, BoardData } = this.state;
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
    const cardList = (cardArray) => {
      if (cardArray.length > 0) {
        return cardArray.map(item => {
          return <p key={item} className={styles.cardText}>{item}</p>
        })
      } else {
        return ''
      }
    }
    const columns = [{
      title: '桌号',
      dataIndex: 'table_id',
      render: (text, record) => {
        return `${record.table_id[0]}`
      }
    }, {
      title: '主队',
      // children: [{
      //   dataIndex: ""
      // }, {
      //   dataIndex: ""
      // }]
      // colSpan: 2,
    }, {
      title: "客队",
      // children: [{
      //   dataIndex: '',
      // }, {
      //   dataIndex: '',
      // }]
      // colSpan: 2,
    }, {
      dataIndex: '',
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
    }, {
      title: '客队IMP',
      dataIndex: 'guest_imp',
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
            <div className={styles.tableN}>{cardList(n_card_str)}</div>
            <div className={styles.tableW}>{cardList(w_card_str)}</div>
            <div className={styles.tableNWES}>
              <div className={styles.tableN}>N</div>
              <div className={styles.tableW}>W</div>
              <div className={styles.tableE}>E</div>
              <div className={styles.tableS}>S</div>
            </div>
            <div className={styles.tableE}>{cardList(e_card_str)}</div>
            <div className={styles.tableS}>{cardList(s_card_str)}</div>
          </div>
          <div className={styles.datum}>
            <p>发牌人：{dealer}</p>
            <p>Datum 60</p>
          </div>
        </div>
        <Table
          rowKey={row => row.id}
          dataSource={BoardData}
          columns={columns}
        />
      </div>
    )
  }
}


export default connect(({ odooData }) => ({ odooData }))(Deal)