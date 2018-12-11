import React, { Component } from 'react';
import { Carousel, Card, Button, Modal, List, Row, Col } from 'antd';
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';
import c3 from '../assets/c3.jpg';
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
            '*** 选手须知 ***',
            '临时网址：http://www.odhtqyy.com;',
            '正式域名备案中，请留存。http://www.odooht.com;',

            '成绩查询网址：http://www.odhtqyy.com;',
            '进主页后，点击＂赛事查询入口＂按钮。 成绩实时直播;',

            '成绩录入网址：http://www.odhtqyy.com;',
            '进主页后，点击＂赛事录分入口＂按钮。 录入成绩;',

            '1．比赛期间，各桌使用计分器录入成绩;',
            '2． 各桌左上角有本桌的登录账号和密码;',
            '3． 开室各桌登录账号为 100 + 桌号，如 101、102、103、…，闭室各桌登录账号为 200 + 桌号，如201、202、203、…;',
            '4．各桌密码为7位。账号 + 点 + 账号，如账号101的密码是101.101;',
            '5．每一轮赛前，仔细核对自己所在牌桌，确定账号与桌号对应;',
            '6．甲级A组桌号为1,2,3号，甲级B组桌号为4,5,6号，乙级桌号为7,8,9,10号;登录成功后，录入成绩界面显示 开闭室,桌号,赛段,轮次, 主队号,客队号 ;如：open, 1, A组循环赛.1,  2 vs 4。表示开室1号桌A组第1轮, 2号队 对 4号队;',
            '7．甲级A组队号为1到6号，甲级B组队号为7到12号，乙级队号为81到88号;',
            '8．录入过程中，有录入错误需要修改，召请裁判协助解决。;',
            '9．每轮成绩录入完成，双方队员核对无误后，点击“提交审核”按钮。之后无法修改;',
            '10．需要同时记录三联记分表！赛后务必自行结分，并向裁判长交计分表;',
            '11．成绩有误，请向裁判长汇报。有争议时，一切以三联计分表为准！;',

            '*** 裁判工作须知 ***',
            '1．各轮比赛前后，专人负责所有计分器的收发;',
            '2．赛前，协助各桌牌手使用计分器输入网址、账号、密码;',
            '3．提醒各桌，认真核对“开闭室、桌号、赛段、轮次、主客队号”;',
            '4．赛中，密切关注各桌的进度。协助牌手录入成绩;',
            '5．每轮结束前，协助各桌核对三联计分表与计分器的成绩;',
            '6．每轮结束前，提醒各桌自行结分;',
            '7．各轮比赛间隙期间，有专人在赛场巡视;',
            '8．确保大屏幕显示当前轮累计成绩;',
            '9．保证两台查询用电脑正常使用;',
            '10．每轮结束后，数据库做备份;',
        ];

        const { visible } = this.state;
        return (
            <Row>
                <Col xl={1} xs={1}></Col>
                <Col xl={22} xs={22}>




                    <div className={styles.news}>
                        | 动态 |
                    </div>
                    <div className={styles.carousuel}>
                        <Carousel autoplay={true}>
                            <div className={styles.box}>
                                <img src={c1} alt="贺词" />
                            </div>
                            <div className={styles.box}>
                                <img src={c2} alt="技术介绍" />
                            </div>
                            <div className={styles.box}>
                                <img src={c3} alt="智赛棋牌竞技平台" />
                            </div>
                        </Carousel>
                    </div>



                    <div className={styles.news}>
                        | 活动 |
                    </div>
                    <Row>
                        <Col xl={1} xs={1}></Col>
                        <Col xl={22} xs={22}>
                            <div style={{ background: '#ECECEC', padding: 20, marginTop: 40 }}>
                                <Card title="2018年河北省省会桥牌等级赛" bordered={false}>
                                    <div className={styles.entry}>
                                        <a target="view_window" href="http://124.42.117.43:8001">
                                            <Button size="large" style={{ margin: '0 20px' }} type="primary">赛事录分入口</Button>
                                        </a>
                                        <a target="view_window" href="http://localhost:8000/home">
                                            <Button size="large" style={{ margin: '0 20px' }} type="primary">赛事查询入口</Button>
                                        </a>
                                        <div className={styles.news} style={{ paddingTop: '10px' }}></div>
                                        <Card title="系统使用须知" bordered={false}>
                                            <List
                                                className={styles.list}
                                                size="small"
                                                split={false}
                                                dataSource={data}
                                                renderItem={(item) => (<List.Item  >{item}</List.Item>)}
                                            />
                                        </Card>

                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col xl={1} xs={1}></Col>
                    </Row>
                </Col>
                <Col xl={1} xs={1}></Col>
            </Row>
        )
    }
}



