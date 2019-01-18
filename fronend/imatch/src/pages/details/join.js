import React from 'react';
import { Form, Input, Button, Select, Radio } from 'antd';
import odoo from '@/odoo-rpc/odoo';
import router from 'umi/router';
import styles from './join.less';
const Option = Select.Option;

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


@Form.create()
class Join extends React.Component {

  state = {
    userData: [],
    conach: '',
    leader: '',
  }

  // 提交报名
  submintJoin = async (teamValues, playerValues) => {
    //  创建team
    const Team = odoo.env('og.team');
    const team = await Team.create(teamValues);
    const { id } = team.look({ id: null, name: null });

    const Players = odoo.env('og.team.player');
    const player = async (playerValues) => {
      playerValues.players.map(item => {
        let role = "player";
        if (item === playerValues.coach) {
          role = 'coach';
        } else if (item === playerValues.leader) {
          role = 'leader';
        }
        createTeamPlayer(role, item);
      })
    }
    player(playerValues).then(router.push('/game'));

    async function createTeamPlayer(role, item) {
      await Players.create({ team_id: id, role: role, partner_id: parseInt(item) });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { coach, email, gameName, leader, phone, players, teamName } = values;
        const { location: { state: { gameData } } } = this.props;
        const teamValues = { name: teamName, game_id: gameData.id };
        const playerValues = { players, leader, coach };
        this.submintJoin(teamValues, playerValues);
      }
    });
  }
  // 获取partner
  getPartner = async () => {
    const Users = odoo.env('res.users');
    const users = await Users.search();
    const userData = users.look({ partner_id: { id: null, name: null } });
    const attrUserDate = userData.map(item => { return { name: item.partner_id.name, id: item.partner_id.id } });
    this.setState({
      userData: attrUserDate,
    })
  };

  componentDidMount() {
    this.getPartner();
  }
  render() {
    const { location: { state: { gameData } } } = this.props;
    let children = [];
    this.state.userData.map(item => {
      children.push(<Option key={item.id}>{item.name}</Option>);
    });

    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.formBox}>
        <Form onSubmit={this.handleSubmit} >
          <Form.Item
            {...formItemLayout}
            label="比赛名称"
          >
            {getFieldDecorator('gameName', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
              initialValue: gameData.name,
            })(
              <Input disabled style={{maxWidth:'300px'}}/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="队名"
          >
            {getFieldDecorator('teamName', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input style={{maxWidth:'300px'}} />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="领队"
          >
            {getFieldDecorator('leader', {
              rules: [{
                required: true, message: '请选择领队',
              }],
            })(
              <Select
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                style={{maxWidth:'300px'}}
              >
                {children}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="教练"
          >
            {getFieldDecorator('coach', {
              rules: [{
                required: true, message: '请选择教练',
              }],
            })(
              <Select
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                style={{maxWidth:'300px'}}
              >
                {children}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="队员"
          >
            {getFieldDecorator('players', {
            })(
              <Select
                mode="multiple"
                style={{maxWidth:'300px'}}
              >
                {children}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="联系人"
          >
            {getFieldDecorator('xxxx', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input style={{maxWidth:'300px'}} />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="电话"
          >
            {getFieldDecorator('phone', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input style={{maxWidth:'300px'}} />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Email"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input style={{maxWidth:'300px'}} />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button htmlType="submit" type="primary">提交</Button>
          </Form.Item>
        </Form>
      </div>  
    );
  }
}

export default Join;




