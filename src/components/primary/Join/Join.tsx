import React from 'react';
import { Field } from '../../secondary/Field/Field';
import { useForm } from 'react-hook-form';
import './Join.scss';
export const Join = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<div id='joinContainer'>
			<h3>Join</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					register={register}
					name='username'
					type='text'
					placeholder='Username'
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};
