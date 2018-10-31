import React from 'react';
import { Table } from 'antd';
export const TeamData = [
  {key: 1,
    name: '1',
    age: '嘉兴良友队',
    time: '1',
    tags:'37.90',
    ranking:'1',
    fraction:'37.90',
    opponent1:'3',
    score1:'18.53',
    opponent2:'43',
    score2:'19.37',
    penalty:'',
    point:'',
    winning:'2',
    average:'12.9600',
    impq:'18000'
   },
    {key: 2,
      name: '2',
    age: '红船队',
    time: '12',
    tags:'32.90',
    ranking:'13',
    fraction:'35.16',
    opponent1:'5',
    score1:'17.25',
    opponent2:'23',
    score2:'17.37',
    penalty:'',
    point:'',
    winning:'2',
    average:'11.2100',
    impq:'16000'
    },
    {key: 3,
      name: '3',
    age: '平湖桥协队',
    time: '21',
    tags:'35.62',
    ranking:'7',
    fraction:'32.70',
    opponent1:'22',
    score1:'17.53',
    opponent2:'26',
    score2:'16.78',
    penalty:'',
    point:'',
    winning:'2',
    average:'13.1600',
    impq:'12000'
    },
    {key: 4,
      name: '4',
      age: '圣醒火星队',
      time: '32',
      tags:'34.96',
      ranking:'1',
      fraction:'35.44',
      opponent1:'13',
      score1:'18.53',
      opponent2:'43',
      score2:'12.37',
      penalty:'',
      point:'',
      winning:'2',
      average:'12.9600',
      impq:'17600'
      },
      {key: 5,
        name: '5',
    age: '山西晋利',
    time: '5',
    tags:'36.20',
    ranking:'46',
    fraction:'36.23',
    opponent1:'38',
    score1:'17.24',
    opponent2:'43',
    score2:'18.24',
    penalty:'',
    point:'',
    winning:'2',
    average:'11.8700',
    impq:'14550'
      },
      {key: 6,
        name: '6',
    age: '上海长寿',
    time: '7',
    tags:'32.46',
    ranking:'6',
    fraction:'35.91',
    opponent1:'23',
    score1:'17.44',
    opponent2:'46',
    score2:'18.26',
    penalty:'',
    point:'',
    winning:'2',
    average:'12.9600',
    impq:'14250'
     },]

      const columns = [
        { title: '队号',
         dataIndex: 'name',
         width: 50,
      },
         {title: '队名',
         dataIndex: 'age',
         width: 50,}, 
         { title: '排名',
         dataIndex: 'time',
         width: 50,
         }, 
         { title: '总分',
         dataIndex: 'tags',
         width: 50,
         },{
         title:'第一轮',
         children:[ { title: '对手',
         dataIndex: 'opponent1',
         width: 50,
         },
         {title: '得分',
         dataIndex: 'score1',
         width: 50,}
        ]
        //  dataIndex:'tags',
        //  width: 150,
         },{
          title:'第二轮',
          children:[ { title: '对手',
          dataIndex: 'opponent2',
          width: 50,
          },
          {title: '得分',
          dataIndex: 'score2',
          width: 50,}
         ]
         //  dataIndex:'tags',
         //  width: 150,
          },{ title: '罚分',
          dataIndex: 'penalty',
          width: 50,
       },
          {title: '带分',
          dataIndex: 'point',
          width: 50,}, 
          { title: '获胜轮数',
          dataIndex: 'winning',
          width: 50,
          }, 
          { title: '平均对手分',
          dataIndex: 'average',
          width: 50,
          },{ title: 'IMP.Q',
          dataIndex: 'impq',
          width: 50,
          },]
         class TeamList extends React.Component {
          render() {return (
            <div>
             
              <h1><Table 
              columns={columns} 
              dataSource={TeamData} 
              // pagination={{ pageSize: 5 }} 
              scroll={{ y: 300 }} 
              size="small"
              bordered={true  }
              
              />
              
              </h1>
              
                
          </div>)}
        }
  
  
  export default TeamList