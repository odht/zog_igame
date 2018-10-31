import Carousel_2 from '../component/Carousel_2'
import Banner from '../component/Banner'
export default function() {
  return (
    <div style={{marginTop:'20px'}}>
  
          <div >
          <div style={{fontSize:'24px',fontWeight:'bold',marginBottom:'20px',backgroundColor:'red'}}>
          | 新闻 |
          </div>
            <Banner/>
          <div style={{fontSize:'24px',fontWeight:'bold',marginBottom:'20px'}}>
            | 赛事 |
          </div>
            <Carousel_2/>
          </div>

    </div>
  );
}

