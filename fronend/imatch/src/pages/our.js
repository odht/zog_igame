import React from 'react';
import our1 from '../assets/our2.jpg';
import styles from './our.css';
import { Card } from 'antd';

export default props => {
    return (
        <div style={{ background: 'rgb(236, 236, 236)', padding: 20 }}>
            <div style={{ background: '#fff' }}>
                <div className={styles.images} >
                    <img src={our1} />
                </div>
                <div className={styles.about}>
                    <div className={styles.abouttop}>ABOUT US</div>
                    <div className={styles.aboutbottom}>————  关于我们  ————</div>
                </div>
                <div style={{ background: '#ECECEC', paddingTop: 20 }}>
                    <Card title="公司介绍" bordered={false}>
                        <div className={styles.company}>
                            <p>北京欧德慧通信息技术有限公司，于2015年2月7日在北京中关村软件园注册，注册资金100万。是一家长期致力于ERP/CRM管理软件的咨询、营销、培训、实施、服务及开发于一体的管理信息化服务公司；为企业提供专业财务管理、供应链管理、生产管理、协同办公管理、客户关系管理、人力资源管理等信息化系统。</p>
                            <p>公司秉承“真诚、专业、创新”为的价值理念，为广大企业的信息化建设提供全面的支持与帮助。真诚是做人的根本，专业是做事的基础，创新是发展的源泉。欧德慧通公司成立之初，即以服务社会为己任。发挥自身技术优势，不断为社会提供优质的专业的互联网产品与服务。</p>
                            <p>多年以来本着“诚实做人，踏实做事，用心服务”的宗旨，通过我们的专业水平和不懈努力,三年来，一直秉承以用户需求为核心，在专注互联网市场开拓的同时,为多家企业提供技术服务，优质、用心的服务赢得了众多企业的信赖和好评，逐渐树立起公司良好品牌。并且完善了售后服务体系。我们相信,通过我们的不断努力和追求，一定能够实现与各个企业的互利共赢。</p>

                        </div>
                    </Card>

                </div>
                <div style={{ background: '#ECECEC', paddingTop: 20 }}>
                    <Card title="联系我们" bordered={false}>
                        <div className={styles.contact}>
                            <div><span>企业：</span>北京欧德慧通信息技术有限公司</div>
                            <div><span>联系人：</span>张先生</div>
                            <div><span>手机：</span>13910133451</div>
                            <div><span>邮箱：</span>18631185643@163.com</div>
                            <div><span>地址：</span>石家庄市裕华区建设南大街269号</div>
                        </div>
                    </Card>

                </div>
            </div>
        </div>

    )
}


