import React from 'react';
import TweenOne from 'rc-tween-one';
import Card from '../game/Card'


class TestCard extends React.Component {
    state = {
        x:100,
        y:100,

    }
    constructor(props) {
        super(props)
    }
    onclick = () => {

            this.setState({
                x:200,
                y:200,

            })

    }
    render() {
        return (
            <div>
                <Card
                    key={1}
                    animation={{
                        left:this.state.x,
                        top:this.state.y,
                        rotate:90,
                        delay:1,
                        duration:1800,
                    }}
                    resetStyle={true}
                    index={1}
                    size={80}
                    card={'5S'}
                    // left={10}
                    // top={10}
                />
                <button onClick={this.onclick}>测试2222222222222222222222222222222</button>
            </div>
        )
    }
}


export default TestCard