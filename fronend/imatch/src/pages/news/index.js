import { Component } from "react";
import IndexCarousel from '../../component/IndexCarousel'
import {Row, Col , Card, List, Icon} from "antd";

const news ={ list:[1,2,3,4,5,6,7,8,9].map(function(item){
    return '石家庄桥牌协会新闻' + item
})}

export default class News extends Component{
    render(){
        return(
            <div>
                <IndexCarousel/>
                <Row gutter={50}>
                    <Col span={12}>
                        <Card title="全国新闻" bordered={false} >
                            <List
                                dataSource={news.list}
                                renderItem={item => (
                                <List.Item actions={[<span>2018/9/19</span>, <Icon type="right"/>]}>
                                    <div>{item}</div>
                                </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="石家庄新闻" bordered={false} >
                        <List
                                dataSource={news.list}
                                renderItem={item => (
                                <List.Item actions={[<span>2018/9/19</span>, <Icon type="right"/>]}>
                                    <div>{item}</div>
                                </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
