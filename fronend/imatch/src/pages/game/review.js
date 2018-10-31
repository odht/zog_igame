import { Table } from 'antd';
import { Link } from 'react-router-dom';
export const TeamData = [
  {key: 1,
  name: '全国锦标赛',
  age: '中国桥牌协会',
  time: '2017-9-1~2017-9-10',
  tags:'全国',
  ps:'金分'},
  {key: 2,
  name: '输入赛事名称',
  age: '河北省桥牌赛',
  time: '2017-8-1·2017-8-10',
  tags:'地方',
  ps:'银分'},
  {key: 3,
  name: '石家庄桥牌赛',
  age: '石家庄分会场',
  time: '2017-7-1·2017-7-10',
  tags:'全国',
  ps:'全国'},
  {key: 4,
    name: '全国锦标赛',
    age: '中国桥牌协会',
    time: '2017-6-1~2017-6-10',
    tags:'全国',
    ps:'金分'},
    {key: 5,
    name: '输入赛事名称',
    age: '河北省桥牌赛',
    time: '2017-5-1·2017-5-10',
    tags:'地方',
    ps:'银分'},
    {key: 6,
    name: '石家庄桥牌赛',
    age: '石家庄分会场',
    time: '2017-4-1·2017-4-10',
    tags:'全国',
    ps:'全国'},]
  const TeamList =()=>{
      const columns = [
        { title: '赛事名称',
         dataIndex: 'name',
         width: 150,
         render: text => (<Link to='/details/dhome' target="_black">{text}</Link>)},
         {title: '举办方',
         dataIndex: 'age',
         width: 150,}, 
         { title: '时间',
         dataIndex: 'time',
         width: 150,
         }, {
         title:'类型',
         dataIndex:'tags',
         width: 150,
         },{
         title:'备注',
         dataIndex:'ps',
         width: 150,
         },]
  
    return (
      <div >
        <h1><Table 
        columns={columns} 
        dataSource={TeamData} 
        pagination={{ pageSize: 5 }} 
        scroll={{ y: 300 }} /></h1>
        
          
      </div>
    );
  }
  export default TeamList