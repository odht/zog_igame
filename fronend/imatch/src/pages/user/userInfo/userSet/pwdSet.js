import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'dva/router';
import styles from './pwdSet.less';
import 'antd/dist/antd.css';
import {connect} from 'dva';


const SubMenu = Menu.SubMenu;


class PwdSetBlock extends Component{
    
    state = {
    }

    render(){
        return(
            <div style={{ width:'100%',height:'100%', borderLeft: '1px solid #e8e8e8', backgroundColor:'blue'}}>
                
                EEEEEEEEEEEEEEEE----pwdSet
            </div>
        );
    }
}

export default PwdSetBlock;