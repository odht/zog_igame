// import styles from './news.css';

// export default function() {
//   return (
//     <div className={styles.normal}>
//       <h1>Page news</h1>
//     </div>
//   );
// }


import styles from './news.css';
import { List } from 'antd';
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Man charged over missing wedding girl.',
];
export default function() {
  return (
    <div>
    <h3 style={{ margin: '16px 0' }}>新闻</h3>
    <List
      pagination={{pageSize:5}}
      size="large"
      
     
      dataSource={data}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
  </div>
  );
}