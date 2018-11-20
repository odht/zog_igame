import React, { Component } from 'react';
import styles from './BasicLayout.css';
import BasicFooter from '../component/BasicFooter';
export default props =>
    <div>
        <div className={styles.basicContext}>
            {props.children}
        </div>
        <div className={styles.basicFooter}>
            <BasicFooter />
        </div>

    </div>
