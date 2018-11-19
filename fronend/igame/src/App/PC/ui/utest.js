/**
 * 这里是 ui 文件夹的单元测试 入口。
 * 由 index.js 引入。这里导出 App
 */

import React, { Component } from 'react';
import Card from './card'
//import Table from './table'
import Game from './table'


class App extends Component {
    render(){
        const game = new Game();

        return game.user.uname;
    }
}

// class App1 extends Component {
//     render() {
//         return (
//             <Table>
//             <div style={{'position':'relative'}}><Card name='S8' /></div>
//             <div style={{'position':'relative','left':'25px'}}><Card name='H9' /></div>
//             <div style={{'position':'relative','left':'50px'}}><Card name='S10' /></div>
//             </Table>
//         );
//     }
// }

export default App