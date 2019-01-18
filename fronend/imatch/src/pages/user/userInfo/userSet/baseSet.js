import React, { Component } from 'react';
import { Row, Col, Upload, message, Button, Icon, Form, Input, Radio, Select, Cascader } from 'antd';
import { Link } from 'dva/router';
import styles from './baseSet.less';
import 'antd/dist/antd.css';
import {connect} from 'dva';


import userPic from '../../../../assets/icon.png';


var userInfo={
    name:"王自健",
    gender:"先生",
    level:"桥牌终身大师",
    nickName:"孤独根号三",
    phone:"11012012306",
    weChat:"WZJ1314",
    QQ:"5543164",
    email:"wangzijian@sina.com",
    address:"中国河北省石家庄市裕华区裕华路110号",
    matchTeam:"河北宏鸿桥牌队"
}

var countrysList=[
    {
        value: 'China',
        label: '中国'
    },
    {
        value: 'USA',
        label: '美国'
    },
];
var provincesList=[
    
] ;

const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
}
class UserPicBlock extends Component{
    
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render(){

        return(
            <Upload {...props}>
                <Button>
                <Icon type="upload" /> 修改头像
                </Button>
            </Upload>
        );
    }
}

class BaseInfoBlock extends Component{
    

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
            <div className={styles.registerBox}>   
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item
                        {...formItemLayout}
                        label="游戏昵称"
                    >
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: '请填写您的昵称!', whitespace: true }],
                            })( 
                                <Input style={{ width: '85%', maxWidth:'300px'}}/> 
                            )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="姓名"
                    >
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: '请填写您的姓名!', whitespace: true }],
                            })( 
                                <Input style={{ width: '85%', maxWidth:'300px'}}/> 
                            )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="性别"
                    >
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: '请填写您的性别!', whitespace: true }],
                            })( 
                                <Radio.Group>
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
                                </Radio.Group> 
                            )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="棋牌等级"
                    >
                            {getFieldDecorator('level', {
                                rules: [{ required: true, message: '请填写您的棋牌等级!', whitespace: true }],
                            })( 
                                <Select placeholder="请填写您的棋牌等级" style={{ width: '85%', maxWidth:'300px'}}>
                                    <Option value="C-L">梅花初级大师</Option>
                                    <Option value="D-L">方块初级大师</Option>
                                    <Option value="H-L">红心初级大师</Option>
                                    <Option value="S-L">黑桃初级大师</Option>
                                    <Option value="C-M">梅花中级大师</Option>
                                    <Option value="D-M">方块中级大师</Option>
                                    <Option value="H-M">红心中级大师</Option>
                                    <Option value="S-M">黑桃中级大师</Option>
                                    <Option value="O-C">一星国家大师</Option>
                                    <Option value="T-C">二星国家大师</Option>
                                    <Option value="Th-C">三星国家大师</Option>
                                    <Option value="O-H">一星终身大师</Option>
                                    <Option value="T-H">二星终身大师</Option>
                                    <Option value="Th-H">三星终身大师</Option>
                                    <Option value="F-H">四星终身大师</Option>
                                    <Option value="Fi-H">五星终身大师</Option>
                                </Select>
                            )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="微信"
                    >
                            {getFieldDecorator('weChat', {
                                rules: [{ required: true, message: '请填写您的微信号!', whitespace: true }],
                            })( 
                                <Input style={{ width: '85%', maxWidth:'300px'}}/> 
                            )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="QQ号"
                    >
                            {getFieldDecorator('QQ', {
                                rules: [{ required: true, message: '请填写您的QQ号!', whitespace: true }],
                            })( 
                                <Input style={{ width: '85%', maxWidth:'300px'}}/> 
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
                                required: true, message: '请填写您的邮箱!',
                            }],
                        })(
                            <Input style={{ width: '85%', maxWidth:'300px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="国家/地区"
                    >
                        {getFieldDecorator('country', {
                            initialValue: ['中国'],
                            rules: [{ type: 'array', required: true, message: '请填写您的国家/地区!' }],
                        })(
                            <Cascader options={countrysList} style={{ width: '85%', maxWidth:'300px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="省市"
                    >
                        {getFieldDecorator('province', {
                            initialValue: ['河北省','石家庄市'],
                            rules: [{ type: 'array', required: true, message: '请填写您所在的省市!' }],
                        })(
                            <Cascader options={provincesList} style={{ width: '85%', maxWidth:'300px'}}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="街道地址"
                    >
                            {getFieldDecorator('street', {
                                rules: [{ required: true, message: '请填写您所在的街道地址!', whitespace: true }],
                            })( 
                                <Input style={{ width: '85%', maxWidth:'300px'}}/> 
                            )}
                    </Form.Item>
                
                    <Form.Item 
                        style={{textAlign:'center'}}
                    >
                        <Button
                            type="primary" 
                            htmlType="submit"
                        >
                            更新基本信息
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        ); 
    } 
}

const BaseInfoBlockForm = Form.create({ name:'注册表单'})(BaseInfoBlock);

class BaseSetBlock extends Component{
    
    state = {
    }

    render(){
        return(
            <div className={styles.baseSetBox}>
                <div className={styles.topTitle}>
                    基本设置
                </div>
                <Row className={styles.userInfoBox} >
                    <Col lg={1} md={1} ></Col>
                    <Col lg={7} md={7} >
                        <div className={styles.userNameBox}>
                            {/* <img src={userInfo.avatar} className={styles.userPic}/> */}
                            <img src={userPic} className={styles.userPic}/>
                            <UserPicBlock />
                        </div>
                    </Col>
                    <Col lg={1} md={1} ></Col>
                    <Col lg={15} md={15}>
                    <div className={styles.baseInfoBox}>
                        <BaseInfoBlockForm/>
                    </div>
                </Col>
                </Row>
            </div>
            
        );
    }
}

export default BaseSetBlock;