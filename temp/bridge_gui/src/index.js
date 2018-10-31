import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App/ui/utest';  // 单元测试引入这个 到 App
import Game from './App/game/Game';  
//import Game from './App/game/PCTableView'; //  单元测试 PCTableView
//import Game from './App/test/card_motion' // 测试用例
//import Game from './App/test/com_render' // 测试用例
//import Game from './App/test/test_card' // 测试用例
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
