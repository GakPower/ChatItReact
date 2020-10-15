import React, { useState } from 'react';
import { Field } from '../../secondary/Field/Field';
import { useForm } from 'react-hook-form';
import { joinUser } from '../../../ServerUtils';
import { Link, useHistory } from 'react-router-dom';
import './Join.scss';

interface FormInput {
	username: string;
	email: string;
	password: string;
	passConfirm: string;
}

export const Join = () => {
	const history = useHistory();
	const [shouldCheck, setShouldCheck] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const { register, handleSubmit, errors, watch, reset, setError } = useForm<
		FormInput
	>();

	const passwordWatch = watch('password', '');
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;

	const renderErrors = () => {
		let error;
		if (errors?.username) {
			error = errors?.username?.message;
		} else if (errors?.email) {
			error = errors?.email?.message;
		} else if (errors?.password) {
			error = errors?.password?.message;
		} else if (errors?.passConfirm) {
			error = 'Passwords do not match';
		}
		return <p id='error'>{error}</p>;
	};

	const onSubmit = async ({
		username,
		email,
		password,
	}: {
		username: string;
		email: string;
		password: string;
	}) => {
		setDisabled(true);
		setTimeout(async () => {
			setDisabled(false);
			const res = await joinUser({ username, email, password });

			if (res.valid) {
				reset();
				setShouldCheck(false);
				// NAVIGATE TO Login
				history.push('/login');
			} else if (res.field) {
				setError(res.field, {
					type: 'manual',
					message: res.message,
				});
			} else {
				console.log({ res });
			}
		}, 1000);
	};

	return (
		<div id='joinContainer'>
			<h3>Join</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					register={register({
						required: 'Username is required',
						maxLength: {
							value: 255,
							message: 'Username is too long',
						},
					})}
					shouldCheck={shouldCheck}
					invalid={errors?.username}
					name='username'
					type='text'
					placeholder='Username'
				/>
				<Field
					register={register({
						required: 'Email is required',
						maxLength: {
							value: 255,
							message: 'Email is too long',
						},
						pattern: { value: emailRegex, message: 'Invalid Email input' },
					})}
					shouldCheck={shouldCheck}
					invalid={errors?.email}
					name='email'
					type='text'
					placeholder='Email'
				/>
				<Field
					register={register({
						required: 'Password is required',
						minLength: {
							value: 8,
							message: 'Password is too short',
						},
						maxLength: {
							value: 255,
							message: 'Password is too long',
						},
					})}
					shouldCheck={shouldCheck}
					invalid={errors?.password}
					name='password'
					type='password'
					placeholder='Password'
				/>
				<Field
					register={register({
						required: 'Confirm Password is required',
						minLength: {
							value: 8,
							message: 'Confirm Password is too short',
						},
						maxLength: {
							value: 255,
							message: 'Confirm Password is too long',
						},
						validate: {
							value: (value) => value === passwordWatch,
						},
					})}
					shouldCheck={shouldCheck}
					invalid={errors?.passConfirm}
					name='passConfirm'
					type='password'
					placeholder='Confirm Password'
				/>
				{renderErrors()}
				<button
					id='submit'
					type='submit'
					disabled={disabled}
					onClick={() => setShouldCheck(true)}
				>
					Join
				</button>

				<p id='login'>
					Already got an account? <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
};
