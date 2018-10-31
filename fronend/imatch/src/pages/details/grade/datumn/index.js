import React from 'react';
import ResultDataTable from '../../../../component/ResultDataTable';
import { Table } from 'antd';
import styles from './index.css';

const render0 = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if ( row.key === '14') {
    obj.props.colSpan = 0;
  }
  // These two are merged into above cell
  if (row.key === '15') {
    obj.props.colSpan = 0;
  }
  return obj;
};
const render2 = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if ( row.key === '14') {
    obj.props.colSpan = 2;
  }
  // These two are merged into above cell
  if (row.key === '15') {
    obj.props.colSpan = 2;
  }
  return obj;
};
  
  const columns = [
    {title: '牌号',dataIndex: 'number',   align:'center',width: 100,fixed: 'left'}, 
    { title: 'datumn', dataIndex: 'datumn', align:'center',width: 100,fixed: 'left'},
    {title: '1桌',
    children:[{
        title: '开室',
        dataIndex: 'open',
        align:'center',
        render: render2,
      },{
        title: '闭室',
        dataIndex: 'close',
        align:'center',
        render: render0,
      }]
    },
    {
    title: '2桌',
    children:[{
        title: '开室',
        dataIndex: 'open2',
        align:'center',
        render: render2,
      },{
        title: '闭室',
        dataIndex: 'close2',
        align:'center',
        render: render0,
      }]
    },
    {
    title: '3桌',
    children:[{
        title: '开室',
        dataIndex: 'open3',
        align:'center',
        render: render2,
      },{
        title: '闭室',
        dataIndex: 'close3',
        align:'center',
        render: render0,
      }]
    },
    {
    title: '4桌',
    children:[{
        title: '开室',
        dataIndex: 'open4',
        align:'center',
        render: render2,
      },{
        title: '闭室',
        dataIndex: 'close4',
        align:'center',
        render: render0,
      }]
    },
    {
      title: '5桌',
      children:[{
          title: '开室',
          dataIndex: 'open5',
          align:'center',
          render: render2,
        },{
          title: '闭室',
          dataIndex: 'close5',
          align:'center',
          render: render0,
        }]
      },
    {
      title: '6桌',
      children:[{
          title: '开室',
          dataIndex: 'open6',
          align:'center',
          render: render2,
        },{
          title: '闭室',
          dataIndex: 'close6',
          align:'center',
          render: render0,
        }]
      },
];
  
  const data = [
    { key: '1', number: '1', datumn: -120,open:-7,close:1, open2:-7,close2:1,open3:-7,close3:1, open4:-7,close4:1,open5:-7,close5:1, open6:-7,close6:1,}, 
    {key: '2',number: '2', datumn: 60,open:-7,close:1,open2:-7, close2:1,open3:-7,close3:1, open4:-7,close4:1,open5:-7,close5:1, open6:-7,close6:1,},
    {key: '3', number: '3', datumn: 110, open:-7, close:1, open2:-7, close2:1,open3:-7,close3:1, open4:-7,close4:1,open5:-7,close5:1, open6:-7,close6:1,}, 
    { key: '4',number: '4',datumn: -40,open:-7, close:1, open2:-7,close2:1,open3:-7,close3:1, open4:-7,close4:1,open5:-7,close5:1, open6:-7,close6:1, },
    {key: '5',number: '5', datumn: 1190, open:-7, close:1, open2:-7, close2:1,open3:-7,close3:1, open4:-7,close4:1,open5:-7,close5:1, open6:-7,close6:1,},
    {key: '6',number: '6',datumn: 1190, open:-7, close:1, open2:-7, close2:1,open3:-7,close3:1, open4:-7,close4:1,open5:-7,close5:1, open6:-7,close6:1,},
    {key: '7',number: '7',datumn: 1190,open:-7,close:1,open2:-7,close2:1,open3:-7,close3:1, open4:-7,close4:1,open5:-7,close5:1, open6:-7,close6:1,},
    {key: '8',number: '8',datumn: 1190,open:-7,close:1,open2:-7,close2:1,open3:-7,close3:1, open4:-7,close4:1,open5:-7,close5:1, open6:-7,close6:1, },
    {key: '9',number: ' ', datumn: 'XIMP',open:2,close:1,open2:-7,close2:1,open3:-7,close3:1, open4:-7,close4:1,open5:-7,close5:1, open6:-7,close6:1,},
    {key: '10',number: '',datumn:" N(+)",open:"蔡兴坤",close:'黄灏', open2:"蔡兴坤",close2:'黄灏', open3:"蔡兴坤",close3:'黄灏', open4:"蔡兴坤",close4:'黄灏',open5:"蔡兴坤",close5:'黄灏', open6:"蔡兴坤",close6:'黄灏',  },
    {key: '11', number: '', datumn:" S(+)", open:"于珉", close:'徐学峰', open2:"蔡兴坤", close2:'黄灏',open3:"于珉", close3:'徐学峰', open4:"蔡兴坤", close4:'黄灏',open5:"于珉", close5:'徐学峰', open6:"蔡兴坤", close6:'黄灏',},
    {key: '12', number: '', datumn:" E(-)", open:"徐竹",close:'袁鸿卫', open2:"徐竹",close2:'袁鸿卫',open3:"徐竹",close3:'袁鸿卫', open4:"徐竹",close4:'袁鸿卫',open5:"徐竹",close5:'袁鸿卫', open6:"徐竹",close6:'袁鸿卫',},
    {key: '13',number: '',datumn:" W", open:" ",close:' ',},
    {key: '14',number: '',datumn:" 主队",open:"法尔胜",close:' ',   open2:"法尔胜",close2:' ',open3:"法尔胜",close3:' ',   open4:"法尔胜",close4:' ',open5:"法尔胜",close5:' ',   open6:"法尔胜",close6:' ', },
    {key: '15',number: '',datumn:" 客队",open:"奉贤海外队",close:' ',  open2:"奉贤海外队",close2:' ',open3:"奉贤海外队",close3:' ',  open4:"奉贤海外队",close4:' ',open5:"奉贤海外队",close5:' ',  open6:"奉贤海外队",close6:' ', },
];
  

export default props => {
    return (
        <div>
            <div style={{ textAlign: 'center' }} >
                <hr/>
                <h1>公开团体赛:排位赛</h1>
                <h2>排位赛：第一桌</h2>            
            </div>
            <div className={styles.normal}style={{ textAlign: 'center' }}>
            <Table columns={columns} dataSource={data} size='xs' pagination={false} scroll={{ x: 1300 }} bordered />
            </div>
        </div>
    )
}