import React, { Component } from 'react';
import Carousel_2 from '@/component/Carousel_2'
import Banner from '@/component/Banner'
import styles from './index.css';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { lookup, turnData } from '@/utils/tools';
import odoo from '@/odoo-rpc/odoo';

class HomePage extends Component {
  state = {
    dataSource: []
  }
  componentDidMount() {
   this.getData()
  }
  getData = async () => {
    const Game = odoo.env('og.game');
    const domain = [['id', '>=', 0]];
    const fields = {
      id: null,
      name: null,
      team_ids: { id: null }
    }
    let dataSource = await Game.search_read(domain, fields);
    turnData(dataSource)
    await this.setState({
      dataSource,
      loading: false
    })
  }
  render() {
    const { dataSource } = this.state
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
export default HomePage