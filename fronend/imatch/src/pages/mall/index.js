import { Component, Fragment} from "react";
import { Row, Col,Card, Icon, Avatar } from "antd";
const { Meta } = Card;

const content=(<Row gutter={10} style={{marginTop:'20px'}}>
    <Col span={4}>
      <Card
         
          cover={<img alt="example" src="http://www.ccba.org.cn/Books/img/%E5%8F%AB%E7%89%8C%E8%A6%81%E8%AF%80index.jpg" />}
          actions={["¥ 99"]}
          hoverable={true}
      >
          <Meta
          description="[美] 艾迪•坎特 著 沈丽丽，康蒙，黄水怒 译"
          />
      </Card>
    </Col>
    <Col span={4}>
    <Card
         
         cover={<img alt="example" src="http://www.ccba.org.cn/Books/img/%E5%81%9A%E5%BA%84%E8%A6%81%E8%AF%80index.jpg" />}
         actions={["¥ 99"]}
         hoverable={true}
     >
         <Meta
         description="[美] 艾迪•坎特 著 沈丽丽，康蒙，黄水怒 译"
         />
     </Card>
    </Col>
    <Col span={4}>
    <Card
         
         cover={<img alt="example" src="http://www.ccba.org.cn/Books/img/%E9%98%B2%E5%AE%88%E8%A6%81%E8%AF%80index.jpg" />}
         actions={["¥ 99"]}
         hoverable={true}
     >
         <Meta
         description="[美] 艾迪•坎特 著 沈丽丽，康蒙，黄水怒 译"
         />
     </Card>
    </Col>
    <Col span={4}>
    <Card
         
          cover={<img alt="example" src="http://www.ccba.org.cn/Books/img/%E5%8F%AB%E7%89%8C%E8%A6%81%E8%AF%80index.jpg" />}
          actions={["¥ 99"]}
          hoverable={true}
      >
          <Meta
          description="[美] 艾迪•坎特 著 沈丽丽，康蒙，黄水怒 译"
          />
      </Card>
    </Col>
    <Col span={4}>
    <Card
         
          cover={<img alt="example" src="http://www.ccba.org.cn/Books/img/%E5%81%9A%E5%BA%84%E8%A6%81%E8%AF%80index.jpg" />}
          actions={["¥ 99"]}
          hoverable={true}
      >
          <Meta
          description="[美] 艾迪•坎特 著 沈丽丽，康蒙，黄水怒 译"
          />
      </Card>
    </Col>
    <Col span={4}>
    <Card
         
          cover={<img alt="example" src="http://www.ccba.org.cn/Books/img/%E9%98%B2%E5%AE%88%E8%A6%81%E8%AF%80index.jpg" />}
          actions={["¥ 99"]}
          hoverable={true}
      >
          <Meta
          description="[美] 艾迪•坎特 著 沈丽丽，康蒙，黄水怒 译"
          />
      </Card>
    </Col>
</Row>)

export default class Mall extends Component{
   
    render(){
        return(
          <Fragment>
                 {content}
                 {content}
                 {content}
          </Fragment>
        )
    }
}