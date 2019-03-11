/**
 * title: 基本信息 - 智赛桥牌
 * index: 0
 */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Spin } from 'antd'
import router from 'umi/router';
import ListDecorator from '@/component/basicMessage';
import odoo from '../../../../odoo-rpc/odoo';
import { parseNotes } from '@/utils/tools'
import { useData } from '@/utils/hooks'

async function change() {
    // do something
}
export default (props) => {
    if (!localStorage.game) {
        router.replace('/sponsor/match')
    }
    const fields = {
        name: null,
        date_from: null,
        date_thru: null,
        notes: null,
        state: null,
    }
    const [loading, data] = useData('og.game', [["id", '=', Number(localStorage.game)]], fields)
    return (
        <Spin spinning={loading}>
            <Button type="primary" style={{ marginBottom: 20 }} onClick={change}>修改</Button>
            <ListDecorator
                detailData={data.length > 0 ? parseNotes(data[0]) : data}
            // announcement={announcement}
            />
        </Spin>
    )
}