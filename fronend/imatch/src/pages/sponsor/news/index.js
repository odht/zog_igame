/**
 * title: 新闻管理 - 智赛桥牌
 * icon: schedule
 */
import React from 'react';
import { Menu } from 'antd';
import Link from 'umi/link';
import style from './index.less';
import { Button } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { Input } from 'antd';
import router from 'umi/router'
const Search = Input.Search;
const columns = [{
  title: '标题',
  dataIndex: 'name',
  render: text => <a href="javascript:;">{text}</a>
}, {
  title: '发布者',
  dataIndex: 'publisher',
}, {
  title: '日期',
  dataIndex: 'date',
}, {
  title: '审核',
  dataIndex: 'examine',
}, {
  title: '操作',
  dataIndex: 'operation',
}];
const data = [{
  key: '1',
  name: '”鸿坤杯“2016年河北省省会桥牌赛落幕',
  publisher: '河北省石家庄市桥牌协会',
  date: '2016-11-21',
  examine: '审核中',
  operation: '删除',
}, {
  key: '2',
  name: '2015年河北省省会桥牌赛圆满落幕',
  publisher: '河北省石家庄市桥牌协会',
  date: '2015-11-17',
  examine: '通过',
  operation: '删除',
}, {
  key: '3',
  name: '关于举办2014年河北省省会桥牌赛的通知',
  publisher: '河北省石家庄市桥牌协会',
  date: '2015-11-17',
  examine: '未通过',
  operation: '删除',
}, {
  key: '4',
  name: '”鸿坤杯“2016年河北省省会桥牌赛落幕',
  publisher: '河北省石家庄市桥牌协会',
  date: '2016-11-21',
  examine: '审核中',
  operation: '删除',
}, {
  key: '5',
  name: '2015年河北省省会桥牌赛圆满落幕',
  publisher: '河北省石家庄市桥牌协会',
  date: '2015-11-17',
  examine: '通过',
  operation: '删除',
}, {
  key: '6',
  name: '关于举办2014年河北省省会桥牌赛的通知',
  publisher: '河北省石家庄市桥牌协会',
  date: '2015-11-17',
  examine: '未通过',
  operation: '删除',
}];
function toCreate() {
	router.push('/sponsor/news/news')
}

export default (props) => {
  return (<div>
    <div className={style.Search}><Search
      placeholder=""
      enterButton="搜索"
      // size="large"
      onSearch={value => console.log(value)}
    /> </div>
       <div className={style.SearchButton}><Button type="delete" backgroundcolor="">重置</Button></div>
    <div className={style.newsButton}>
      <Button type="primary" onClick={toCreate}>新闻发布</Button> <Button type="delete" backgroundcolor="">批量删除</Button>
    </div>
    <div className={style.hr}></div>
    <div className={style.newsTable}>
      <Table rowSelection={{}} columns={columns} dataSource={data} rowKey={(row) => row.key} size="middle" />
    </div>
  </div>
  )
}