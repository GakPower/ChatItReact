import React, { useState, useEffect } from 'react';
import './App.scss';
import { NavBar } from './components/secondary/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/primary/Login/Login';
import { Join } from './components/primary/Join/Join';
import { ForgotPass } from './components/primary/ForgotPass/ForgotPass';
import { ResetPass } from './components/primary/ResetPass/ResetPass';
import { isTokenValid, refreshToken } from './ServerUtils';
import { MainApp } from './components/primary/MainApp/MainApp';
import { PrivacyPolicy } from './components/primary/PrivacyPolicy/PrivacyPolicy';
import { Footer } from './components/secondary/Footer/Footer';

function App() {
	const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const id = setInterval(() => {
			isTokenValid().then(async (isValid) => {
				if (!isValid) {
					const res = await refreshToken();
					setLoggedIn(res);
				} else {
					setLoggedIn(isValid);
				}
			});
		}, 1000);
		return () => {
			clearInterval(id);
		};
	}, []);

	return (
		<div id='App'>
			<NavBar isLoggedIn={isLoggedIn} />
			<div id='switchContainer'>
				<Switch>
					{!isLoggedIn && <Route exact path='/login' component={Login} />}
					{!isLoggedIn && (
						<Route exact path='/join'>
							<Join />
						</Route>
					)}
					{!isLoggedIn && (
						<Route exact path='/forgotPassword' component={ForgotPass} />
					)}
					{!isLoggedIn && (
						<Route exact path='/resetPassword/:id' component={ResetPass} />
					)}
					<Route exact path='/privacyPolicy' component={PrivacyPolicy} />
					{isLoggedIn && <Route exact path='/' component={MainApp} />}
					{!isLoggedIn && <Redirect to='/login' />}
					{isLoggedIn && <Redirect to='/' />}
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
