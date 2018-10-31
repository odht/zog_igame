/**
 * 布局 函数库。
 * 
 * todo:
 * 这里函数暂时与扑克无关，纯粹数学计算。
 * 考虑另外封装，专门针对扑克布局的函数库。
 */


  /**
   * 重新整理手里的牌（调整间距）
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
  function resetCards(cards, seatIndex, resetDelay = false) {
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

  function suitLayoutCards(cards, seatIndex) {
    //const rotate = [0, 2].indexOf(seatIndex) == -1 ? '0' : '-90';
    const rotate = 0;
    let preCard = cards[0];
    let offsetTop = 0;
    let offsetLeft = 0;
    let seat = ['east', 'south', 'west', 'north'][seatIndex];
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
 * 输入：
 *    width     牌桌宽度（高度同理） 有了宽度，就有了扑克的宽度。w*0.18
 *    length    多少张牌
 *    separate  每几张扩大间隔。
 * 
 * 输出：
 *    扑克整体左上角定位
 *    所有扑克定位（xy）数组 更新 animation
 * 
 * 参考：
 *    csize =  width * 0.18
 *    sepY  =  csize*0.15  sepX =  csize*0.39   
 *    csize 牌的长度 csize*0.7 牌的宽度
 *    sepOffset = 逐渐增加的宽度值 0.05 是一个比例。需要乘 csize
 *    cwidth 一手牌整体宽度
 *    left 一手牌 举例牌桌左侧的举例
 * 
 * 算法描述：
 *    1 发牌区域总宽度
 *    2 根据牌间距，算出牌总宽度。
 *    3 算出牌居中左侧的left数值。
 *    4 逐个增加间距即可。
 * 
 *    间距调整，根据牌每隔n张，计算出少于几张时 增加几倍递增宽度。
 */
function flexLayout(width, length, separate) {
  const csize = width * 0.18
  const sepOffset = Math.floor((13 - length) / separate) * 0.05
  const offset = csize * (0.22 + sepOffset);
  const cwidth = offset * (length - 1) + csize * 0.7;
  const left = (width - cwidth) / 2;
  return Array(length).fill(0).map((item, index) => item + left + index * offset);
}

function suitLayout(width, ){

}



/**
 * 单元测试
 */
function test_flexLayout() {
  const width = 463;
  const length = 13;
  const separate = 15;
  console.log("flexLayout:", flexLayout(width, length, separate))
}
//test_flexLayout();

export { flexLayout, resetCards, suitLayoutCards };