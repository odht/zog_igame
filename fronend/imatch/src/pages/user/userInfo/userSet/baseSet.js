import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'dva/router';
import styles from './baseSet.less';
import 'antd/dist/antd.css';
import {connect} from 'dva';


const SubMenu = Menu.SubMenu;


class BaseSetBlock extends Component{
    
    state = {
    }

    render(){
        return(
            <div style={{ width:'100%',height:'100%', borderLeft: '1px solid #e8e8e8', backgroundColor:'brown'}}>
                
                EEEEEEEEEEEEE---baseSet
            </div>
        );
    }
}

export default BaseSetBlock;