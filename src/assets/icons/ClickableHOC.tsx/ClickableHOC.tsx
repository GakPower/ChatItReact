import React from 'react';
import './Style.scss';

export const ClickableIcon = (Icon: any) => {
	const clickable = ({ link, ...rest }: { link: string }) => {
		return (
			<a
				style={{ display: 'flex', margin: '0 3px' }}
				href={link}
				target='_blank'
				rel='noopener noreferrer'
				className='icon'
			>
				<Icon {...rest} />
			</a>
		);
	};

	function getDisplayName(WrappedComponent: any) {
		return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	clickable.displayName = `WithSubscription(${getDisplayName(Icon)})`;

	return clickable;
};
