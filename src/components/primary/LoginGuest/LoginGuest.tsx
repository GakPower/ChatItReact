import React, { useState } from 'react';
import { Field } from '../../secondary/Field/Field';
import { useForm } from 'react-hook-form';
import { loginGuestUser } from '../../../helpers/ServerUtils/Auth';
import { Link } from 'react-router-dom';
import './LoginGuest.scss';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../../redux/slices/userInfo';

interface FormInput {
	username: string;
}

export const LoginGuest = () => {
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);
	const { register, handleSubmit, errors, reset, setError } = useForm<
		FormInput
	>();

	const renderErrors = () => {
		let error;
		if (errors?.username) {
			error = errors?.username?.message;
		}
		return <p id='error'>{error}</p>;
	};

	const onSubmit = async ({ username }: { username: string }) => {
		setDisabled(true);
		setTimeout(async () => {
			setDisabled(false);
			const res = await loginGuestUser({ username });
			if (res.valid) {
				reset();
				dispatch(setUsername(res.username));
			} else {
				setError('username', {
					type: 'manual',
					message: res.message,
				});
			}
		}, 1000);
	};

	return (
		<div id='loginGuestContainer'>
			<h3>Login</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					register={register()}
					name='username'
					type='text'
					placeholder='Username'
				/>
				{renderErrors()}
				<button type='submit' disabled={disabled}>
					Login as a Guest
				</button>
			</form>

			<p id='join'>
				Do you want to create an account? <Link to='/join'>Join us</Link>
			</p>
		</div>
	);
};
