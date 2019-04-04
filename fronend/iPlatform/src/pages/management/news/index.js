/*
 * @Author: Nxf
 * @Description:
 * @Date: 2019-03-02 16:30:09
 * @LastEditTime: 2019-03-02 17:10:16
 */

import React, { Component }  from "react";
import { Table } from "antd";


class NewsTableBlock extends Component{


    deleteRow = (text) => {
       console.log( text ) ;
    }
    render(){
      const columns = [{
        title:'标题',
        dataIndex:'title',
        key:'title',
        align:'center'
      },{
        title:'发布方',
        dataIndex:'author',
        key:'author',
        align:'center'
      },{
        title:'日期',
        dataIndex:'publishDate',
        key:'publishDate',
        align:'center'
      },{
        title:'状态',
        dataIndex:'newsState',
        key:'newsState',
        align:'center'
      },{
        title:'操作',
        dataIndex:'newsManage',
        key:'newsManage',
        align:'center',
        render:(text,record) =>(
          <a href= "# " onClick = {this.deleteRow(text)}>删除</a>
        )
      }];
      const dataSource =[{
        key:'1',
        title:'"鸿坤杯"2019年河北省省会桥牌赛5月1日盛大开赛',
        author:'石家庄桥牌协会',
        publishDate:'2019-3-1',
        newsState:'审核中'
      },{
        key:'2',
        title:'"鸿宏杯"2019年河北省省会桥牌赛6月1日盛大开赛',
        author:'河北省桥牌协会',
        publishDate:'2019-4-3',
        newsState:'通过'
      },{
        key:'3',
        title:'"鸿坤杯"2019年团体桥牌赛5月1日盛大开赛',
        author:'石家庄桥牌协会',
        publishDate:'2019-3-1',
        newsState:'未通过'
      },{
        key:'4',
        title:'"ADC杯"2019年河北省桥牌赛5月5日盛大开赛',
        author:'河北省桥牌协会',
        publishDate:'2019-4-13',
        newsState:'通过'
      },{
        key:'5',
        title:'"鸿坤杯"桥牌等级赛赛3月21日盛大开赛',
        author:'石家庄桥牌协会',
        publishDate:'2019-3-11',
        newsState:'通过'
      },];
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
      };
      return(

            <Table
              dataSource={dataSource}
              columns={columns}
              rowSelection={rowSelection}
            ></Table>
      )
    }
}


export default NewsTableBlock;
