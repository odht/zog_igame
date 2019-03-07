/**
 * title: 组织
 * isNotMeun: true
 */
import React, { useEffect, useState, useRef } from 'react';
import { } from 'antd'
import router from 'umi/router';
import StepContent from '@/component/steps'
import { parseNotes } from '@/utils/tools'
import odoo from '../../../../odoo-rpc/odoo';
const steps = [{
    title: '创建组',
    dataIndex: [{
        label: "组名称",
        type: "Input",
        name: "name",
        rules: [{ required: true, message: '请输入组名称' }]
    }, {
        label: "类型",
        type: "Radio",
        values:['循环赛','积分编排赛','淘汰赛'],
        name: "date",
        rules: [{ required: true, message: '选择一个类型' }]
    }]
}, {
    title: '赛制',
    dataIndex: [{
        label: "IMP - VP",
        type: "select",
        name: "host",
        values:['20-VP WBF','25-VP WBF','20-VP 北美'],
        rules: [{ required: true, message: '选择一个赛制' }]
    }, {
        label: "轮空IMP",
        type: "Input",
        name: "unit",
        rules: [{ required: true, message: '必填' }]
    }, {
        label: "轮空VP",
        type: "Input",
        name: "concet",
        rules: [{ required: true, message: '必填' }]
    }],
}, {
    title: '牌桌/桌号',
    dataIndex: [{
        label: "轮次",
        type: "Input",
        name: "referee",
        rules: []
    }, {
        label: "每轮时间（分钟）",
        type: "Input",
        name: "arbitration",
        rules: []
    }, {
        label: "每轮牌数",
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