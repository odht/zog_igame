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
        const Direction = ['E','S','W','N','E','S','W','N'];
        
        const {nth,myseat,dealer,vulnerable} = this.props;
        const s1 =Direction[Direction.indexOf(myseat)+2]; 
        const s2 =Direction[Direction.indexOf(myseat)+1]; 
        const s3 =Direction[Direction.indexOf(myseat)+3]; 
        return(
            <div className='seats'>
                <div className={vulnerable.indexOf("B")!=-1?"s1 vulnerable": vulnerable.indexOf('NO')==-1?(vulnerable.indexOf(s1)==-1?'s1':'s1 vulnerable'):'s1'}>{s1}{dealer==s1?"-D":''}</div>
                <div className={vulnerable.indexOf("B")!=-1?"s2 vulnerable": vulnerable.indexOf('NO')==-1?(vulnerable.indexOf(s2)==-1?'s2':'s2 vulnerable'):"s2"}>{s2}{dealer==s2?"-D":''}</div>
                <div className='center'>{nth}</div>
                <div className={vulnerable.indexOf("B")!=-1?"s3 vulnerable": vulnerable.indexOf('NO')==-1 ? (vulnerable.indexOf(s3)==-1?'s3':'s3 vulnerable'):'s3'}>{s3}{dealer==s3?"-D":''}</div>
                <div className={vulnerable.indexOf("B")!=-1?"s4 vulnerable": vulnerable.indexOf('NO')==-1?(vulnerable.indexOf(myseat)==-1?'s4':'s4 vulnerable'):'s4'}>{myseat}{dealer==myseat?"-D":''}</div>
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