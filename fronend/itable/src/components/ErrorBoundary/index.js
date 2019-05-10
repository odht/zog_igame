import React from 'react';
 
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: ""
		};
	}
 
	componentDidCatch(error, info) {
		this.setState({
			hasError: true,
			error: error
		});
		console.log("ErrorBoundary!!!");
	}
 
	render() {
		if(this.state.hasError) {
			return <h1>{this.props.errorMessage+this.state.error.toString()}</h1>;
		}
		return this.props.children;
	}
}
 
export default ErrorBoundary;