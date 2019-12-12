/**
 * title: 智赛桥牌
 */
import React from 'react';
import Redirect from 'umi/redirect';
export default function BeginRouter(props) {
    const sid = window.localStorage.getItem('sid')
    return (
        <>
            {sid ?
                <Redirect to="/home" />
                :

                <Redirect to="/login" />
            }
        </>
    )
}