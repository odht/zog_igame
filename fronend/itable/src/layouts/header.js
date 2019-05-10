import UserTop from '@/components/UserTop';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import styles from './header.less';
function HeaderUser(props) {
    return (
        <Layout.Header className={styles.header}>
            <Icon
                className={styles.trigger}
                type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={props.toggle}
            />
            <UserTop />
        </Layout.Header>
    )
}
HeaderUser.propTypes = {
    collapsed: PropTypes.bool,
    toggle: PropTypes.func,
}
HeaderUser.defaultProps = {
    collapsed: false,
    toggle: () => { },
}
export default HeaderUser