import React, { useState } from 'react';
import './Field.scss';

interface Props {
	register: any;
	type: string;
	name: string;
	placeholder: string;
	invalid: any;
	shouldCheck: boolean;
}
export const Field = ({
	register,
	type,
	name,
	placeholder,
	invalid,
	shouldCheck,
}: Props) => {
	const [passShown, setPassShown] = useState(false);

	const getClasses = () => {
		const classes = [];
		if (shouldCheck) classes.push(invalid ? 'invalid' : 'valid');
		return classes.join(' ');
	};
	return (
		<div id='field' className={getClasses()}>
			<input
				className={type === 'password' ? 'pass' : ''}
				ref={register}
				name={name}
				type={passShown && type === 'password' ? 'text' : type}
				placeholder={placeholder}
				defaultValue=''
			/>

			{type === 'password' && (
				<button
					className='toggle'
					type='button'
					onClick={() => setPassShown((oldValue) => !oldValue)}
					tabIndex={-1}
				>
					{passShown ? 'H' : 'S'}
				</button>
			)}
		</div>
	);
};
