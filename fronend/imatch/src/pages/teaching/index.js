import React, {Component} from 'react';
import { Card,List, Avatar } from 'antd';
import styles from './index.less';
import culturePic from '../../assets/culture.jpg';
import logoPic from '../../assets/icon.png';
import logo from '../../assets/logo1.png'
import { Link } from 'dva/router';


const tabList = [{
    key: 'matchVideo',
    tab: '比赛录像',
}, {
    key: 'mvpTeaching',
    tab: '名家课堂',
}];

const contentList = {
    matchVideo: <div style={{width:'100%'}}>
        <div className={styles.videoBox}>
            <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
        </div>
        <div  className={styles.videoBox}>
            <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
        </div>
        <div  className={styles.videoBox}>
            <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
        </div>
        <div  className={styles.videoBox}>
            <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
        </div>
        <div  className={styles.videoBox}>
            <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
        </div>
    </div>,
    mvpTeaching: <div style={{width:'100%'}}>
    <div className={styles.videoBox}>
        <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
    </div>
    <div  className={styles.videoBox}>
        <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
    </div>
    <div  className={styles.videoBox}>
        <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
    </div>
    <div  className={styles.videoBox}>
        <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
    </div>
    <div  className={styles.videoBox}>
        <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
    </div>
    <div  className={styles.videoBox}>
        <video src="http://player.youku.com/player.php/sid/XMzkxODU2NzY1Ng==/v.swf" controls="controls"></video>
    </div>
</div>,
};

class MineBlock extends Component{
    
    state = {
        key: 'matchVideo',
        noTitleKey: 'app',
    }
    
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }

    render(){

        const data = [
            {
                title: '中国桥牌协会标准自然体系',
                description: '中国桥牌协会标准自然体系中国桥牌协会标准自然体系中国桥牌协会标准自然体系中国桥牌协会标准自然体系中国桥牌协会标准自然体系中国桥牌协会标准自然体系'
            },
            {
                title: '世界桥联2013年20VP生成器',
                description: '世界桥联2013年20VP生成器世界桥联2013年20VP生成器世界桥联2013年20VP生成器'
            },
            {
                title: '中国桥牌竞赛规则',
                description: '中国桥牌竞赛规则中国桥牌竞赛规则中国桥牌竞赛规则中国桥牌竞赛规则'
            },
            {
                title: '常用循环赛轮次表',
                description: '常用循环赛轮次表常用循环赛轮次表常用循环赛轮次表'
            },
        ];
        return(
            <React.Fragment>
                <img className={styles.culturePic} src={culturePic} alt="企业文化"/>

                <div className={styles.videoClass}>
                    视频教程
                    <span><Link to='./' style={{color:'cadetblue'}}>更多 >></Link></span>
                </div>
                <div>
                    <Card
                    style={{ width: '100%'}}
                    title=""
                    bordered={false}
                    // extra={<a href="#">更多</a>}
                    tabList={tabList}
                    defaultActiveTabKey={'matchVideo'}
                    activeTabKey={this.state.key}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                    >
                    {contentList[this.state.key]}
                    </Card>
                </div> 
                <div className={styles.bookClass}>
                    资料库
                    <span><Link to='./' style={{color:'cadetblue'}}>更多 >></Link></span>
                </div>
                <div style={{marginTop:'10px'}}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={logoPic} />}
                            title={<a href="https://">{item.title}</a>}
                            description={item.description}
                            />
                        </List.Item>
                        )}
                    />
                </div>
                <div className={styles.ABCClass}>
                    新手指南
                    <span><Link to='./' style={{color:'cadetblue'}}>更多 >></Link></span>
                </div>
                <div style={{marginTop:'10px', marginBottom:'100px'}}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={logoPic} />}
                            title={<a href="https://">{item.title}</a>}
                            description={item.description}
                            />
                        </List.Item>
                        )}
                    />
                </div>
                
            </React.Fragment>
        );
    };
}


export default MineBlock;