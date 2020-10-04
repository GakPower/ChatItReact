import React from 'react';

interface Props {
	type: string;
}
const Field = ({ type }: Props) => {
	return (
		<div id='field'>
			<input type={type} />
		</div>
	);
};

export default Field;
