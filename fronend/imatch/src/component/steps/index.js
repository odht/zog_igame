/**
 * title: 新建比赛 - 智赛桥牌
 * isNotMenu: true
 */
import React, { useEffect, useState } from 'react';
import { Steps, Button, Divider, Form, Input, DatePicker, Upload, Icon } from 'antd'
import router from 'umi/router';
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'




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

function dataReducer(state, action) {
    switch (action.type) {

    }
}
/**
 * 每一步的内容组件
 * @param {*} props 
 */
const StepContent = Form.create({ name: 'register' })((props) => {
    const { form: { getFieldDecorator }, current, pre, next } = props;
    const [data, setData] = useState({});
    return (
        <>
            <div style={{ minHeight: "200px", paddingTop: 24 }}>
                {current === 0 ? <StepOne getFieldDecorator={getFieldDecorator} />
                    : current === 1 ? <StepTwo getFieldDecorator={getFieldDecorator} />
                        : current === 2 ? <StepThree getFieldDecorator={getFieldDecorator} /> : null}


            </div>
            <Divider />
            <div style={{ float: 'right' }}>
                {current > 0 ? <Button onClick={pre} style={{ marginRight: 15 }}>上一步</Button> : null}
                <Button onClick={next.bind(this, data)} style={{ marginRight: 15 }}>{current === 3 ? "提交" : "下一步"}</Button>
                <Button onClick={() => { router.replace("/sponsor/match") }}>取消创建</Button>
            </div>
        </>
    )
})
export default StepContent