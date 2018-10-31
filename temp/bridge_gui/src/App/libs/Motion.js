import React from 'react';
import TweenOne from 'rc-tween-one';

/**
 * 对动画组件的封装。考虑以后也许会用其他的动画替代
 */
export default (props) => (
  <TweenOne
    animation={{
      ...props.animation,
      ease: 'easeOutQuint',       // 缓动参数 参考蚂蚁手册 easeOutExpo
    }}
    style={props.style ? props.style : null}
    className={props.className ? props.className : null}
  >
    {props.children}
  </TweenOne>
)