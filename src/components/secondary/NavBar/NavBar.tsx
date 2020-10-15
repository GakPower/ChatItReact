import React from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { logout } from '../../../ServerUtils';

export const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
	return (
		<nav id='navBar'>
			<Link to='/'>ChatIt</Link>
			<div>
				{isLoggedIn && (
					<Link to='/login' onClick={async () => await logout()}>
						Logout
					</Link>
				)}
			</div>
		</nav>
	);
};
