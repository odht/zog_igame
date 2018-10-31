import React from 'react';
import ReactDOM from 'react-dom';
import styles from './gameNational.css';
import { Form, Input,  Select,  AutoComplete,Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    
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
      
        
       <Form onSubmit={this.handleSubmit}>      
        <FormItem >    
         手机号：
          {getFieldDecorator('phone', {
            rules: [{ message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: 260 }} />
          )}
          <a href='reviewlocal'>修改手机号</a>
        </FormItem> 
        
        <FormItem>

          邮箱：
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
               message: 'Please input your E-mail!',
            }],
          })(
            <Input style={{ width: 260,left:15 }}/>
          )}
        </FormItem>  
        <FormItem>
          QQ号：
        <Input style={{ width: 260,left:9}}/>  
        </FormItem>    
        <FormItem>
          微信号：
        <Input style={{ width: 260 }}/>  
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default function() {
  return (
    <div className={styles.normal}>
      <span style={{fontSize:'24px',}}>联系方式</span>
      <div className={styles.phonec}>
        <WrappedRegistrationForm />
      </div>
      <Button  type="primary"  style={{left:150,width:120}}>
            保存
      </Button>
    </div>
  );
}
