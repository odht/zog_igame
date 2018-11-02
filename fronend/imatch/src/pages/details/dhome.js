

import React from 'react';

import ListDecorator from '../../component/ListDecorator';
import * as detaData from '../../../mock/detail';
import { Link } from 'react-router-dom';
import { Button } from 'antd';



const { detailData, announcement } = detaData;
export default function (props) {
  
  return (
    <div>
      <ListDecorator
        detailData={detailData}
        announcement={announcement}
      />
      <Link to='/details/join'><Button type='primary'>点击报名</Button></Link>
    </div>
  );
}
