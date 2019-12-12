import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import styles from './index.less';
class CardList extends PureComponent {
	render() {
		const { dataSource = [],testname ,clickHandle=()=>{},children} = this.props;

		return (
			<div className="gutter-example">
				<Row gutter={16}>
					{dataSource.map((item) => {
						return (
							<Col key={item} className={styles.gutterRow} xs={12} sm={8} md={4} lg={4} xl={4} onClick={clickHandle.bind(this)}>
								<Card title="Card title">{children}</Card>
							</Col>
						)
					})

					}
				</Row>
			</div>
		)
	}
}
export default CardList