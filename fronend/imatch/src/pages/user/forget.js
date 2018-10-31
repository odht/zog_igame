import React,{ Component } from "react";
import { Card,Row,Col,Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './forget.less';
import { Link } from "dva/router";
const FormItem = Form.Item;
const headStyle={backgroundColor:'#f5f5f5',
border:'1px solid #ddd',
fontSize: '16px',
color: 'rgba(0, 0, 0, 0.85)',
height:"20px"
}

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
        <Form onSubmit={this.handleSubmit} className={styles.login}>
          <FormItem>
              <label className={styles.username} >手机号</label>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入手机号' }],
            })(
              <Input placeholder="11位手机号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入验证码' }],
            })(
              <Input type="password" placeholder="右侧的验证码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>
              提交
            </Button>
            
          </FormItem>
        </Form>
      );
    }
  }
  
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default class Login extends Component{
    render(){
        return(
           
                <div style={{margin:'0 auto',width:'500px'}}>
                <div className={styles.title}>重置密码</div>
                    <Card  bordered={true} style={{ width: '100%' }}
                    headStyle={headStyle}
                    bodyStyle={{border: '1px solid #ddd'}}
                    >
                        <WrappedNormalLoginForm/>
                    </Card>
                </div>
               
               
        
        )
    }
}