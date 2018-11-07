import React from 'react';
import { Row, Col} from 'antd';
import style from './index.css'
const Footer = () => {
  return (

     <div className={style.footer}>
			<div>
				<div className={style.link}>
					<Row >
						<Col span={6}>
							<ul>
								<li><a href="#">关于SjzBA</a></li>
								<li><a href="#">协会历史</a></li>
								<li><a href="#">组织结构</a></li>
								<li><a href="#">重大赛事</a></li>
								<li><a href="#">联系我们</a></li>
							</ul>
						</Col>
						<Col span={6}>
							<ul>
								<li><a href="#">网站支持</a></li>
								<li><a href="#">桥牌资料</a></li>
								<li><a href="#">桥牌入门</a></li>
								<li><a href="#">坐庄测试</a></li>
								<li><a href="#">防守测试</a></li>
							</ul>
						</Col>
						<Col span={6}>
							<ul>
								<li><a href="#">下载专区</a></li>
								<li><a href="#">中国桥牌竞赛规则（2013年）</a></li>
								<li><a href="#">世界桥联桥牌规则（2007年）</a></li>
								<li><a href="#">世界桥联新20分VP表</a></li>
								<li><a href="#">more</a></li>
							</ul>
						</Col>
						<Col span={6}>
						<ul>
								<li><a href="#">协会论坛</a></li>
								<li><a href="#">桥牌资料</a></li>
								<li><a href="#">桥牌入门</a></li>
								<li><a href="#">坐庄测试</a></li>
								<li><a href="#">防守测试</a></li>
							</ul>
						</Col>
					</Row>
					<div className={style.copyright}>
						<div className={style.owner}>石家庄桥牌协会版权所有</div>
						<div>北京欧德慧通信息技术有限公司提供技术支持</div>
					</div>
				</div>
			</div>
		</div>
  );
};

Footer.propTypes = {
};

export default Footer;