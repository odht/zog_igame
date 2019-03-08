/**
 * title: 新建比赛 - 智赛桥牌
 * isNotMenu: true
 */
import React, { useEffect, useState, useRef } from 'react';
import { } from 'antd'
import odoo from '../../../odoo-rpc/odoo'
import router from 'umi/router';
import StepContent from '@/component/steps/test'
import { parseNotes } from '@/utils/tools'
const steps = [{
    title: '基本信息',
    dataIndex: [{
        label: "比赛名称",
        type: "Input",
        name: "name",
        rules: [{ required: true, message: '请输入比赛名称' }]
    }, {
        label: "比赛时间",
        type: "RangePicker",
        name: "date",
        rules: []
    }, {
        label: "截止",
        type: "DatePicker",
        name: "endtime",
        rules: []
    }, {
        label: "地点",
        type: "Input",
        name: "place",
        rules: [{ required: true, message: '请输入地点' }]
    },]
}, {
    title: '主办&联系人',
    dataIndex: [{
        label: "主办单位",
        type: "Input",
        name: "host",
        rules: [{ required: true, message: '请输入比赛名称' }]
    }, {
        label: "协办单位",
        type: "Input",
        name: "unit",
        rules: []
    }, {
        label: "联系人",
        type: "Input",
        name: "concet",
        rules: []
    }, {
        label: "联系方式",
        type: "Input",
        name: "phone",
        rules: []
    }, {
        label: "备注",
        type: "Input",
        name: "remark",
        rules: []
    }],
}, {
    title: '裁判&仲裁',
    dataIndex: [{
        label: "裁判",
        type: "Input",
        name: "referee",
        rules: []
    }, {
        label: "仲裁",
        type: "Input",
        name: "arbitration",
        rules: []
    }],
}, {
    title: '确认',
    render(form, steps, data) {
        return steps.map((item) => item.dataIndex).filter((item) => item).reduce((pre, cur) => [...pre, ...cur], []).map((item) => {
            console.log(item);
            return (
                <p key={item.name}><span style={{ fontWeight: "bolder" }}>{item.label + "："}</span> {data[item.name]}</p>
            )
        })
    }
}]
export default (props) => {
    const onSubmit = async (data, setLoading) => {
        console.log(data);
        setLoading(true)
        const cls = odoo.env('og.game');
        data.date_from = data.date[0];
        data.date_thru = data.date[1];
        delete data.date
        const result = await cls.create(parseNotes(data))
        if (result) {
            setLoading(false)
            router.replace("/sponsor/match")
        }
    }
    const onCancel = () => {
        router.replace("/sponsor/match")
    }
    return (
        <>
            <h3 style={{ marginBottom: 10 }}>新比赛</h3>
            <StepContent steps={steps} lastStep={onSubmit} onCancel={onCancel} />
        </>
    )
}