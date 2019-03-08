/**
 * title: 赛事管理 - 智赛桥牌
 * isNotMenu: true
 */
import React, { useEffect, useState, useRef } from 'react';
import Redirect from 'umi/redirect'

export default (props) => {
    console.log(props);
    const x = ['基本信息', '规程', '参赛队', '项目', '结果', '新闻']
    return (
        <Redirect to="/sponsor/match/matchManager/basicMessage" />
        // <span>111</span>
    )
}