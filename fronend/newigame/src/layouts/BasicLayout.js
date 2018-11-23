import React from 'react';
import styles from './BasicLayout.css';
import BasicFooter from '../component/BasicFooter';
export default props => {
    return (
        <div>
            <div className={styles.loginOut}>
                <a
                    onClick={() => props.handlerloginOut()}
                >退出</a>
            </div>
            <div className={styles.basicContext}>
                {props.children}
            </div>
            <div className={styles.basicFooter}>
                <BasicFooter />
            </div>

        </div>
    )
}

