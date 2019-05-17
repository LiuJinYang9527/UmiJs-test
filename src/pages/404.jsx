//404页面
import React, { Component } from 'react';
class NotFound extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'test'
		};
	}
	render() {
		return <div className="not-found">这是一个404页面 {this.state.name}</div>;
	}
}

export default NotFound;
