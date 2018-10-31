import React, { Component } from 'react';
import { Row, Col, Carousel,List , Icon} from 'antd';
import banner from '../../assets/banner.png'

const news ={ list:[1,2,3,4,5,6,7,8,9].map(function(item){
    return '石家庄桥牌协会新闻' + item
})}

class Banner extends Component {
 
	render() {
		return(
			<Row>
				
			    <Col span={14}>
				  <Carousel autoplay>
				    <div><img src={banner} style={{width:'100%'}}/></div>
				    <div><img src={banner} style={{width:'100%'}}/></div>
				    <div><img src={banner} style={{width:'100%'}} /></div>
				  </Carousel>,
				</Col>
				<Col span={1}></Col>
				<Col span={8}>
					<List
			        dataSource={news.list}
			        renderItem={item => (
			          <List.Item actions={[<span>2018/9/19</span>, <Icon type="right"/>]}>
			            <div>{item}</div>
			          </List.Item>
			        )}
			      />
				</Col>
				
		    </Row>
		);
	}

};


export default Banner;