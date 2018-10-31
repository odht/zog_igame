//比赛详情页面
//lsy
//2018-9-4

import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb, Icon, Input, Button, Modal, Form, Checkbox } from 'antd';
import DetailsHeader from '../component/DetailsHeader';
import GlobalFooter from '../component/GlobalFooter';
import logo from '../assets/57130611.jpg';
import * as routes from '../common/detailsroutes';
import Breadcrumbs from '../component/Breakcrumbs'
const { Header, Content, Footer } = Layout;
const { details: headerRoutes } = routes;

//面包屑
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}} >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      );
    }
  }
  const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


class DetailsLayout extends Component {

    state = {
        visible: false,
        confirmLoading: false,
      }
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = () => {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      }
    
      handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      }

    render() {

        // 识别
        const { history: { location: { pathname } } } = this.props;
        const { visible, confirmLoading } = this.state;

        return (
            <Layout style={{ minWidth: 780 }}>
                <div style={{ border: 'none' ,textAlign:"center",lineHeight:'80px'}}>
                    <img style={{ height: '80px', 'float': "left" }} src={logo} />
                    <Button type="primary" onClick={this.showModal}>登录</Button>
                </div>
                <Header >
                    <DetailsHeader
                        headerRoutes={headerRoutes}
                        pathname={pathname}
                    />
                   
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumbs/>
                    <Layout style={{ padding: '12px 0', background: '#fff' }}>

                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ padding: 0 }}>
                    <GlobalFooter
                        links={[
                            {
                                key: 'Pro 首页',
                                title: 'Pro 首页',
                                href: 'http://pro.ant.design',
                                blankTarget: true,
                            },
                            {
                                key: 'github',
                                title: <Icon type="github" />,
                                href: 'https://github.com/ant-design/ant-design-pro',
                                blankTarget: true,
                            },
                            {
                                key: 'Ant Design',
                                title: 'Ant Design',
                                href: 'http://ant.design',
                                blankTarget: true,
                            },
                        ]}
                        copyright={
                            <Fragment>
                                Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
                </Fragment>
                        }
                    />
                </Footer>
                <Modal
                bodyStyle={{paddingTop:"35px"}}
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                maskClosable={false}
                width={300}
                footer={null}
                >
                    <WrappedNormalLoginForm/>
                </Modal>
            </Layout>
        )
    }
}




export default DetailsLayout;