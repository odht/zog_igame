import React from 'react';

import { Form, Input,  Select, Button,Row, Col  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class RegistrationForm extends React.Component {
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
   
   return (
      <Form onSubmit={this.handleSubmit}>
         <FormItem
         
        //  label="原密码"
        
       >       
           原密码：
           <Input type="password" style={{ width: 260 ,left:28}}/>
       </FormItem>
         <FormItem        
          label=""
        > 新密码：
          {getFieldDecorator('password', {
            rules: [{
             message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
           <Input type="password" style={{ width: 260,left:28}}/>
          )}
        </FormItem>
        <FormItem

         
        >确认新密码：
          {getFieldDecorator('confirm', {
            rules: [{
              message: '请确认您输入的密码',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur}style={{ width: 260 }}  />
          )}
        </FormItem>
       
      </Form>
    );
  }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default function() {
  return (
    <div >      
      <span style={{fontSize:'18px',fontWeight:'bold'}}>验证身份信息</span>
      <div >
        <span style={{fontSize:'18px',color:'#999',}}>手机号验证</span>
        <span style={{fontSize:'18px',position:'relative',left:'100px'} }>设置新密码</span>
      </div>
      <div >
        <WrappedRegistrationForm />
      </div>
      
      <Button  type="primary"  style={{left:200,width:120}}>
            完成
      </Button>
    </div>
  );
}
