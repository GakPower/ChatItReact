import React, { useState } from 'react';
import { Field } from '../../secondary/Field/Field';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../../ServerUtils';
import './Login.scss';

interface FormInput {
	emailUsername: string;
	password: string;
}

export const Login = () => {
	const [disabled, setDisabled] = useState(false);
	const { register, handleSubmit, errors, reset, setError } = useForm<
		FormInput
	>();

	const renderErrors = () => {
		let error;
		if (errors?.emailUsername) {
			error = errors?.emailUsername?.message;
		}
		return <p>{error}</p>;
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
		setTimeout(() => {
			loginUser({ emailUsername, password }, isEmail(emailUsername))
				.then((res) => res.json())
				.then((res) => {
					if (res.valid) {
						reset();
						// NAVIGATE TO APP
					} else {
						setError('emailUsername', {
							type: 'manual',
							message: res.message,
						});
					}
				})
				.catch((error) => console.log(error))
				.finally(() => setDisabled(false));
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
				{renderErrors()}
				<button type='submit' disabled={disabled}>
					Login
				</button>
			</form>
		</div>
	);
};
