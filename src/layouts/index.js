import React from 'react';
import styles from './index.css';
import withRouter from 'umi/withRouter';

class BasicLayout extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidUpdate(prevProps) {
		if(this.props.location !== prevProps.location){
      window.scrollTo(0,0);
    }
  }
  componentDidMount(){
  }
	render() {
		{
			//针对不同路由返回不同的layout
			if (this.props.location.pathname == '/login') {
				return this.props.children;
			} else {
				return (
					<div className={styles.normal}>
						<h1 className={styles.title}>Yay! Welcome to umi!</h1>
						{this.props.children}
					</div>
				);
			}
		}
	}
}

export default withRouter(BasicLayout);
