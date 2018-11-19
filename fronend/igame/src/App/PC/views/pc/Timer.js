import React from 'react';
import './Timer.css'


export default class Timer extends React.Component {
    state = {
        h: 0,
        m: 0,
        s: 0,
    }
    constructor(props) {
        super(props)
        this.timer = null;
        const time = this.props.time.split(':')
        this.state.h = time[0];
        this.state.m = time[1];
        this.state.s = time[2];
        if (this.props.handle) {
            this.props.handle.stop = this.stop;
            this.props.handle.start = this.start;
        }
    }

    componentDidMount() {
        this.start();
    }

    start = () => {
        this.timer = setInterval(this.dida, 1000)
    }

    stop = () => {
        clearInterval(this.timer);
    }
    dida = () => {
        this.state.s--;
        if (this.state.s == -1) {
            this.state.s = 59;
            this.state.m--;
        }
        if (this.state.m == -1) {
            this.state.m = 59;
            this.state.h--;
        }
        if (this.state.h == -1) {
            this.state.h = 0;
            this.state.m = 0;
            this.state.s = 0;
            this.stop();
            this.props.callback();
        }
        this.setState({
            h: this.state.h,
            m: this.state.m,
            s: this.state.s
        });
    }
    render() {
        const fmt = (n) => n < 10 ? '0' + n : '' + n;
        return (
            <div>
                <div className='timername'>{this.props.name}</div>
                <div className='timer'>
                    <div>{fmt(this.state.h)}</div>
                    <div>{fmt(this.state.m)}</div>
                    <div>{fmt(this.state.s)}</div>
                </div>
            </div>
        );
    }
}