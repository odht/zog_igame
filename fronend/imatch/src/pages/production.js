import React from 'react';
import { Row, Col, Card } from 'antd';
// import pic from '../assets/logo1.jpg';
import styles from './production.css';



class ProductLists extends React.Component{

    render(){

        return(
            <React.Fragment>
                <Row>
                    <Col xl={1} xs={1}></Col>
                    <Col xl={21} xs={21}>
                        <div className={styles.news}>
                            | 产品介绍 |
                        </div>
                        <Row>
                            <Col xl={1} xs={1}></Col>
                            <Col xl={22} xs={22}>
                                <Card title="智赛棋牌竞技平台" bordered={false} style={{textIndent: '2em'}}>
                                    <p>
                                      “智赛竞技平台”系统是欧德慧通信息技术有限公司2018年度公司的业务主项。它是一款由我公司自主研发的比赛娱乐双模块的棋牌竞技类产品。平台的长远规划不仅包含了现阶段我公司创新的桥牌线上竞技项目，后期还会有其他智运会赛事等热门项目。<br/>
                                       项目一期重点是桥牌项目的研发推广，本平台桥牌项目的最大特点是解决了当前线下桥牌竞技无法在线上完美呈现的问题。
                                        平台口号：<br/>
                                            便捷安全的线上享受  原汁原味的线下体验<br/>
                                        平台三大优势：<br/>
                                        * 更贴合实际的竞技体验<br/>
                                           --- 打牌与视频相结合，100%还原线下<br/>
                                        * 更高的竞技性<br/>
                                               --- 高标准的竞技模式，低门槛的参赛标准<br/>
                                        * 更公平的竞技环境<br/>
                                               --- 大广角摄像头无死角监控，比赛期间工作人员实时监督，保证比赛公平公正<br/>
                                    </p>
                                </Card>
                                <Card title="智慧乡村管理平台" bordered={false} style={{textIndent: '2em'}} >
                                    <p>
                                       “智慧乡村管理平台”是本公司研发的一款响应国家社会主义新农村建设政策的兼具乡村政务管理，职位招聘平台，民俗乡风交流的综合性的ERP管理系统。本系统通过互联网技术，信息通信技术实现了乡村管理的高效化，信息化，摆脱了以往乡村办事效率底，信息传播闭塞的问题，有效的提高了乡镇政府系统管理的工作效率。<br/>
                                    </p>
                                </Card>
                                <Card title="智达工厂ERP管理系统" bordered={false} style={{textIndent: '2em'}} >
                                    <p>
                                    “智达工厂ERP管理系统”，针对不同的生产流程提供多样的生产管理解决方案，能够帮助工厂组织高效的运营制造流程。从销售订单到工单处理、工艺路线制订和调度、订单履行和产品成本核算，该平台提供的解决方案可实时呈现生产流程中每个步骤的相关信息，帮助工厂做出更合理的决策。相较于传统的工厂管理方案，该方案使得工厂管理透明化，集中化，有效的减少了工厂资源浪费，为提高工厂的综合竞争力提供了极大地帮助。 <br/>
                                    </p>
                                </Card>

                            </Col>
                            <Col xl={1} xs={1}></Col>
                        </Row>
                    </Col>
                    <Col xl={1} xs={1}></Col>
                </Row>

            </React.Fragment>
        );
    }
}



export default ProductLists;
