import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import Link from 'umi/link';
import { object } from 'prop-types';
export default (props) => {
    const { breadMap } = props
    return (
        <Breadcrumb>
            {
                Object.keys(breadMap).map((item) => {
                    return (
                        <Breadcrumb.Item>
                            <Link to={item}>{breadMap[item]}</Link>
                        </Breadcrumb.Item>
                    )
                })
            }
        </Breadcrumb>
    )
}