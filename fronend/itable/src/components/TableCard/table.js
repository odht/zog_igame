import React from 'react'
import index from './index.css'
import play from '@/assets/player.svg'
import { Popconfirm } from 'antd';

const Table = (props) => {
    const { size, scale, margin, click, render, tableData ,type} = props;
    return (
        <div className={index.flexColumn}  >

            <div className={index.cricleRed}>
                {render ? render.bind(this, tableData,type, "top")() :
                    <Popconfirm cancelText="取消" okText="确认" title="选择此方位？" onConfirm={click}>
                        <img src={play} style={{ width: size * scale * 10 + "px", height: size * scale * 10 + "px" }} />
                    </Popconfirm>
                }
            </div>

            <div className={index.middleimg}>

                <div className={index.cricleRed}>
                    {render ? render.bind(this, tableData,type, "left")() :
                        <Popconfirm cancelText="取消" okText="确认" title="选择此方位？" onConfirm={click}>
                            <img src={play} style={{ width: size * scale * 10 + "px", height: size * scale * 10 + "px" }} />
                        </Popconfirm>
                    }
                </div>

                <div
                    className={index.boards}
                >
                    {type==="close"?"闭室":"开室"}
                </div>

                <div className={index.cricleRed}>
                    {render ? render.bind(this, tableData,type, "right")() :
                        <Popconfirm cancelText="取消" okText="确认" title="选择此方位？" onConfirm={click}>
                            <img src={play} style={{ width: size * scale * 10 + "px", height: size * scale * 10 + "px" }} />
                        </Popconfirm>
                    }
                </div>

            </div>

            <div className={index.cricleRed}>
                {render ? render.bind(this, tableData,type, "bottom")() :
                    <Popconfirm cancelText="取消" okText="确认" title="选择此方位？" onConfirm={click}>
                        <img src={play} style={{ width: size * scale * 10 + "px", height: size * scale * 10 + "px" }} />
                    </Popconfirm>
                }
            </div>

        </div>
    )
}
export default React.memo(Table)    