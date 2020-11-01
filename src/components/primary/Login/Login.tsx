import React, { useState } from 'react';
import { Field } from '../../secondary/Field/Field';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../../helpers/ServerUtils/Auth';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../../redux/slices/userInfo';
import './Login.scss';

interface FormInput {
	emailUsername: string;
	password: string;
}

export const Login = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);
	const { register, handleSubmit, errors, reset, setError } = useForm<
		FormInput
	>();

	const renderErrors = () => {
		let error;
		if (errors?.emailUsername) {
			error = errors?.emailUsername?.message;
		}
		return <p id='error'>{error}</p>;
	};

	const isEmail = (input: string) => {
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
		return emailRegex.test(input);
	};

	const onSubmit = async ({
		emailUsername,
		password,
	}: {
		emailUsername: string;
		password: string;
	}) => {
		setDisabled(true);
		setTimeout(async () => {
			setDisabled(false);
			const res = await loginUser(
				{ emailUsername, password },
				isEmail(emailUsername)
			);
			if (res.valid) {
				reset();
				dispatch(setUsername(res.username));
				// NAVIGATE TO APP
				// history.push('/');
			} else {
				setError('emailUsername', {
					type: 'manual',
					message: res.message,
				});
			}
		}, 1000);
	};

	return (
		<div id='loginContainer'>
			<h3>Login</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					register={register()}
					name='emailUsername'
					type='text'
					placeholder='Email or Username'
				/>
				<Field
					register={register()}
					name='password'
					type='password'
					placeholder='Password'
				/>
				<Link to='/forgotPassword' id='forgotPass'>
					Forgot your password?
				</Link>
				{renderErrors()}
				<button type='submit' disabled={disabled}>
					Login
				</button>
			</form>

			<div id='separator' />

			<button onClick={() => history.push('/loginGuest')}>
				Login as a Guest
			</button>

			{/* <div id='separator' />

			<button
				onClick={async () => {
					const link = await getGoogleAuthLink();
					window.open(link, '_self');
				}}
			>
				Login with Google
			</button> */}

			<p id='join'>
				Don't have an account? <Link to='/join'>Join us</Link>
			</p>
		</div>
	);
};
