import React from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { logout } from '../../../helpers/ServerUtils';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../../redux/slices/userInfo';

export const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
	const username = useSelector(selectUsername);
	return (
		<nav id='navBar'>
			<Link to='/'>ChatIt</Link>
			<p>{username}</p>
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
