import { Carousel , Icon} from "antd";
import React,{ Component } from "react";
import styles from './index.less';
import carousel_1 from '../../assets/carousel_1.jpg'
import carousel_2 from '../../assets/carousel_2.jpg'
import carousel_3 from '../../assets/carousel_3.jpg'

const NextArrow=(props)=>{
    return(
        <div onClick={props.next} style={{right:'5px'}} className={styles.arrows}><Icon type="right" theme="outlined" /></div>
    )
}
const PrevArrow=(props)=>{
    return(
        <div onClick={props.previous} style={{left:'5px'}} className={styles.arrows}><Icon type="left" theme="outlined" /></div>
    )
}

export default class IndexCarousel extends Component {
    constructor(){
        super()
        this.carousel=null;
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        this.carousel.slick.slickNext();
      }
      previous() {
        this.carousel.slick.slickPrev();
      }

    render(){
        const settings={
            adaptiveHeight: true,
            nextArrow: <NextArrow next={this.next}/>,
            prevArrow: <PrevArrow previous={this.previous}/>,
            arrows:true,
            autoplay:true
        };
        return(
            <div>
                <Carousel {...settings} ref={(elem)=>{this.carousel=elem}}>
                    <div style={{backgroundColor:'red'}}><img src={carousel_1} style={{width:'100%'}}/ ></div>
                    <div style={{backgroundColor:'red'}}><img src={carousel_2} style={{width:'100%'}}/ ></div>
                    <div style={{backgroundColor:'red'}}><img src={carousel_3} style={{width:'100%'}}/ ></div>
                </Carousel>
            </div>
        )
    }
   
}
