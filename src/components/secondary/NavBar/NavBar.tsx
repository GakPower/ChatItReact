import React from 'react';
import './NavBar.scss';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../../helpers/ServerUtils';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../../redux/slices/userInfo';
import { LogoutIcon } from '../../../assets/icons/LogoutIcon';

export const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
	const username = useSelector(selectUsername);
	return (
		<nav id='navBar'>
			<Link to='/'>ChatIt</Link>
			<div>
				<p>{username}</p>
				<div>
					{isLoggedIn && (
						<LogoutIcon
							onCLick={async () => {
								await logout();
							}}
						/>
					)}
				</div>
			</div>
		</nav>
	);
};
