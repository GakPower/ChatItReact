import React, { useState, useEffect } from 'react';
import { Field } from '../../secondary/Field/Field';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { isResetIdValid, updatePassword } from '../../../helpers/ServerUtils';
import './ResetPass.scss';

interface FormInput {
	password: string;
	passConfirm: string;
}

export const ResetPass = () => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();

	isResetIdValid(id).then((valid) => {
		if (!valid) {
			history.push('/login');
		}
	});

	useEffect(() => {
		const intervalID = setInterval(() => {
			isResetIdValid(id).then((valid) => {
				if (!valid) {
					history.push('/login');
				}
			});
		}, 1000);
		return () => {
			clearInterval(intervalID);
		};
	}, [id, history]);

	const [shouldCheck, setShouldCheck] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const { register, handleSubmit, watch, errors, reset, setError } = useForm<
		FormInput
	>();

	const passwordWatch = watch('password', '');

	const renderErrors = () => {
		let error;
		if (errors?.password) {
			error = errors?.password?.message;
		} else if (errors?.passConfirm) {
			error = 'Passwords do not match';
		}

		return <p>{error}</p>;
	};

	const onSubmit = async ({ password }: { password: string }) => {
		setDisabled(true);
		setTimeout(async () => {
			setDisabled(false);
			const res = await updatePassword(id, password);
			if (res.valid) {
				reset();
				setShouldCheck(false);
				// NAVIGATE TO LOGIN
				history.push('./login');
			} else {
				setError('password', {
					type: 'manual',
					message: res.message,
				});
			}
		}, 1000);
	};

	return (
		<div id='resetPassContainer'>
			<h3>Reset Password</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
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
					placeholder='New Password'
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
						validate: (value) => value === passwordWatch,
					})}
					shouldCheck={shouldCheck}
					invalid={errors?.passConfirm}
					name='passConfirm'
					type='password'
					placeholder='Confirm Password'
				/>
				{renderErrors()}
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
