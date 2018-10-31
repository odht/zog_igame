import styles from './gameNational.css';
import React from 'react';

import { Upload, Button, Icon } from 'antd';

const fileList  = [{
  uid: '-1',
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

const props2 = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  defaultFileList: [...fileList],
  className: 'upload-list-inline',
};


 
export default function() {
  return (
    <div className={styles.normal}>
      <span className={styles.spanc}><a href='./'>基本信息</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      头像照片
      </span>
      <div className={styles.uploadc}> 
      <Upload  {...props2} >
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    </Upload>
       <Button  type="primary" htmlType="submit" className={styles.login}>
            保存
      </Button>
   </div>
 
    </div>
  );
}
