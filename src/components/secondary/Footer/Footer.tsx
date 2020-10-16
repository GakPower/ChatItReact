import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
export const Footer = () => {
	return (
		<div id='footer'>
			<Link to='/privacyPolicy'>Privacy Policy</Link>
		</div>
	);
};
