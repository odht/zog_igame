/**
 * title: 新建比赛 - 智赛桥牌
 * isNotMenu: true
 */
import React, { useEffect, useState } from 'react';
import { Steps, Button, Divider, Form, Input, DatePicker } from 'antd'
import router from 'umi/router';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const steps = [{
    title: '基本信息',
    content: 'First-content',
}, {
    title: '主办&联系人',
    content: 'Second-content',
}, {
    title: '裁判&仲裁',
    content: 'Last-content',
}, {
    title: '确认',
    content: 'Last-content',
}]
/**
 * 每一步的内容组件
 * @param {*} props 
 */
const StepContent = Form.create({ name: 'register' })((props) => {
    const { getFieldDecorator } = props.form;
    const onChange = () => { }
    return (
        <div style={{ minHeight: "200px" }}>
            <Form layout="horizontal" >
                <Form.Item
                    label="比赛名称"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            type: 'string', message: '',
                        }, {
                            required: true, message: '比赛名称不可缺少!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="比赛名称" >
                    <RangePicker onChange={onChange} />
                </Form.Item>
            </Form>
        </div>
    )
})
export default (props) => {
    const [current, setCurrent] = useState(0)
    const pre = () => {
        setCurrent(current && current - 1)
    }
    const next = () => {
        setCurrent(current === 3 ? 3 : current + 1)
        if (current === 3) {
            // do something
        }
    }
    return (
        <div style={{
            width: "50%"
        }}>
            <Steps current={current}>
                {steps.map((item) => <Steps.Step key={item.title} title={item.title} />)}
            </Steps>
            <StepContent current={current} />
            <Divider />
            <div style={{ float: 'right' }}>
                {current > 0 ? <Button onClick={pre} style={{ marginRight: 15 }}>上一步</Button> : null}
                <Button onClick={next} style={{ marginRight: 15 }}>{current === 3 ? "提交" : "下一步"}</Button>
                <Button onClick={() => { router.replace("/sponsor/match") }}>取消创建</Button>
            </div>
        </div>
    )
}