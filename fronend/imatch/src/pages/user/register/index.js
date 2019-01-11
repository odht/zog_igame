import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import 'antd/dist/antd.css';
import {connect} from 'dva';
import logoPic from '../../../assets/BridgeLogo.png';


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'HangzhouHangzhouHangzhou',
        children: [{
            value: 'xihu',
            label: 'West LakeLakeLakeLake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class RegisterBlock extends Component{

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
    
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
    
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
    
        return (
        <div className={styles.registerBox}>   
        <Form onSubmit={this.handleSubmit} >
            <Form.Item
                {...formItemLayout}
                label="昵称"
            >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请填写您的昵称!', whitespace: true }],
                    })( 
                        <Input style={{ width: '85%', maxWidth:'300px'}}/> 
                    )}
            </Form.Item>
            
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
            
            <Form.Item
                {...formItemLayout}
                label="邮箱"
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: '邮箱格式错误!',
                    }, {
                        required: false, message: '请填写您的邮箱!',
                    }],
                })(
                    <Input style={{ width: '85%', maxWidth:'300px'}}/>
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="住址"
            >
                {getFieldDecorator('residence', {
                    initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                    rules: [{ type: 'array', required: true, message: '请填写您的住址!' }],
                })(
                    <Cascader options={residences} style={{ width: '85%', maxWidth:'300px'}}/>
                )}
            </Form.Item>
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
            <Form.Item
                style={{textAlign:'center'}}
            >
                {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                })(
                    <Checkbox style={{fontSize:'12px'}}>
                        我已经阅读并且同意
                        <Link to="/user/userAgreement">智赛棋牌用户协议</Link>
                    </Checkbox>
                )}
            </Form.Item>

            <Form.Item 
                style={{textAlign:'center'}}
            >
                <Button
                    type="primary" 
                    htmlType="submit"
                >
                    注册
                </Button>
            </Form.Item>
        </Form>
        </div> 
        );
    }
}



const WrappedRegistrationForm = Form.create({ name:'注册表单'})(RegisterBlock);

export default WrappedRegistrationForm;