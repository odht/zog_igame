import { Component } from "react";



 export default class Join extends Component{
    constructor(props){
        super(props);
        this.state={num:1}
    }

    increase(){
        this.setState({num:this.state.num+1})
    }
    render(){
        return(
            <div>
            <button>aa</button>
            <div>{this.state.num}</div>
        </div>
        )
       
    }
}