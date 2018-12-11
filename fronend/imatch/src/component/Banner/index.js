import React, { Component } from 'react';
import { Row, Col, Carousel, List, Icon } from 'antd';
import banner1 from '../../assets/c1.jpg'
import banner2 from '../../assets/c3.jpg'

const news = {
	list: [1, 2, 3, 4, 5].map(function (item) {
		return '智赛棋牌新闻' + item
	})
}

class Banner extends Component {

	render() {
		return (
			<div>
				<Row>
					<Col xl={2} xs={2}></Col>
					<Col xl={11} xs={11}>
						<Carousel autoplay>
							<div><img src={banner1} style={{ height:'350px',width:"100%" }} /></div>
							<div><img src={banner2} style={{height:'350px', width: '100%' }} /></div>
						</Carousel>,
			</Col>
					<Col xl={1} xs={1}></Col>
					<Col xl={9} xs={9}>
						<List
							dataSource={news.list}
							renderItem={item => (
								<List.Item actions={[<span>2018/9/19</span>, <Icon type="right" />]}>
									<div>{item}</div>
								</List.Item>
							)}
						/>
					</Col>
					<Col xl={1} xs={1}></Col>
				</Row>
			</div>

		);
	}

};


export default Banner;