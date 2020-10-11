import React, { useState } from 'react';
import { Field } from '../../secondary/Field/Field';
import { useForm } from 'react-hook-form';
import './ForgotPass.scss';

interface FormInput {
	email: string;
}

export const ForgotPass = () => {
	const [shouldCheck, setShouldCheck] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const { register, handleSubmit, errors, reset } = useForm<FormInput>();

	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;

	const onSubmit = async ({ email }: { email: string }) => {
		setDisabled(true);
		setTimeout(async () => {
			// const res = await loginUser(
			// 	{ emailUsername, password },
			// 	isEmail(emailUsername)
			// );
			// if (res.valid) {
			reset();
			setShouldCheck(false);
			// NAVIGATE TO APP
			// } else {
			// setError('emailUsername', {
			// 	type: 'manual',
			// 	message: res.message,
			// });
			// }
			setDisabled(false);
		}, 1000);
	};

	return (
		<div id='forgotPassContainer'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>Reset Password</h3>
				<p id='desc'>
					You will receive an email at your inbox with guidelines to reset your
					password
				</p>
				<Field
					register={register({
						required: 'Email is required',
						pattern: { value: emailRegex, message: 'Invalid Email input' },
					})}
					shouldCheck={shouldCheck}
					invalid={errors?.email}
					name='email'
					type='text'
					placeholder='Email'
				/>
				{errors?.email && <p id='error'>{errors?.email?.message}</p>}
				<button
					type='submit'
					disabled={disabled}
					onClick={() => setShouldCheck(true)}
				>
					Submit
				</button>
			</form>
		</div>
	);
};
