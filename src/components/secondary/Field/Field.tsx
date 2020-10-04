import React from 'react';
import './Field.scss';

interface Props {
	register: any;
	type: string;
	name: string;
	placeholder: string;
}
export const Field = ({ register, type, name, placeholder }: Props) => {
	return (
		<div id='field'>
			<input ref={register} name={name} type={type} placeholder={placeholder} />
		</div>
	);
};
