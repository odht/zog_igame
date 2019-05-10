import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin, Tag } from 'antd';
import Odoo from '@/odoo'
import { PopData, turnData, deleteArrayInArry } from '@/utils';
import { useSeachData } from './searchHooks'


const { CheckableTag } = Tag
export default (props) => {
    const { loading, changeData, game_id } = props;
    const round = useSeachData('og.phase', [['game_id', '=', game_id]])
    const [check, setCheck] = useState(-1)
    const updataData = (item, index) => {
        if (!loading) {
            setCheck(index);
            const domain = [['game_id', '=', game_id], ['phase_id', '=', item.id]];
            changeData(domain);
        }
    }
    return (
        <>
            <div style={{ marginBottom: "12px" ,backgroundColor:"white",padding:4}}>
                <span>赛段选择：</span>
                {round.map((item, index) => {
                    return (
                        <CheckableTag
                            key={index}
                            checked={check === index ? true : false}
                            onChange={updataData.bind(this, item, index)}
                        >
                            {item.name}
                        </CheckableTag>
                    )
                })}
            </div>
        </>
    )
}