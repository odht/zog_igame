import React from 'react';
import { Form, Select, Cascader, Input, Button, Modal } from 'antd';
import styles from './ScoringFrom.css';

const FormItem = Form.Item;
const { Option } = Select;
const dealData = [
    {
        value: '1',
        label: '1',
        children: [
            {
                value: 'S',
                label: 'S',
            },
            {
                value: 'H',
                label: 'H',
            },
            {
                value: 'C',
                label: 'C',
            },
            {
                value: 'D',
                label: 'D',
            },
            {
                value: 'NT',
                label: 'NT',
            }
        ]
    },
    {
        value: '2',
        label: '2',
        children: [
            {
                value: 'S',
                label: 'S',
            },
            {
                value: 'H',
                label: 'H',
            },
            {
                value: 'C',
                label: 'C',
            },
            {
                value: 'D',
                label: 'D',
            },
            {
                value: 'NT',
                label: 'NT',
            }
        ]
    },
    {
        value: '3',
        label: '3',
        children: [
            {
                value: 'S',
                label: 'S',
            },
            {
                value: 'H',
                label: 'H',
            },
            {
                value: 'C',
                label: 'C',
            },
            {
                value: 'D',
                label: 'D',
            },
            {
                value: 'NT',
                label: 'NT',
            }
        ]
    },
    {
        value: '4',
        label: '4',
        children: [
            {
                value: 'S',
                label: 'S',
            },
            {
                value: 'H',
                label: 'H',
            },
            {
                value: 'C',
                label: 'C',
            },
            {
                value: 'D',
                label: 'D',
            },
            {
                value: 'NT',
                label: 'NT',
            }
        ]
    },
    {
        value: '5',
        label: '5',
        children: [
            {
                value: 'S',
                label: 'S',
            },
            {
                value: 'H',
                label: 'H',
            },
            {
                value: 'C',
                label: 'C',
            },
            {
                value: 'D',
                label: 'D',
            },
            {
                value: 'NT',
                label: 'NT',
            }
        ]
    },
    {
        value: '6',
        label: '6',
        children: [
            {
                value: 'S',
                label: 'S',
            },
            {
                value: 'H',
                label: 'H',
            },
            {
                value: 'C',
                label: 'C',
            },
            {
                value: 'D',
                label: 'D',
            },
            {
                value: 'NT',
                label: 'NT',
            }
        ]
    },
    {
        value: '7',
        label: '7',
        children: [
            {
                value: 'S',
                label: 'S',
            },
            {
                value: 'H',
                label: 'H',
            },
            {
                value: 'C',
                label: 'C',
            },
            {
                value: 'D',
                label: 'D',
            },
            {
                value: 'NT',
                label: 'NT',
            }
        ]
    }
];
const leaderData = [
    {
        value: 'S',
        label: 'S',
        children: [
            {
                value: 'A',
                label: 'A',
            },
            {
                value: '2',
                label: '2',
            },
            {
                value: '3',
                label: '3',
            },
            {
                value: '4',
                label: '4',
            },
            {
                value: '5',
                label: '5',
            },
            {
                value: '6',
                label: '6',
            },
            {
                value: '7',
                label: '7',
            },
            {
                value: '8',
                label: '8',
            },
            {
                value: '9',
                label: '9',
            },
            {
                value: 'T',
                label: 'T',
            },
            {
                value: 'J',
                label: 'J',
            },
            {
                value: 'Q',
                label: 'Q',
            },
            {
                value: 'K',
                label: 'K',
            }
        ]
    },
    {
        value: 'H',
        label: 'H',
        children: [
            {
                value: 'A',
                label: 'A',
            },
            {
                value: '2',
                label: '2',
            },
            {
                value: '3',
                label: '3',
            },
            {
                value: '4',
                label: '4',
            },
            {
                value: '5',
                label: '5',
            },
            {
                value: '6',
                label: '6',
            },
            {
                value: '7',
                label: '7',
            },
            {
                value: '8',
                label: '8',
            },
            {
                value: '9',
                label: '9',
            },
            {
                value: 'T',
                label: 'T',
            },
            {
                value: 'J',
                label: 'J',
            },
            {
                value: 'Q',
                label: 'Q',
            },
            {
                value: 'K',
                label: 'K',
            }
        ]
    },
    {
        value: 'C',
        label: 'C',
        children: [
            {
                value: 'A',
                label: 'A',
            },
            {
                value: '2',
                label: '2',
            },
            {
                value: '3',
                label: '3',
            },
            {
                value: '4',
                label: '4',
            },
            {
                value: '5',
                label: '5',
            },
            {
                value: '6',
                label: '6',
            },
            {
                value: '7',
                label: '7',
            },
            {
                value: '8',
                label: '8',
            },
            {
                value: '9',
                label: '9',
            },
            {
                value: 'T',
                label: 'T',
            },
            {
                value: 'J',
                label: 'J',
            },
            {
                value: 'Q',
                label: 'Q',
            },
            {
                value: 'K',
                label: 'K',
            }
        ]
    },
    {
        value: 'D',
        label: 'D',
        children: [
            {
                value: 'A',
                label: 'A',
            },
            {
                value: '2',
                label: '2',
            },
            {
                value: '3',
                label: '3',
            },
            {
                value: '4',
                label: '4',
            },
            {
                value: '5',
                label: '5',
            },
            {
                value: '6',
                label: '6',
            },
            {
                value: '7',
                label: '7',
            },
            {
                value: '8',
                label: '8',
            },
            {
                value: '9',
                label: '9',
            },
            {
                value: 'T',
                label: 'T',
            },
            {
                value: 'J',
                label: 'J',
            },
            {
                value: 'Q',
                label: 'Q',
            },
            {
                value: 'K',
                label: 'K',
            }
        ]
    }
];
const resultData = [
    {
        value: '=',
        label: '='
    },
    {
        value: '+',
        label: '+',
        children: [
            {
                value: '1',
                label: '1',
            },
            {
                value: '2',
                label: '2',
            },
            {
                value: '3',
                label: '3',
            },
            {
                value: '4',
                label: '4',
            },
            {
                value: '5',
                label: '5',
            },
            {
                value: '6',
                label: '6',
            },
            {
                value: '7',
                label: '7',
            },
            {
                value: '8',
                label: '8',
            },
            {
                value: '9',
                label: '9',
            },
            {
                value: '10',
                label: '10',
            },
            {
                value: '11',
                label: '11',
            },
            {
                value: '12',
                label: '12',
            }
        ]
    },
    {
        value: '-',
        label: '-',
        children: [
            {
                value: '1',
                label: '1',
            },
            {
                value: '2',
                label: '2',
            },
            {
                value: '3',
                label: '3',
            },
            {
                value: '4',
                label: '4',
            },
            {
                value: '5',
                label: '5',
            },
            {
                value: '6',
                label: '6',
            },
            {
                value: '7',
                label: '7',
            },
            {
                value: '8',
                label: '8',
            },
            {
                value: '9',
                label: '9',
            },
            {
                value: '10',
                label: '10',
            },
            {
                value: '11',
                label: '11',
            },
            {
                value: '12',
                label: '12',
            },
            {
                value: '13',
                label: '13',
            }
        ]
    }
];

class RecordNewForm extends React.Component {

    state = {
        modalVisible: false,
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let id = null;
            //根据　submitType 判断是创建还是修改
            // const { scoringData, submitType, scoringDataCraeate } = this.props;
            const { scoringData } = this.props;
            // if (scoringData && submitType === 'update') {
            //     id = scoringData.id
            // } else {
            //     id = scoringDataCraeate[0].round_id[1]
            // }
            if (scoringData) {
                id = scoringData.id
            }
            if (!err) {
                this.props.writeSoringData({ ...values, id, type: "write" });
                this.props.form.resetFields();
                this.setState({ modalVisible: false });
            }
        });
    }
    handleVisible = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let id = null;
            //根据　submitType 判断是创建还是修改
            const { scoringData, submitType, scoringDataCraeate } = this.props;
            this.props.writeSoringData({ ...values, id, type: "pass" });
            this.props.form.resetFields();
            this.setState({ modalVisible: false });
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { submitType, scoringData } = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className={styles.box}>
                <span onClick={() => this.setModalVisible(true)}>{this.props.children}</span>

                <Modal
                    title={submitType === 'update' ? '打牌信息更改' : '打牌信息录入'}
                    centered
                    footer={null}
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                >

                    <Form onSubmit={this.handleSubmit}>
                        {/* 牌号 */}
                        <FormItem
                            {...formItemLayout}
                            label="牌号："
                            hasFeedback
                        >
                            {getFieldDecorator('number', {
                                initialValue: scoringData ? scoringData.number : '',
                                rules: [
                                    { required: true, message: '请填写牌号!' },
                                ],
                            })(
                                <Select placeholder="请填写牌号" allowClear>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                    <Option value="7">7</Option>
                                    <Option value="8">8</Option>
                                    <Option value="9">9</Option>
                                    <Option value="10">10</Option>
                                    <Option value="11">11</Option>
                                    <Option value="12">12</Option>
                                    <Option value="13">13</Option>
                                    <Option value="14">14</Option>
                                    <Option value="15">15</Option>
                                    <Option value="16">16</Option>
                                </Select>
                            )}
                        </FormItem>
                        {/* 庄家 */}
                        <FormItem
                            {...formItemLayout}
                            label="庄家："
                            hasFeedback
                        >
                            {getFieldDecorator('declarer', {
                                initialValue: scoringData ? scoringData.declarer : '',
                                rules: [
                                    { required: true, message: '请填写庄家!' },
                                ],
                            })(
                                <Select placeholder="请填写庄家" allowClear>
                                    <Option value="E">E</Option>
                                    <Option value="S">S</Option>
                                    <Option value="W">W</Option>
                                    <Option value="N">N</Option>
                                </Select>
                            )}
                        </FormItem>
                        {/* 定约 */}
                        <FormItem
                            {...formItemLayout}
                            label="定约:"
                            hasFeedback
                        >
                            {getFieldDecorator('contract', {
                                initialValue: scoringData ? scoringData.contract.split('') : null,
                                rules: [{ type: 'array', required: true, message: '请填写定约!' }],
                            })(
                                <Cascader style={{ textAlign: 'left' }} placeholder="请填写定约" options={dealData} />
                            )}
                        </FormItem>
                        {/* 首攻 */}
                        <FormItem
                            {...formItemLayout}
                            label="首攻:"
                            hasFeedback
                        >
                            {getFieldDecorator('openlead', {
                                initialValue: scoringData ? scoringData.openlead.split('') : null,
                                rules: [{ type: 'array', required: true, message: '请填写首攻!' }],
                            })(
                                <Cascader style={{ textAlign: 'left' }} placeholder="请填写首攻" options={leaderData} />
                            )}
                        </FormItem>
                        {/* 结果 */}
                        <FormItem
                            {...formItemLayout}
                            label="结果:"
                            hasFeedback
                        >
                            {getFieldDecorator('result', {
                                initialValue: scoringData ? scoringData.result.split('') : null,
                                rules: [{ type: 'array', required: true, message: '请填写结果!' }],
                            })(
                                <Cascader style={{ textAlign: 'left' }} placeholder="请填写结果" options={resultData} />
                            )}
                        </FormItem>
                        <FormItem style={{ textAlign: 'center' }} >

                            <Button
                                style={{ margin: '0 auto' }}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                提交
                        </Button>
                            <Button
                                style={{ margin: '0 auto', marginLeft: 20 }}
                                onClick={this.handleVisible}
                            >
                                Pass
                </Button>
                        </FormItem>
                    </Form>

                </Modal>

            </div>
        )
    }
}


const ScoringFrom = Form.create()(RecordNewForm);


export default ScoringFrom;