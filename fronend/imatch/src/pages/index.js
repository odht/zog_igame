import React, { Component } from 'react';
import Carousel_2 from '@/component/Carousel_2'
import Banner from '@/component/Banner'
import styles from './index.css';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { lookup } from '@/utils/tools';

@connect(({ odooData, ogGame }) => ({ odooData, ogGame }))
export default class HomePage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ogGame/search',
      payload: {}
    })
  }

  getdata = (model) => {//获取数据
    const { ids } = this.props[model];
    const data = this.props.odooData[model];
    const dataSource = lookup(ids, data);
    return dataSource
  }
  render() {
    const dataSource = this.getdata('ogGame') || []
    return (
      <div style={{ marginTop: '20px' }}>
        <div >
          <div className={styles.news}>
            | 新闻 |
              {/*<span>more</span>*/}
          </div>
          <Banner />
          <div className={styles.news}>
            | 赛事 |
            <Link to="/game">
              <span>more</span>
            </Link>

          </div>
          <Carousel_2 ogGameData={dataSource} />
        </div>
      </div>
    );
  }
}
