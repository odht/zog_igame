import React, { Component } from 'react';
import './Prepare.css'
export default class Prepare extends Component {
    render() {
        const stat = this.props.stat;
        const ready = stat.map(element => element ? 'ready' : '');
        return (
            <div className='prepare'>
                <button key='0' className={ready[0] + ' pe'} 
                >{this.props.readyState.east?'就绪':'准备'}
                </button>
                <button key='1' className={ready[1] + ' ps'}
                    onClick={() => this.props.ready(1)}
                >{this.props.readyState.south?'就绪':'准备'}
                </button>
                <button key='2' className={ready[2] + ' pw'}
                >{this.props.readyState.west?'就绪':'准备'}
                </button>
                <button key='3' className={ready[3] + ' pn'}
                > {this.props.readyState.north?'就绪':'准备'}
                </button>
            </div>
        )
    }
}