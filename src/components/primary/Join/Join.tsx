import React, { useState } from 'react';
import { Field } from '../../secondary/Field/Field';
import { useForm } from 'react-hook-form';
import './Join.scss';

interface FormInput {
	username: string;
	email: string;
	password: string;
	passConfirm: string;
}

export const Join = () => {
	const [shouldCheck, setShouldCheck] = useState(false);

	const { register, handleSubmit, errors, watch } = useForm<FormInput>();

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
		return <p>{error}</p>;
	};

	const onSubmit = async (data: any) => {
		console.log(data);
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
				<button id='submit' type='submit' onClick={() => setShouldCheck(true)}>
					Submit
				</button>
			</form>
		</div>
	);
};
