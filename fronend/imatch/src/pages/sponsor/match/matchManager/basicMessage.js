/**
 * title: 基本信息 - 智赛桥牌
 * index: 0
 */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Spin, Modal, Form, Input, DatePicker } from 'antd'
import router from 'umi/router';
import ListDecorator from '@/component/basicMessage';
import odoo from '../../../../odoo-rpc/odoo';
import { parseNotes } from '@/utils/tools'
import { useData } from '@/utils/hooks'
import moment from 'moment';

const config = {
    name: "比赛名称",
    date_from: "比赛开始时间",
    date_thru: "比赛结束时间",
    endtime: "报名截止时间",
    host: "主办单位",
    unit: "协办单位",
    sunit: "承办单位",
    referee: "裁判",
    arbitration: "仲裁",
    concet: "联系人",
    phone: "联系方式",
}
const dateKeys = ["date_from", "date_thru", "endtime"]
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
export default Form.create()((props) => {
    if (!localStorage.game) {
        router.replace('/sponsor/match')
    }
    const fields = {
        name: null,
        date_from: null,
        date_thru: null,
        notes: null,
    }
    const [loading, data, update] = useData('og.game', [["id", '=', Number(localStorage.game)]], fields)
    const [visible, setVisible] = useState(false)
    console.log(data)
    const ok = async (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                Object.keys(values).map(item => {
                    if (typeof values[item] !== "string") {
                        values[item] = values[item].format('YYYY-MM-DD')
                    }
                })
                const newValues = parseNotes(values);
                const cls = odoo.env('og.game')
                const data = await cls.write(Number(localStorage.game), newValues)
                console.log(data)
                if (data._id) {
                    setVisible(false)
                    update()
                }
            }
        });
    }
    const { getFieldDecorator } = props.form;
    const initData = data[0] ? parseNotes(data[0]) : []
    return (
        <>
            <Spin spinning={loading}>
                <Button type="primary" style={{ marginBottom: 20 }} onClick={() => setVisible(true)}>修改</Button>
                <ListDecorator
                    detailData={data.length > 0 ? parseNotes(data[0]) : data}
                // announcement={announcement}
                />
            </Spin>
            <Modal
                visible={visible}
                title="修改"
                onCancel={() => setVisible(false)}
                cancelText='取消'
                onOk={ok}
                style={{ top: 20 }}
                okText='确认'>
                <Form>
                    {Object.keys(initData).filter(item => item !== "id" && item !== "notes").map((item, index) => {
                        return (
                            <Form.Item key={index} label={config[item]} {...formItemLayout}>{
                                getFieldDecorator(item, {
                                    rules: [{ required: true, message: '输入比赛名称' }],
                                    initialValue: dateKeys.includes(item) ? moment(initData[item]) : initData[item],
                                })(
                                    dateKeys.includes(item) ? <DatePicker /> : <Input />
                                )
                            }
                            </Form.Item>
                        )
                    })}
                </Form>
            </Modal>
        </>
    )
})