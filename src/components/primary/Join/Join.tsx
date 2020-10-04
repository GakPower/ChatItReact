import React from 'react';
import Field from '../../secondary/Field/Field';
import { useForm, Controller } from 'react-hook-form';
import './Join.scss';
export const Join = () => {
	const { control } = useForm();
	return (
		<div id='joinContainer'>
			<h3>Join</h3>
			<Controller as={Field} name='username' control={control} type='text' />
			{/* <Field type='text' /> */}
		</div>
	);
};
