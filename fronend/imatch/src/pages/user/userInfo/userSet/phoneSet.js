import React, { Component } from 'react';
import {Form, Steps, Button, Select, Input, message } from 'antd';
import styles from './phoneSet.less';
import 'antd/dist/antd.css';
import BtnTimer from '../../../../component/BtnTimer';

const {Option} = Select;

class OldPhoneConfirm extends Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render(){
        
        const { getFieldDecorator } = this.props.form;
    
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 2 },
                sm: { span: 18},
            },
        };
        const prefixSelector = getFieldDecorator('prefix', { 
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
            </Select>
        );
        return(
            <div style={{paddingTop:'20px'}}>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item
                        {...formItemLayout}
                        label="手机号"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ 
                                required: true, 
                                message: '请填写您的手机号!' 
                            },{
                                pattern: /^\d{11}$/,
                                message: '手机号格式错误 ^v^',
                            }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '95%', maxWidth:'300px'}} />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="验证码"
                        extra="请填写从手机获取的短信验证码."
                    >
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: '请填写验证码!' }],
                        })(
                            <Input style={{ width: '70%', maxWidth:'220px' }}/>
                        )}
                        {/* <Button style={{width: '90px', marginLeft:'8px',fontSize:'10px'}}>
                            获取验证码
                        </Button> */}
                        <BtnTimer></BtnTimer>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const OldPhoneConfirmForm = Form.create({ name: 'oldPhoneConfirm' })(OldPhoneConfirm);

class NewPhoneConfirm extends Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render(){
        
        const { getFieldDecorator } = this.props.form;
    
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 2 },
                sm: { span: 18},
            },
        };
        const prefixSelector = getFieldDecorator('prefix', { 
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
            </Select>
        );
        return(
            <div style={{paddingTop:'20px'}}>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item
                        {...formItemLayout}
                        label="手机号"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ 
                                required: true, 
                                message: '请填写您的手机号!' 
                            },{
                                pattern: /^\d{11}$/,
                                message: '手机号格式错误 ^v^',
                            }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '95%', maxWidth:'300px'}} />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="验证码"
                        extra="请填写从手机获取的短信验证码."
                    >
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: '请填写验证码!' }],
                        })(
                            <Input style={{ width: '70%', maxWidth:'220px' }}/>
                        )}
                        {/* <Button style={{width: '90px', marginLeft:'8px',fontSize:'10px'}}>
                        获取验证码
                        </Button> */}
                        <BtnTimer></BtnTimer>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const NewPhoneConfirmForm = Form.create({ name: 'newPhoneConfirm' })(NewPhoneConfirm);


const Step = Steps.Step;

const steps = [{
    title: '旧手机号验证',
    content: <OldPhoneConfirmForm/>,
}, {
    title: '新手机号设置',
    content: <NewPhoneConfirmForm/>,
}];

class PhoneSetBlock extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render(){

        const { current } = this.state;

        return(
            <div className={styles.phoneSetBox}>
                <div className={styles.topTitle}>
                    手机号修改
                </div>
                <div className={styles.phoneStepBox} >
                    <Steps current={current}  size='small'>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                    <div className="steps-action">
                        {
                            current < steps.length - 1
                            && <Button type="primary" onClick={() => this.next()}>下一步</Button>
                        }
                        {
                            current === steps.length - 1
                            && <Button type="primary" onClick={() => message.success('修改完成!')}>完成</Button>
                        }
                        {
                            current > 0
                            && <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>上一步</Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PhoneSetBlock;