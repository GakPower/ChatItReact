import React, { useEffect } from 'react';
import './App.scss';
import { NavBar } from './components/secondary/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/primary/Login/Login';
import { Join } from './components/primary/Join/Join';
import { ForgotPass } from './components/primary/ForgotPass/ForgotPass';
import { ResetPass } from './components/primary/ResetPass/ResetPass';
import { isTokenValid, refreshToken } from './helpers/ServerUtils/Auth';
import { MainApp } from './components/primary/MainApp/MainApp';
import { PrivacyPolicy } from './components/primary/PrivacyPolicy/PrivacyPolicy';
import { Footer } from './components/secondary/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectLoggedIn,
	setLoggedIn,
	setUsername,
} from './redux/slices/userInfo';
// import { GoogleAuth } from './components/primary/GoogleAuth/GoogleAuth';

function App() {
	const dispatch = useDispatch();
	const loggedIn = useSelector(selectLoggedIn);

	useEffect(() => {
		const id = setInterval(() => {
			isTokenValid().then(async ({ valid, username }) => {
				if (!valid) {
					const res = await refreshToken();
					dispatch(setLoggedIn(!!res));
					if (!res) {
						dispatch(setUsername(''));
					}
				} else {
					dispatch(setLoggedIn(true));
					dispatch(setUsername(username));
				}
			});
		}, 1000);
		return () => {
			clearInterval(id);
		};
	}, [dispatch]);

	const publicRoute = (path: string, component: any) => {
		return !loggedIn && <Route exact path={path} component={component} />;
	};
	const privateRoute = (path: string, component: any) => {
		return loggedIn && <Route exact path={path} component={component} />;
	};

	return (
		<div id='App'>
			<NavBar isLoggedIn={loggedIn} />
			<div id='switchContainer'>
				<Switch>
					{publicRoute('/login', Login)}
					{publicRoute('/join', Join)}
					{publicRoute('/forgotPassword', ForgotPass)}
					{publicRoute('/resetPassword/:id', ResetPass)}
					<Route exact path='/privacyPolicy' component={PrivacyPolicy} />
					{privateRoute('/', MainApp)}
					{!loggedIn && <Redirect to='/login' />}
					{loggedIn && <Redirect to='/' />}
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
