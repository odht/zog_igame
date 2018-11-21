import React, {
	Component
} from 'react';
import { Row, Col, Carousel, Icon } from 'antd';
import { Link } from 'dva/router';
import match3 from '../../assets/cname.png';
function NextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", width: "45px", height: "45px", right: "-45px", marginTop: "-22px" }}
			onClick={onClick}
		>
			<Icon type="right" style={{ color: "red", fontSize: "45px" }} />
		</div>
	);
}

function PrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", width: "45px", height: "45px", left: "-45px", marginTop: "-22px" }}
			onClick={onClick}
		>
			<Icon type="left" style={{ color: "red", fontSize: "45px" }} />
		</div>
	);
}

const settings = {
	infinite: true,
	className: "center",
	slidesToShow: 1,
	slidesToScroll: 1,
	speed: 500,
	// centerPadding: "60px",
	dots: false,
	arrows: true,
	nextArrow: <NextArrow />,
	prevArrow: <PrevArrow />
};

class HomeCarousel extends Component {
	render() {
		const ogGame = this.props.ogGameData.length > 0 ? this.props.ogGameData[0] : { name: "" }
		return (
			<Row type="flex" justify="center">
				<Col span={20}>
					<Carousel {...settings}>
						<Link to={{
							pathname: '/details/dhome',
							state: { gameData: ogGame }
						}}>
							<div><img src={match3} style={{ height: 150, width: "100%" }} /></div>
						</Link>
						<Link
							to={{
								pathname: '/details/dhome',
								state: { gameData: ogGame }
							}}
						>
							<div><img src={match3} style={{ height: 150, width: "100%" }} /></div>
						</Link>
						<Link
							to={{
								pathname: '/details/dhome',
								state: { gameData: ogGame }
							}}
						>
							<div><img src={match3} style={{ height: 150, width: "100%" }} /></div>
						</Link>
					</Carousel>
				</Col>
			</Row>
		);
	}

};

HomeCarousel.propTypes = {};

export default HomeCarousel;