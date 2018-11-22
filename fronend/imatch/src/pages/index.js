import React, { Component } from 'react';
import { Carousel, Card, Button, Modal, List } from 'antd';
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';
import styles from './index.css';

export default class HomeHome extends Component {
    state = {
        visible: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }



    handleCancel = () => {
        this.setState({ visible: false });
    }

    render() {
        const data = [
            '成绩查询：',
            '1 成绩查询网址：  http://www.odooht.com；',
            '2 各轮赛后，可以通过上述网址查询成绩；',

            '成绩录入：',
            '1 比赛期间，各桌使用 pad 录入成绩',
            '比赛成绩录入网址: http://www.odooht.com；',
            '2 各桌左上角有本桌的登录账号和密码；',
            '3  开室各桌登录账号为 100 + 桌号，如 101、102、103、…；',
            '闭室各桌登录账号为 200 + 桌号，如201、202、203、…；',
            '4 各桌密码为7位。账号 + 点 + 账号，如：账号101的密码是101.101；',
            '5 每一轮赛前，仔细核对自己所在牌桌，确定账号与桌号对应；',
            '6 需要同时记录三联记分表！赛后务必自行结分，并向裁判长交计分表；',
            '7 成绩有误，请向裁判长汇报；',
            '8 不要试图去修改成绩，一切以三联计分表为准！',

            '裁判工作须知：',
            '1 各轮比赛前后，专人负责所有平板的收发；',
            '2 每一轮比赛前，协助各桌牌手使用平板进入系统、输入账号和密码；',
            '3 每一轮期间，密切关注各桌的进度；',
            '4 每一轮比赛结束前，协助各桌核对三联计分表与pad的成绩；',
            '5 每一轮比赛结束前，提醒各桌自行结分；',
            '6 各轮比赛间隙期间，有专人在赛场巡视；',
            '7 确保大屏幕显示当前轮累计成绩；',
            '8 保证两台查询用电脑正常使用；'
        ];

        const { visible } = this.state;
        return (
            <div>
                <div className={styles.news}>
                    | 动态 |
                </div>
                <div className={styles.carousuel}>

                    <div className={styles.box}>
                        <Carousel autoplay={true}>
                            <div>
                                <img src={c1} />
                            </div>
                            <div>
                                <img src={c2} />
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className={styles.news}>
                    | 活动 |
                </div>
                <div style={{ background: '#ECECEC', padding: 20 }}>
                    <Card title="2018年河北省省会桥牌等级赛" bordered={false}>
                        <div className={styles.company}>
                            <a target="view_window" href="http://124.42.117.43:8001"><Button size="large" style={{ margin: '0 20px' }} type="primary">赛事录分入口</Button></a>
                            <a target="view_window" href="http://localhost:8000/home"><Button size="large" style={{ margin: '0 20px' }} type="primary">赛事查询入口</Button></a>
                            <Button size="large" style={{ margin: '0 20px' }} type="primary" onClick={this.showModal}>
                                使用需知
                                </Button>
                            <Modal
                                visible={visible}
                                title="使用需知"
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" type="primary" onClick={this.handleCancel}>确认</Button>,

                                ]}
                            >
                                <List
                                    size="small"
                                    split={false}
                                    dataSource={data}
                                    renderItem={item => (<List.Item>{item}</List.Item>)}
                                />
                            </Modal>
                        </div>
                    </Card>
                </div>

            </div>
        )
    }
}



