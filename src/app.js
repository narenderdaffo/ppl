import React from 'react';
import Register from './register';
import Login from './login';
import { Switch, Route } from 'react-router-dom';
import Timeline from './timeline';
import Header from './header';
import Header2 from './header2';
import Homes from './homes';
import Singlepost from './singlepost';
import Forget from './forget';
import Reset from './reset';
class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Login} />

					<Route path="/timeline" component={Timeline} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route path="/reset" component={Reset} />
					<Route path="/homes" component={Homes} />
					<Route path="/forget" component={Forget} />
					<Route path="/singlepost/:id" component={Singlepost} />
				</Switch>
			</div>
		);
	}
}
export default App;
