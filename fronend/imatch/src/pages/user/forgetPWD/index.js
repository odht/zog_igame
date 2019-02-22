import React, { Component } from 'react';
import {Form, Steps, Button, Select, Input, Tooltip, Icon, message } from 'antd';
import styles from './index.less';
import BtnTimer from '../../../component/BtnTimer';
import 'antd/dist/antd.css';


const { Option } = Select;

class PhoneConfirm extends Component{

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
                            }]
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '85%', maxWidth:'300px'}} />
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
                            <Input style={{ width: '60%', maxWidth:'220px'}}/>
                        )}
                        <BtnTimer></BtnTimer>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const PhoneConfirmForm = Form.create({ name: 'phoneConfirm' })(PhoneConfirm);

class InputNewPWD extends Component{

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
        
        return(
            <div  style={{paddingTop:'20px'}}>
                <Form.Item
                    {...formItemLayout}
                    label={(
                        <span>
                            密码&nbsp;
                            <Tooltip title="密码是6~12位字母和数字组合，字母区分大小写">
                                <Icon type='question-circle-o'></Icon>
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请填写您的密码!' },
                            { validator: this.validateToNextPassword, }],
                    })(
                        <Input type="password" style={{ width: '85%', maxWidth:'300px'}}/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [
                            { required: true, message: '请再次确认您的密码!',}, 
                            {validator: this.compareToFirstPassword,}],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} style={{ width: '85%', maxWidth:'300px'}}/>
                    )}
                </Form.Item>
            </div>
        );
    }
}
const InputNewPWDForm = Form.create({ name: 'inputNewPwd' })(InputNewPWD);

const Step = Steps.Step;

const steps = [{
    title: '手机号验证',
    content: <PhoneConfirmForm/>,
}, {
    title: '新密码输入',
    content: <InputNewPWDForm/>,
}];

class PwdSetBlock extends Component{
    

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
            <div className={styles.pwdSetBox}>
                <div className={styles.topTitle}>
                    密码重置
                </div>
                <div className={styles.pwdStepBox} >
                    <Steps current={current} size="small">
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

export default PwdSetBlock;
