import React from 'react';
import { Link } from 'react-router-dom';
import { Email } from '../../../assets/icons/Email';
import { GitHub } from '../../../assets/icons/Github';
import { LinkedIn } from '../../../assets/icons/LinkedIn';
import './Footer.scss';
export const Footer = () => {
	return (
		<div id='footer'>
			<div id='contacts'>
				<Email link='mailto:gkotDev@gmail.com' />
				<GitHub link='https://github.com/GakPower' />
				<LinkedIn link='https://www.linkedin.com/in/george-kotsiopoulos-a2b0971a4/' />
			</div>

			<div id='separator'></div>

			<Link to='/privacyPolicy'>Privacy Policy</Link>
		</div>
	);
};
