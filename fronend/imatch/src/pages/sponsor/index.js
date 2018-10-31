import React from 'react';
import { DatePicker } from 'antd';
class Grid extends React.Component {
    render() {
      return <div>{this.props.children}</div>
    }
  }
export default ()=>(<Grid>
 <div>aaaaaaaaaaaaa</div>
 <div>bbbbbbbbbbbbb</div>
 <div>ccccccccccccc</div>
</Grid>)