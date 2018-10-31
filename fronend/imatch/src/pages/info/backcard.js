import React from 'react';

import { Form, Input,  Select, Button,Row, Col  } from 'antd';

export default function() {
  return (
    <div >      
      <span style={{fontSize:'18px',fontWeight:'bold'}}>验证身份信息</span>
      <div >
        <span style={{fontSize:'18px'}}>手机号验证</span>
        <span style={{fontSize:'18px',color:'#999',position:'relative',left:'100px'} }>上传身份信息</span>
      </div>
      <ul style={{position:'relative',left:'70px',marginTop:'30px'}}>
        <li >
          <span >真实姓名：  </span>
          <Input  />
        </li> 
        <li>
          <span >身份证号码:</span>
          <Input  />
        </li>
        <li><span  >上传银行卡照片：</span>
        
        </li>
        </ul>
        <div >
          
        </div>
      <a href='#'><Button  type="primary"  style={{left:200,width:120}}>
           完成
      </Button></a>
    </div>
  );
}