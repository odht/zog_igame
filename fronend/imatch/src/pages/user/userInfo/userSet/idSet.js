import React, { Component } from 'react';
import { Form, Steps, Button, Select, Input, Tooltip, Icon  } from 'antd';
import { Link } from 'dva/router';
import styles from './idSet.less';
import 'antd/dist/antd.css';
import {connect} from 'dva';


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
                <Option value="87">+87</Option>
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
                            rules: [{ required: true, message: '请填写您的手机号!' }],
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
                            <Input style={{ width: '55%', maxWidth:'190px'}}/>
                        )}
                        <Button style={{width: '90px', marginLeft:'8px',fontSize:'10px'}}>获取验证码</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const PhoneConfirmForm = Form.create({ name: 'phoneConfirm' })(PhoneConfirm);


class IdSetBlock extends Component{

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
                    label= "姓名"
                >
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请填写您的姓名!'}
                        ]})(
                        <Input type="string" style={{ width: '85%', maxWidth:'300px'}}/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="身份证号"
                >
                    {getFieldDecorator('idNum', {
                        rules: [
                            { required: true, message: '请再次确认您的身份证号!'}
                        ]})(
                        <Input type="string" onBlur={this.handleConfirmBlur} style={{ width: '85%', maxWidth:'300px'}}/>
                    )}
                </Form.Item>
            </div>
        );
    }
}
const IdSetBlockForm = Form.create({ name: 'idSet' })(IdSetBlock);


const Step = Steps.Step;

const steps = [{
    title: '手机号验证',
    content: <PhoneConfirmForm/>,
}, {
    title: '身份认证',
    content: <IdSetBlockForm/>,
}];


class IdSetBox extends Component{
    
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
            <div className={styles.idSetBox}>
                <div className={styles.topTitle}>
                    身份认证
                </div>
                <div className={styles.idStepBox} >
                    <Steps current={current} size='small'>
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

export default IdSetBox;