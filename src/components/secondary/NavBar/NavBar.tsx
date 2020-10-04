import React from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';

export const NavBar = () => {
	return (
		<nav id='navBar'>
			<Link to='/'>ChatIt</Link>
			<div>
				<Link to='/login'>Login</Link>
				<Link to='/join'>Join</Link>
			</div>
		</nav>
	);
};
