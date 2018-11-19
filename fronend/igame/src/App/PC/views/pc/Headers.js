import React, { Component } from 'react';
import './Headers.css'
/**
 * 结果直接写在　生命周期函数里 异步获取即可。
 */
class Imps extends Component {
    render(){
        return(
            <div className='imps'>
                <div className='iheader'>IMPs</div>
                <div className='ibody'>NS:-4.8<br />EW:4.8</div>
            </div>
        )
    }
}

class Seats extends Component{
    render(){
        return(
            <div className='seats'>
                <div className='s1'>D</div>
                <div className='s2'></div>
                <div className='s3'></div>
                <div className='s4'></div>
            </div>
        )
    }
}

class Tricks extends Component{
    render(){
        return(
            <div className='tricks'>
                <div className='s1'><br />{this.props.vertical?this.props.vertical:0}</div>
                <div className='s2'>{this.props.contract?this.props.contract:null}<br/>
                 <span style={{color:'black',fontWeight:'bold'}}>庄:</span>{this.props.declarer?this.props.declarer:null}
                </div>
                <div className='s3'>{this.props.transverse?this.props.transverse:0}</div>
            </div>
        )
    }
}
export {Imps, Seats, Tricks}