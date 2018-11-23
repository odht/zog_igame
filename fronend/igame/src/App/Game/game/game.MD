## state 中的 cards
```
[[{
                        onclick: () => false,              // onclick 必须是个函数
                        active: 0,
                        index: index,
                        key: index++,
                        seat: Table.seats[index1],       // 这张牌是那个方位的
                        //table: this,
                        size: this.csize,                // 牌的形状大小
                        card: s[i] + suits[index2],      //牌的大小和花色
                        position: { x: this.width / 2, y: this.width * 2 }     // 考虑一个默认位置。
   }, ... 总共13个
 ],
 [],
 [],
 []
]
```
## 如何判断牌上的点击事件，什么时候可以点击，
> dealMsg()函数执行this.playRules(body.nextplayer,null,null); 
