/**
 * title: 新建比赛 - 智赛桥牌
 * isNotMenu: true
 */
import React, { useEffect, useState, useRef } from 'react';
import { Steps, Button, Divider, Form, Input, DatePicker, Spin, Radio, Select, InputNumber } from 'antd'
import moment from 'moment';
import router from 'umi/router';

function timetrans() {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    return Y + M + D
}
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 2 },
        sm: { span: 16 },
    },
};

function itemType(item) {
    switch (item.type) {
        case "Input":
            return (
                <Input style={{ maxWidth: 250 }}></Input>
            )
        case "InputNumber":
            return (
                <InputNumber style={{ maxWidth: 250 }} />
            )
        case "RangePicker":
            return (
                <RangePicker />
            )
        case "DatePicker":
            return (
                <DatePicker />
            )
        case "Radio":
            const values = item.values || []
            return (
                <Radio.Group >
                    {values.map((items) => <Radio key={items} value={items}>{items}</Radio>)}
                </Radio.Group>
            )
        case "select":
            const valuess = item.values || []
            return (
                <Select style={{ maxWidth: 250 }}>
                    {valuess.map((items) => <Select.Option key={items} value={items}>{items}</Select.Option>)}
                </Select>
            )
    }
}
function turnDate(steps, data) {
    const TrueSteps = steps.filter((item) => item.dataIndex)
    return TrueSteps.reduce((Pre, Current) => {
        const x = Current.dataIndex.reduce((pre, current) => {
            if (current.type === "RangePicker") {
                if (data[current.name]) {
                    pre[current.name] = [data[current.name][0].format('YYYY-MM-DD'), data[current.name][1].format('YYYY-MM-DD')]
                } else {
                    pre[current.name] = new Array(2).fill(timetrans())
                }
            }
            if (current.type === "DatePicker") {
                if (data[current.name]) {
                    pre[current.name] = data[current.name].format('YYYY-MM-DD')
                } else {
                    pre[current.name] = timetrans()
                }
            }
            return pre

        }, {})
        return { ...Pre, ...x }
    }, data)

}
const option = {
    onFieldsChange: (props, changed, all) => {
        ;
    }
}

export default Form.create(option)((props) => {
    const [current, setCurrent] = useState(0)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const { form: { getFieldDecorator, validateFields }, steps, lastStep = () => false, onCancel } = props;
    const pre = () => {
        steps[current - 1].skip && steps[current - 1].skip(data) ?
            setCurrent(current && current - 2) :
            setCurrent(current && current - 1)
    }
    const handleSubmit = (e) => {
        const stepsLastIndex = steps.length - 1
        const x = current === stepsLastIndex ? stepsLastIndex : current + 1
        e.preventDefault()
        validateFields((err, values) => {
            if (err) {
                return
            }
            setData((preData) => {
                steps[x].skip && steps[x].skip({ ...preData, ...values }) ?
                    setCurrent(x + 1) :
                    setCurrent(x)
                return { ...preData, ...values }
            })

            if (current === stepsLastIndex) {
                lastStep(turnDate(steps, data), setLoading)
            }
        })

    }
    const renderItem = () => {
        if (steps[current].render) {
            return steps[current].render(props.form, steps, turnDate(steps, data))
        } else {
            return (
                <>
                    {steps[current].dataIndex.map((item) => {
                        return (
                            <Form.Item
                                {...formItemLayout}
                                label={item.label}
                                key={item.name}
                            >
                                {item.render ? item.render(props.form, data, item) : getFieldDecorator(item.name, {
                                    rules: item.rules || [],
                                    initialValue: data[item.name]
                                })(
                                    itemType(item)
                                )}
                            </Form.Item>
                        )
                    })}
                </>
            )
        }
    }
    return (
        <div style={{
            width: "60%",
            minWidth: 600,
            backgroundColor: "white",
            padding: 20
        }}>
            <Spin spinning={loading}>
                <Steps current={current}>
                    {steps.map((item) => <Steps.Step key={item.title} title={item.title} />)}
                </Steps>
                {<Form onSubmit={handleSubmit}>
                    <div style={{ minHeight: "300px", paddingTop: 24, }}>
                        {renderItem()}
                    </div>
                    <Divider />
                    <Form.Item>
                        <div style={{ float: 'right' }}>
                            {current > 0 ? <Button onClick={pre} style={{ marginRight: 15 }}>上一步</Button> : null}
                            <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>{current === steps.length - 1 ? "提交" : "下一步"}</Button>
                            <Button onClick={onCancel}>取消创建</Button>
                        </div>
                    </Form.Item>

                </Form>
                }
            </Spin>
        </div>
    )
})