import React from 'react';
import './App.scss';
import { NavBar } from './components/secondary/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/primary/Login/Login';
import { Join } from './components/primary/Join/Join';

function App() {
	return (
		<div id='App'>
			<NavBar />
			<div id='switchContainer'>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/join' component={Join} />
					<Redirect to='/login' />
				</Switch>
			</div>
		</div>
	);
}

export default App;
