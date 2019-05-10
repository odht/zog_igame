/**
 * title: 首页 - 智赛棋牌
 */
import React, { Component } from 'react';
import { Menu, Carousel } from 'antd';
import styles from './index.less';
import topPic1 from '@/assets/topPic1.jpg';
import topPic2 from '@/assets/topPic2.jpg';
import topPic3 from '@/assets/topPic3.jpg';
import logo1 from '@/assets/icon.png';
import majiangPic from '@/assets/majiang.png';
import guojixqPic from '@/assets/gjxq1.jpg';
import zhongguoxqPic from '@/assets/zgxq.jpg';
import doudizhuPic from '@/assets/doudizhu.jpg';
import { Link } from 'dva/router';


const SubMenu = Menu.SubMenu;

// console.log('------home ------',props);
class NavigationBar extends Component {

    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <React.Fragment>

                {/* 时事新闻 */}
                <div className={styles.bigNews}>
                    时事新闻
          <span><Link to='./news' style={{ color: 'cadetblue' }}>更多 >></Link></span>
                </div>
                <Carousel autoplay className={styles.toppicCarousel}>
                    <img className={styles.toppic} src={topPic1} alt="新闻图片-1" />
                    <img className={styles.toppic} src={topPic2} alt="新闻图片-2" />
                    <img className={styles.toppic} src={topPic3} alt="新闻图片-3" />
                </Carousel>

                {/* 热门棋牌 */}
                <div className={styles.majorTitle}>
                    热门棋牌
          <span><Link to='./teaching' style={{ color: 'cadetblue' }}>更多 >></Link></span>
                </div>
                <div className={styles.majorList}>
                    <div className={styles.majorDiv}>
                        <img className={styles.majorPic} src={majiangPic} alt="技术推广" />
                        <div className={styles.majorName}>麻将</div>
                        <div className={styles.majorDescribe}>麻将，起源于中国，粤港澳地区俗称麻雀，由中国古人发明的博弈游戏，娱乐用具，一般用竹子、骨头或塑料制成的小长方块，上面刻有花纹或字样，北方麻将每副136张，南方麻将多八个花牌，分别是春夏秋冬，梅竹兰菊，共计144张。</div>
                    </div>
                    <div className={styles.majorDiv}>
                        <img className={styles.majorPic} src={zhongguoxqPic} alt="网站设计" />
                        <div className={styles.majorName}>中国象棋</div>
                        <div className={styles.majorDescribe}>中国象棋是起源于中国的一种棋戏，属于二人对抗性游戏的一种，在中国有着悠久的历史。由于用具简单，趣味性强，成为流行极为广泛的棋艺活动。</div>
                    </div>
                    <div className={styles.majorDiv}>
                        <img className={styles.majorPic} src={guojixqPic} alt="方案策划" />
                        <div className={styles.majorName}>国际象棋</div>
                        <div className={styles.majorDescribe}>国际象棋（Chess），又称西洋棋，是一种二人对弈的棋类游戏。棋盘为正方形，由64个黑白相间的格子组成；棋子分黑白两方共32枚，每方各16枚。虽然汉语称之为西洋棋或国际象棋，但是实际上它起源于亚洲，后由阿拉伯人传入欧洲，成为国际通行棋种，也是一项智力竞技运动，曾一度被列为奥林匹克运动会正式比赛项目。</div>
                    </div>
                    <div className={styles.majorDiv}>
                        <img className={styles.majorPic} src={doudizhuPic} alt="ERP系统定制" />
                        <div className={styles.majorName}>斗地主</div>
                        <div className={styles.majorDescribe}>斗地主，是一种在中国流行的纸牌游戏。游戏最少由3个玩家进行，用一副54张牌（连鬼牌），其中一方为地主，其余两家为另一方，双方对战，先出完牌的一方获胜。该扑克游戏最初流行于中国湖北武汉市汉阳区，现已逐渐在全球各地流行。</div>

                    </div>
                </div>
                {/* 最新赛事 */}
                <div className={styles.caseTitle}>
                    最新赛事
          <span><Link to='./games' style={{ color: 'cadetblue' }}>更多 >></Link></span>
                </div>
                <div className={styles.caseList}>
                    <img className={styles.casePic} src={topPic1} alt="案例-1" />
                    <img className={styles.casePic} src={topPic2} alt="案例-2" />
                    <img className={styles.casePic} src={topPic3} alt="案例-3" />
                </div>
                {/* 平台介绍 */}
                <div className={styles.companyInfoTitle}>平台介绍</div>
                <div className={styles.companyInfo}>
                    <img className={styles.companyInfoPic} src={logo1} alt="公司LOGO" />
                    <h2>智赛棋牌竞技平台</h2>
                    <p style={{ textIndent: '2em' }}>
                        “智赛竞技平台”系统是一款比赛娱乐双模块的棋牌竞技类产品。平台的长远规划不仅包含了桥牌、中国象棋、国际象棋、围棋、国际跳棋，后期还会麻将、斗地主、五子棋等当下热门的热门民间娱乐项目。<br />
                        项目一期重点是桥牌项目的研发推广，本平台桥牌项目的最大特点是解决了当前线下桥牌竞技无法在线上完美呈现的问题。 平台口号：<br />
                        <i style={{ textIndent: '2em', color: 'blue', fontSize: '16px', fontWeight: 'bolder' }}>便捷安全的线上享受,  原汁原味的线下体验</i><br />
                        平台三大优势：<br />
                        * 更贴合实际的竞技体验<br />
                        --- 打牌与视频相结合，100%还原线下<br />
                        * 更高的竞技性<br />
                        --- 高标准的竞技模式，低门槛的参赛标准<br />
                        * 更公平的竞技环境<br />
                        --- 大广角摄像头无死角监控，比赛期间工作人员实时监督，保证比赛公平公正<br />
                    </p>
                </div>
            </React.Fragment>
        );
    }
}



export default function () {
    return (
        <NavigationBar />
    );
}
