import styles from './gameseatch.css';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const event = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1"><Icon type="user" />全国赛</Menu.Item>
    <Menu.Item key="2"><Icon type="user" />地方赛</Menu.Item>
    <Menu.Item key="3"><Icon type="user" />会场赛</Menu.Item>
  </Menu>
);
const style = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1"><Icon type="user" />金分</Menu.Item>
    <Menu.Item key="2"><Icon type="user" />银分</Menu.Item>
    <Menu.Item key="3"><Icon type="user" />黑分</Menu.Item>
  </Menu>
);
const time = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1"><Icon type="user" />2016-1-1~2016-12-31</Menu.Item>
    <Menu.Item key="2"><Icon type="user" />2017-1-1~2017-12-31</Menu.Item>
    <Menu.Item key="3"><Icon type="user" />2018-1-1~2018-12-31</Menu.Item>
  </Menu>
);
export default function() {
  return (
    <div className={styles.normal}>
    
      <Dropdown overlay={event}>
      <Button style={{ marginLeft: 8 }}>
        -------&nbsp;&nbsp;&nbsp;请选择查询赛事&nbsp;&nbsp;&nbsp;------ <Icon type="down" />
      </Button>
    </Dropdown>
    
      <Dropdown overlay={style}>
      <Button style={{ marginLeft: 8 }}>
      -------&nbsp;&nbsp;&nbsp;请选择查询类型&nbsp;&nbsp;&nbsp;------ <Icon type="down" />
      </Button>
    </Dropdown>
    
    <Dropdown overlay={time}>
      <Button style={{ marginLeft: 8 }}>
      -------&nbsp;&nbsp;&nbsp;请选择举办时间&nbsp;&nbsp;&nbsp;------ <Icon type="down" />
      </Button>
    </Dropdown>
    <Button type="primary" icon="search">搜索</Button>
    
    </div>
  );
}
