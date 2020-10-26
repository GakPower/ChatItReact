import React from 'react';
import { Link } from 'react-router-dom';
import { EmailIcon } from '../../../assets/icons/EmailIcon';
import { GitHubIcon } from '../../../assets/icons/GithubIcon';
import { LinkedInIcon } from '../../../assets/icons/LinkedInIcon';
import './Footer.scss';
export const Footer = () => {
	return (
		<div id='footer'>
			<div id='contacts'>
				<EmailIcon link='mailto:gkotDev@gmail.com' />
				<GitHubIcon link='https://github.com/GakPower' />
				<LinkedInIcon link='https://www.linkedin.com/in/george-kotsiopoulos-a2b0971a4/' />
			</div>

			<div id='separator'></div>

			<Link to='/privacyPolicy'>Privacy Policy</Link>
		</div>
	);
};
