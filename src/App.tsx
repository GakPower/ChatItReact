import React, { useState, useEffect } from 'react';
import './App.scss';
import { NavBar } from './components/secondary/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/primary/Login/Login';
import { Join } from './components/primary/Join/Join';
import { ForgotPass } from './components/primary/ForgotPass/ForgotPass';
import { ResetPass } from './components/primary/ResetPass/ResetPass';
import { isTokenValid, refreshToken } from './helpers/ServerUtils';
import { MainApp } from './components/primary/MainApp/MainApp';
import { PrivacyPolicy } from './components/primary/PrivacyPolicy/PrivacyPolicy';
import { Footer } from './components/secondary/Footer/Footer';
import { GoogleAuth } from './components/primary/GoogleAuth/GoogleAuth';

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

	const publicRoute = (path: string, component: any) => {
		return !isLoggedIn && <Route exact path={path} component={component} />;
	};
	const privateRoute = (path: string, component: any) => {
		return isLoggedIn && <Route exact path={path} component={component} />;
	};

	return (
		<div id='App'>
			<NavBar isLoggedIn={isLoggedIn} />
			<div id='switchContainer'>
				<Switch>
					{publicRoute('/login', Login)}
					{publicRoute('/join', Join)}
					{publicRoute('/forgotPassword', ForgotPass)}
					{publicRoute('/resetPassword/:id', ResetPass)}
					<Route exact path='/privacyPolicy' component={PrivacyPolicy} />
					{publicRoute('/', MainApp)}
					{/* {!isLoggedIn && <Redirect to='/login' />} */}
					{/* {isLoggedIn && <Redirect to='/' />} */}
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
