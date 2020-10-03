import React from 'react';
import './NavBar.scss';

export const NavBar = () => {
	return (
		<nav className='navBar'>
			<h2 onClick={() => window.open('/', '_parent')}>ChatIt</h2>
			<div>
				<button>Login</button>
				<button>Join</button>
			</div>
		</nav>
	);
};
