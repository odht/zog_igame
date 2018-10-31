import React, { Component } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
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

class RegistrationForm extends Component {
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
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="项目"
        >
          {getFieldDecorator('project', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: '请输入项目名称',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="队名"
        >
          {getFieldDecorator('ream', {
            rules: [{
              required: true, message: '请输入队名!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="领队"
        >
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='赛事证号' style={{ width: '100px' }} />
          )}
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='姓名' style={{ width: '200px' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="教练"
        >
          {getFieldDecorator('coach', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='赛事证号' style={{ width: '100px' }} />
          )}
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='姓名' style={{ width: '200px' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="队员1"
        >
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='赛事证号' style={{ width: '100px' }} />
          )}
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='姓名' style={{ width: '200px' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="队员2"
        >
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='赛事证号' style={{ width: '100px' }} />
          )}
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='姓名' style={{ width: '200px' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="队员3"
        >
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='赛事证号' style={{ width: '100px' }} />
          )}
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '赛事证号',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder='姓名' style={{ width: '200px' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系人"
        >
          {getFieldDecorator('contacts', {
            rules: [{
              required: true, message: '请输入联系人',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话"
        >
          {getFieldDecorator('phone', {
            rules: [{
              message: 'The input is not valid E-mail!',
            }, {
              required: true, message: '请输入电话号码',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: '请输入邮箱地址',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class Join extends Component {
  render() {
    return (
      <div style={{ width: '500px', margin: '0 auto' }}>
        <WrappedRegistrationForm />
      </div>
    )
  }
}