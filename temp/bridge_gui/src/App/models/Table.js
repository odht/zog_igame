import Card from '../game/Card'  // 也应该从模型引入
import Models from './model'
import { flexLayout } from '../libs/layout.js'
/**
 * TableModel 游戏桌 数据Model
 * 
 * 这个类主要用于 数据的计算，用来构造新的 state
 * 这里不含有任何 React 的组件。
 * Table.js 也就是 Table 控制器（容器）类调用本类
 * 
 * 输入：
 * 输出：
 * 
 * 
 * 其他参考：
 *    innerWidth，innerHeight
 *    获取窗口的高度与宽度(不包含工具条与滚动条):
 */
class TableModel {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.board = []; // 出牌区域的四张牌
    this.seat = {
      east: [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // seat 用于记录坐标 
      south: [{ x: 0, y: 0 }, { x: 0, y: 0 }], // 第一个xy 是 四个区域左上角坐标
      west: [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // 第二个xy 是 出牌4个区域坐标。
      north: [{ x: 0, y: 0 }, { x: 0, y: 0 }]   // 也就是牌出到什么地方。
    }
    this.zindex = 10;
    this.myseat = 'west'               // 用户坐在 南
    this.deals = 'XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX';
    this.state = {
      cards: null, // 考虑这里不用 cards 只用必要的数字
      scene: 0,     // 0 准备阶段 1 叫牌阶段 2 出牌阶段 3 claim 等待，4 claim 确认
      calldata: [], // todo 补充 calldata 4列（东西南北）若干行的数组参考 call 方法
      user: {
        east: { ready: 0, name: '张三', face: '/imgs/face1.png', rank: '大师' },
        south: { ready: 0, name: '李四', face: '/imgs/face2.png', rank: '专家' },
        west: { ready: 0, name: '王五', face: '/imgs/face1.png', rank: '王者' },
        north: { ready: 0, name: '赵六', face: '/imgs/face2.png', rank: '钻石' }
      },
      lastTrick: false,  // 最后一墩牌是否显示
      //playseat:null, // 倒计时解决
      debug: false,
    }
    this.initCards();
  }
  get csize() {
    /*  短路语法 牌的大小 可以计算在下面的函数内。
        可以考虑用 vh 改造，所有计算都按照比例计算。
    */
    return this._csize || (() => {
      return this.height * 0.18;
    })()
  }
  /**
 * initCards 从 this.deals 初始化成 cards 数组 为渲染输出做准备，返回到 this.cards
 * 把 cards 字符串 变为 数组
 * 
 * TODO：把一手牌 变成
 */

  initCards() {
    const suits = Card.suits                    //['S', 'H', 'D', 'C'];
    const deals = this.deals.split(' ')
    let index = 0;                              // 复位index 可以让四个人的牌同时发出来
    const cards = [[], [], [], []];             // 初始化二维数组 保存四个方位的牌
    //deals. [XXXXXXXXXXXXX,QJ98.A5.J853.QT4,XXXXXXXXXXXXX,XXXXXXXXXXXXX]
    // 注意避免用 X 暴露花色的数量
    deals.forEach((item, index1) => {
      const suit = item.split('.')
      suit.forEach((s, index2) => {           // index2 四个花色  s 'QJ98' 牌点字串
        //cards[index1][index2] = [];
        for (var i = 0; i < s.length; i++) {
          cards[index1].push({
            onclick: () => false,              // onclick 必须是个函数
            active: 0,
            index: index,
            key: index++,
            seat: TableModel.seats[index1],       // 这张牌是那个方位的
            //table: this,
            size: this.csize,                // 牌的大小
            card: s[i] + suits[index2],       //s[i]
            position: { x: this.height / 2, y: this.height * 2 }     // 考虑一个默认位置。
          })
        }
      });
    });
    // console.log('cards.......333.............')
    // console.log(cards)
    this.state.cards = cards;
  }

  /**
   * 点击一张牌 突出显示
   * 被点击的牌突出显示，其他牌都恢复原样
   * 
   * 输入输出都是基于 this.state.cards
   * 输入：点击牌的引用（注意是引用）
   * 输出：点击的牌的 top,left 调整
   *      所有其他牌的 top,left 调整
   */

  preplay(item) {
    this.state.cards.forEach((item) => item.forEach((item) => {
      if (item.active == 3) { // active=3 突出的牌 active=2 回复原样
        item.active = 2;
        switch (item.seat) {
          case 'east': item['animation']['left'] += 20; break;
          case 'south': item['animation']['top'] += 20; break;
          case 'west': item['animation']['left'] -= 20; break;
          case 'north': item['animation']['top'] -= 20; break;
        }

      }
    }))

    item.active = 3;
    switch (item.seat) {
      case 'east': item['animation']['left'] -= 20; break;
      case 'south': item['animation']['top'] -= 20; break;
      case 'west': item['animation']['left'] += 20; break;
      case 'north': item['animation']['top'] += 20; break;
    }
    item['animation']['delay'] = 0;
  }
  /**
   * 出牌 打出去
   * 首先要进行 preplay 然后才能 play
   * 
   * 输入：item 当前点击的牌的引用
   * 输出：item 位置调整，this.board 出牌区域的牌 调整。
   */
  play = (item) => {
    // if(item.active != 3) return; // 只有突出的牌能打出去。
    item.active = 4;    // 已经打出去的牌
    if (this.board.length == 4) return false;
    this.board.push(item);
    //console.log(this.board)
    item['animation']['left'] = this.seat[item.seat][1].x;
    item['animation']['top'] = this.seat[item.seat][1].y;
    item['animation']['delay'] = 0;
    item['zIndex'] = this.zindex++
    // this.setState({
    //   cards: this.state.cards
    // })
    // Sound.play('play');
    // if (this.board.length == 4) setTimeout(this.clearBoard, 1000)

    const seatIndex = TableModel.seats.indexOf(item.seat);
    let cards = this.state.cards[seatIndex]
    console.log('cards:', cards)
    // if([0,2].indexOf(seatIndex) == -1) cards = this.resetCards(cards, seatIndex)
    // else  cards = this.suitLayoutCards(cards, seatIndex)

    cards = this.resetCards(cards, seatIndex, true)
  }
  /**
   * 清理桌面上的牌
   * 定位参考：
   *  -this.height * 0.2;  计分位置
   */
  //model
  clearBoard = () => {
    //if(this.board.length < 4) return false;
    const board = this.board;
    for (let i = 0; i < board.length; i++) {
      board[i].animation.left = this.height / 2;
      board[i].animation.top = -this.height * 2;
      //board[i].animation.rotate = 0;
      // board[i].animation.left = 100;
      // board[i].animation.top = 100;

      //board[i].active = 3; // 应该不变
    }
    this.board = [];
    // this.setState({
    //     cards: this.state.cards
    // })
    // Sound.play('clear')
  }


  /**
   * 发牌
   * 
   * 算法注解：
   *  1） 东西方向牌是横向的，因此要确定旋转的圆心。旋转后保证左上角坐标就是牌
   *      的左上角如果按照中心旋转则还需要计算偏移量。利用 transformOrigin
   *  2） 出牌的位置 东西南北 四个位置之前计算好的。
   *  3） xy+5 目的是避免靠近牌桌边缘。
   *  4） delay 是每张牌发出来的延迟时间。按照牌编号进行计算。出牌时应清零
   *  5） '02'.indexOf(index) 东西的牌 rotate 旋转90度
   *  6） .onclick=this.onclick(item2) onclick 函数引用
   *      this.onclick(item2) 仍然返回一个函数 用来处理点击事件，传入item2
   * sepY 纵向扑克间隔
   * sepX 横向扑克间隔
   * 
   * 
   * 输入参数：play 是出牌的 事件处理方法。传递进来用于绑定到牌上
   * 输出：this.state.cards
   */
  dealCards(play) {
    const cards = this.state.cards;
    const sepY = this.csize * 0.15;
    const sepX = this.csize * 0.25;
    //let rotate = 0;
    console.log('tmseats:', TableModel.seats)
    const offset = this.csize * 0.7 / 2
    cards.forEach((item, index) => {
      let rotate = 0;
      let seat = TableModel.seats[index]
      let [x, y] = [this.seat[seat][0].x, this.seat[seat][0].y]
      if ('02'.indexOf(index) != -1) rotate = -90;
      x = x + this.height / 16 / 5;
      y = y + this.height / 16 / 5; // margin
      item.forEach((item1, index1) => {
        cards[index][index1].animation = {
          top: y,
          left: x,
          delay: (item1.key % 13) * 80,
          duration: 300,
          rotate: rotate,
          transformOrigin: `${offset}px ${offset}px`
        }
        //cards[index][index1][index2].rotate = rotate;
        cards[index][index1].active = 2; // 测试用
        //cards[index][index1].onclick = this.play(item1)
        cards[index][index1].onclick = () => play(item1)
        // if ('02'.indexOf(index) != -1) y = y + sepY
        // else x = x + sepX

      });
      // if([0,2].indexOf(index) != -1) item = this.suitLayoutCards(item, index)
      // else item = this.resetCards(item, index)
      //item = this.suitLayoutCards(item, index)
      item = this.resetCards(item, index)
    })
    this.state.cards = cards;
    return cards;
  }

  /**
  * initSeat 初始化 发牌位置 出牌位置的坐标。 
  * center   桌子的中心
  *          以body 为父元素计算。
  * offset   是四张牌叠放需要错开的空间。（长 - 宽）/ 2
  * this.seat[key][0] 四个座位发牌坐标xy
  * this.seat[key][1] 四个作为出牌坐标xy
  * 
  *          出牌坐标计算依据：1）扑克牌的中心点和左上角位置差固定。
  *          因此可以以中心点考虑四个方位的位移 再加减相同的 位置差即可。
  *          注：0.7 是扑克的横竖比例。
  * 
  * 采用 .css 确定尺寸后 被注释的语句 不起作用了。修改为 clientHeight
  *        this.ref.board.current.clientHeight / 2
  *        // parseInt(this.ref.board.current.style.height.slice(0, -2)) / 2
  * 
  * 输入：center, seat
  * 输出：this.seat
  * 
  */

  initSeat(center, seats) {
    this.center = center;
    const offset = this.csize * 0.7 / 2
    for (let key in this.seat) {
      this.seat[key][0]['y'] = seats[key]['y'];
      this.seat[key][0]['x'] = seats[key]['x'];

      if (key == 'east') {
        this.seat[key][0]['y'] = this.seat[key][0]['y'] + this.height * 0.06
        // 下面是处理　牌的叠放顺序　联合参考：dealCards
        //this.seat[key][0]['y'] = this.seat[key][0]['y'] + this.height * 0.4
        this.seat[key][1]['y'] = center.y - offset
        this.seat[key][1]['x'] = center.x - offset * 0.8
      } else if (key == 'south') {
        this.seat[key][0]['x'] = this.seat[key][0]['x'] //+ this.height * 0.21
        //this.seat[key][1]['y'] = center.y + offset - this.csize / 2;
        this.seat[key][1]['y'] = center.y - offset * 0.8
        this.seat[key][1]['x'] = center.x - offset
      } else if (key == 'west') {
        this.seat[key][0]['y'] = this.seat[key][0]['y'] + this.height * 0.06
        this.seat[key][1]['y'] = center.y - offset
        this.seat[key][1]['x'] = center.x + offset * 0.8 - this.csize;
      } else if (key == 'north') {
        this.seat[key][0]['x'] = this.seat[key][0]['x'] //+ this.height * 0.21
        this.seat[key][1]['y'] = center.y + offset * 0.8 - this.csize;
        this.seat[key][1]['x'] = center.x - offset
      }
    }
  }
  /**
   * 重新整理手里的牌
   * 
   * 输入：
   *    cards       一手牌
   *    seatIndex   当前牌的方位号
   * 
   * 输出：
   *    cards       定位重新排列的一手牌
   * pos：left 上下 top 左右
   * flexLayout： 获得重新的布局分布 参数 2 每间隔2张牌 增大一些距离
   * Array.shift() 从开头弹出一个值
   */
  resetCards(cards, seatIndex, resetDelay = false) {
    const pos = [0, 2].indexOf(seatIndex) == -1 ? 'left' : 'top';
    let length = 0;
    let ps = 0;
    cards.forEach(card => card.active == 2 && length++)
    const layout = flexLayout(this.height, length, 2)
    return cards.map((card, index) => {
      if (card.active == 2) {
        ps = layout.shift();
        card['animation'][pos] = ps;
        card['animation']['duration'] = 600;
        if (resetDelay) card['animation']['delay'] = ps;
        //if (resetDelay) card['animation']['delay'] = 0;
      }
      return card;
    })
  }

  /**
   * 按照花色布局 已可用，未启用
   * 
   * @param {*} cards 牌数组
   * @param {*} seatIndex 座位编号
   */
  suitLayoutCards(cards, seatIndex) {
    //const rotate = [0, 2].indexOf(seatIndex) == -1 ? '0' : '-90';
    const rotate = 0;
    let preCard = cards[0];
    let offsetTop = 0;
    let offsetLeft = 0;
    let seat = TableModel.seats[seatIndex];
    cards.map((card, index) => {
      if (card.card.slice(1, 2) != preCard.card.slice(1, 2)) {
        offsetTop += 40;
        offsetLeft = 0;
        card.animation['top'] += offsetTop;
        //card.animation['left'] += this.seat[seat][0].x
      } else {
        card.animation['left'] += offsetLeft;
        card.animation['top'] += offsetTop;
        offsetLeft += 25;
      }
      card.animation['rotate'] = rotate;
      preCard = card;
    })
  }

  /**
   * 设置牌的 active 状态。
   * 把编号 在nums里 的牌设置成 active 状态
   * nums 是一个数组
   * active 是目标状态。*      
   * active     0,1,2,3  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
   */
  setActive = (nums: Array, active = 0) => {
    const cards = this.state.cards;
    cards.forEach((item) => item.forEach((item) => {
      if (nums.indexOf(item.index) != -1) item.active = active;
    }))
    return cards;
  }
  /**
   * 通过一张牌的索引，获得具体的 牌数据引用
   * this.state.cards 永远都是 52张牌
   * 
   */
  cardIndexOf(index) {
    const i1 = Math.floor(index / 13);  // 商数是座位 0-3
    const i2 = index % 13;              // 余数是 第几张牌
    return this.state.cards[i1][i2];
  }
  /**
   * 显示上墩牌
   * todo：明确了数据接口再改写。
   * 定位还存在问题。
   * 
   * 输入：this.state.lastTrick
   * 输出：this.state.cards
   *       this.state.lastTrick
   */
  lastTrick = (show) => {
    // 在模型里 应该先判断当前 trick 编号。然后决定是否能看lasttrick
    const lt = Models.lastTrick();
    let card = null;
    lt.forEach((item, index) => {
      card = this.cardIndexOf(item.index)
      //card.size = card.size * 0.8
      card['animation']['left'] = (show == true) ?
        this.seat[TableModel.seats[index]][1].x - this.height / 2.9
        : this.height / 2;
      card['animation']['top'] = (show == true) ?
        this.seat[TableModel.seats[index]][1].y - this.height / 2.9
        : -this.height * 2;
      //card['size'] = card['size'] * 0.7
      // card['animation']['rotate'] = 180;
      // card['position']['x'] = this.seat[Table.seats[index]][1].x;
      // card['position']['y'] = this.seat[Table.seats[index]][1].y;
      //card['animation'] = ''
      //card['animation']['delay'] = 0;
      card.active = 1; // 测试用
    })
    return this.state.cards;
  }


  /**
   * 输入：某个方位"east", this.myseat
   * 输出：另外一个方位
   */
  _shift(seat) {
    const offset = TableModel.seats.indexOf(this.myseat) - 1
    const index = TableModel.seats.indexOf(seat)
    return TableModel.seats[(index + offset) % 4]
    //return 
  }

  userReady(se) {
    const seat = TableModel.seats[se];
    this.state.user[seat].ready = 1;
  }
  userAllReady() {
    const user = this.state.user;
    let ready = true;
    Object.values(user).forEach(el => {
      if (el.ready == 0) ready = false
    })
    return ready;
  }

  /**   -----------------------------------------------------
   * 叫牌
   * seat 座位
   * bid 叫品
   * 
   * 输入：方位（east）,叫品（3H 或者 A3H）
   * 输出：this.state.calldata 修改
   */
  call = (seat, bid) => {
    const calldata = this.state.calldata
    if (calldata.length == 0) {
      calldata.push(Array(4).fill(null))
      calldata[0][TableModel.seats.indexOf(seat)] = bid;
    } else if (seat == 'east') {
      calldata.push(Array(4).fill(null))
      calldata[calldata.length - 1][TableModel.seats.indexOf(seat)] = bid;
    } else {
      calldata[calldata.length - 1][TableModel.seats.indexOf(seat)] = bid;
    }
  }


}
TableModel.seats = ['east', 'south', 'west', 'north']
TableModel.seatscn = ['东', '南', '西', '北']

/**
 * 直接实例化，因为一局游戏只有一个桌子。
 * Table.js 也就是 Table 控制器（容器）类调用本类
 */
export { TableModel };
export default new TableModel();