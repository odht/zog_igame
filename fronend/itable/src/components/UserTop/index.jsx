import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva'
import { Layout, Button, Icon ,Avatar} from 'antd';
import HeaderSearch from '@/components/GlobalSearch';
import styles from './user.less';
import router from 'umi/router'
// 用户工具栏的右边，头像
class UserTop extends PureComponent {
    logout = () => {
        const { dispatch } = this.props;
        router.push('/login')
        dispatch({
            type: 'login/logout'
        })
    }
    render() {
        return (
            <div className={styles.user}>
                <HeaderSearch
                    placeholder="站内搜索"
                    dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                    onSearch={(value) => {
                        console.log('input', value); // eslint-disable-line
                    }}
                    onPressEnter={(value) => {
                        console.log('enter', value); // eslint-disable-line
                    }} />
                
                <div>
                    <Button className={styles.flexItem} onClick={this.logout}>
                        退出登陆
                    </Button>
                </div>
                <div className={styles.flexItem}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </div>
            </div>
        )
    }
}
UserTop.propTypes = {

}
const mapStateToProps = ({ login }) => {
    return { login: login }
}

export default connect(mapStateToProps)(UserTop)
