import React, { Component } from 'react';
import { Row, Col, Carousel, List, Icon } from 'antd';
import banner from '../../assets/banner.png'

const news = {
	list: [1, 2, 3, 4, 5].map(function (item) {
		return '石家庄桥牌协会新闻' + item
	})
}

class Banner extends Component {

	render() {
		return (
			<div>
				<Row>
					<Col xl={2} xs={2}></Col>
					<Col xl={8} xs={10}>
						<Carousel autoplay>
							<div><img src={banner} style={{ width: '100%' }} /></div>
							<div><img src={banner} style={{ width: '100%' }} /></div>
							<div><img src={banner} style={{ width: '100%' }} /></div>
						</Carousel>,
			</Col>
					<Col xl={2} xs={1}></Col>
					<Col xl={11} xs={10}>
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