import React, {
	Component
} from 'react';
import { Row, Col, Carousel, Icon} from 'antd';
import match1 from '../../assets/match1.jpg'
import match2 from '../../assets/match2.jpg'
import match3 from '../../assets/match3.jpg'
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",width: "45px",height: "45px",right:"-45px",marginTop: "-22px"}}
      onClick={onClick}
    >
     <Icon type="right"  style={{color:"red",fontSize:"45px"}} />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",width: "45px",height: "45px",left:"-45px",marginTop: "-22px"}}
      onClick={onClick}
    >
    	<Icon type="left" style={{color:"red",fontSize:"45px"}} />
    </div>
  );
}

const settings = {
	infinite: true,
	className: "center",
	slidesToShow: 3,
	slidesToScroll: 1,
	speed: 500,
	centerPadding: "60px",
	dots: false,
	arrows:true,
	nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>
};

class HomeCarousel extends Component {

	render() {
		return(
			<Row type="flex" justify="center">
			    <Col span={22}>
			      <Carousel {...settings}>
				    <div><img src={match1} style={{width:"90%",marginLeft:"5%"}}/></div>
				    <div><img src={match2} style={{width:"90%",marginLeft:"5%"}}/></div>
				    <div><img src={match3} style={{width:"90%",marginLeft:"5%"}}/></div>
				    <div><img src={match1} style={{width:"90%",marginLeft:"5%"}}/></div>
				    <div><img src={match2} style={{width:"90%",marginLeft:"5%"}}/></div>
				    <div><img src={match3} style={{width:"90%",marginLeft:"5%"}}/></div>
				  </Carousel>
				</Col>
		    </Row>
		);
	}

};

HomeCarousel.propTypes = {};

export default HomeCarousel;