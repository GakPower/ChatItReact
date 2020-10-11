import React from 'react';
import './App.scss';
import { NavBar } from './components/secondary/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/primary/Login/Login';
import { Join } from './components/primary/Join/Join';
import { ForgotPass } from './components/primary/ForgotPass/ForgotPass';
import { ResetPass } from './components/primary/ResetPass/ResetPass';

function App() {
	return (
		<div id='App'>
			<NavBar />
			<div id='switchContainer'>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/join' component={Join} />
					<Route path='/forgotPassword' component={ForgotPass} />
					<Route path='/resetPassword/:id' component={ResetPass} />
					<Redirect to='/login' />
				</Switch>
			</div>
		</div>
	);
}

export default App;
