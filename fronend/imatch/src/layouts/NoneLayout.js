import React, {Component} from 'react';
import styles from './NoneLayout.css';
import { Layout } from 'antd';
import logoPic from '../assets/zhiSaiLogo.png';
import { Link } from 'dva/router';

const{Header, Content, Footer} = Layout;

class NoneLayout extends Component{

    render(){

        return(
            <Layout className={styles.layout}>

                {/* 页头 */}
                <Header className={styles.header}>
                    <Link to='/home'>
                        <img className={styles.logo} src={logoPic} />
                    </Link>
                    
                </Header>
                {/* 内容 */}
                <Content className={styles.content}>
                    { this.props.children }
                </Content>
                {/* 页脚 */}
                <Footer className={styles.footer}>
                    <div className={styles.copyRight}>版权所有 © 2018 北京欧德慧通信息技术有限公司</div>
                    <div className={styles.copyRight}>京ICP备16000236号-1</div>
                </Footer>
            </Layout>
        );
    };
}

export default NoneLayout;