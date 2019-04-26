/**
 * title: 编排 - 智赛桥牌
 * isNotMenu: true
 */
import React, { useEffect, useState, useRef } from 'react';
import Redirect from 'umi/redirect'
import { Table, Form, Select, Button, InputNumber } from 'antd'
import { connect } from 'dva'
import { Link } from 'umi/link';
import router from 'umi/router';
import { MyInput } from '@/component/FormItem';
import odoo from '../../../../odoo-rpc/odoo';
export default Form.create()((props) => {
    console.log(props)

    const { form: { getFieldDecorator, validateFields }, location: { state: { round: { phase_id, id } } } } = props;
    const [teamData, setTeamData] = useState([])
    const [arrangeData, setArrangeDasta] = useState([])
    const [values, setValues] = useState({})
    const getData = async () => {
        const cls = odoo.env("og.phase")
        const fields = {
            team_ids: {
                name: null,
                number: null,
            }
        }
        const data = await cls.search_read([['id', '=', Number(phase_id.id)]], fields)
        if (data.length > 0) {
            setTeamData(data[0].team_ids)
        }
        console.log(data)
    }
    const test = async (vals) => {
        const newVals = { ...vals }
        const cls = odoo.env("og.game")
        // 将字符串转换为数组，以 ~ 分割
        newVals.arrange_team_rank = vals.arrange_team_rank ? vals.arrange_team_rank.split('~').map(item => Number(item)) : []
        newVals.no_arrange_team_ids = vals.no_arrange_team_ids.map(item => Number(item))
        newVals.table_num = vals.table_num ? vals.table_num.split('~').map(item => Number(item)) : []
        newVals.round_id = Number(id)
        setValues(newVals)
        console.log(newVals)
        const data = await cls.call("get_arrange_data", [Number(localStorage.game), newVals])
        console.log(data)
        setArrangeDasta(data)
    }
    useEffect(() => {
        if (!props.location.state.round) {
            router.replace('/sponsor/match/arrange')
        }
        getData()
    }, [])
    const children = teamData.map((item, index) => {
        return (
            <Select.Option key={item.id}>{item.name}</Select.Option>
        )
    })
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
    const buttonItemLayout = {
        wrapperCol: { span: 14, offset: 8 },
    }
    function handleChange(value) {
        console.log(value);
    }
    const submit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                test(values)
            }
        });
    }
    const columns = [{
        title: '桌',
        align: "center",
        dataIndex: 'table_number',
        render: (text, row, index) => {
            console.log(text)
            const obj = {
                children: text,
                props: {},
            };
            const num = row.table_number
            const place = arrangeData.filter(item => item.table_number === num)
            const placeIndex = place.findIndex(item => item.team === row.team);
            if (placeIndex !== 0) {
                obj.props.rowSpan = 0
            } else {
                obj.props.rowSpan = place.length
            }
            if (place.length <= 1) {
                obj.children = text + "（轮空）"
            }
            return obj
        }
    }, {
        title: '主客队',
        align: "center",
        dataIndex: 'team',
    }, {
        title: 'IMPs',
        align: "center",
        dataIndex: 'imp',
    }, {
        title: 'VP',
        align: "center",
        dataIndex: 'vp',
        render: (text, row, index) => {
            const obj = {
                children: Number(text).toFixed(2),
                props: {},
            };
            return obj
        }
    }, {
        title: '罚分',
        align: "center",
        dataIndex: 'score_manual',
    }, {
        title: '弃权',
        align: "center",
        dataIndex: 'nones',
    }]
    const submitArrange = async () => {
        const cls = odoo.env("og.game")
        const data = await cls.call("arrange", [Number(localStorage.game), values])
        if (data === 0) {
            router.push("/sponsor/match/arrange")
        }

    }
    return (
        <div style={{
            display: "flex",

        }}
        >
            <div>
                <Form onSubmit={submit}>
                    <Form.Item {...formItemLayout} label={"起始桌号"}>
                        {
                            getFieldDecorator("table_num", {
                                rules: [{ required: true, message: '选择起始桌号' }]
                            })(
                                <MyInput />
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={"不参与编排的队号"}>
                        {
                            getFieldDecorator("no_arrange_team_ids", {
                                initialValue: []
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Tags Mode"
                                    onChange={handleChange}
                                >
                                    {children}
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={"参与编排的名次范围"}>
                        {
                            getFieldDecorator("arrange_team_rank", {    
                            })(
                                <MyInput />
                            )
                        }
                    </Form.Item>
                    <Form.Item {...buttonItemLayout} >
                        <Button style={{ marginRight: 20 }} htmlType="submit">生成编排</Button>
                    </Form.Item>
                </Form>
            </div>
            <div
                style={{
                    marginLeft: 100
                }}
            >
                <Table
                    columns={columns}
                    dataSource={arrangeData}
                    rowKey={row => row.team}
                    style={{
                        backgroundColor: "white"
                    }}
                    bordered
                />
                {arrangeData.length > 0 ?
                    <Button style={{ marginTop: 21 }} type="primary" onClick={submitArrange}>提交编排</Button> : null}
            </div>
        </div>
    )
})