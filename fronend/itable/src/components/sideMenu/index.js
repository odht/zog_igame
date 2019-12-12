import SideMeun from './baseMeun'
import Media from 'react-media';
import { Drawer } from 'antd';
function Side(props) {
	const { isMobile, toggle, collapsed } = props
	return isMobile ? (
		<Drawer
			visible={!collapsed}
			placement="left"
			closable={false}
			onClose={() => toggle()}
			width={"auto"}
			style={{
				padding: 0,
				height: '100vh',
			}}
			bodyStyle={{
				padding: 0,
			}}
		>
			<SideMeun {...props} />
		</Drawer>
	) : (
			<SideMeun {...props} />
		)
}
export default Side