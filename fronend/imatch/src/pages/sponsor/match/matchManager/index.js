/**
 * title: 赛事管理 - 智赛桥牌
 * isNotMenu: true
 */
import React, { useEffect, useState, useRef } from 'react';
import Redirect from 'umi/redirect'
import { connect } from 'dva'

export default connect()((props) => {
    console.log(props);
    const { location: { state }, dispatch } = props;
    useEffect(() => {
        // dispatch()
    }, [])
    return (
        <Redirect to={{ pathname: "/sponsor/match/matchManager/basicMessage", state: state }} />
    )
})