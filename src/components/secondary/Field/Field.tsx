import React, { useState } from 'react';
import './Field.scss';

interface Props {
	register: any;
	type: string;
	name: string;
	placeholder: string;
}
export const Field = ({ register, type, name, placeholder }: Props) => {
	const [passShown, setPassShown] = useState(false);
	return (
		<div id='field'>
			<input
				ref={register}
				name={name}
				type={passShown && type === 'password' ? 'text' : type}
				placeholder={placeholder}
			/>

			{type === 'password' && (
				<button
					className='toggle'
					type='button'
					onClick={() => setPassShown((oldValue) => !oldValue)}
				>
					{passShown ? 'H' : 'S'}
				</button>
			)}
		</div>
	);
};
