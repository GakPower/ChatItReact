import React from 'react';
import './Style.scss';

export const ClickableIcon = (Icon: any) => {
	const clickable = ({
		link,
		onCLick,
		fill,
	}: {
		link?: string;
		onCLick?: any;
		fill?: string;
	}) => {
		return (
			<a
				style={{ display: 'flex', margin: '0 3px' }}
				href={link}
				target='_blank'
				rel='noopener noreferrer'
				className={link || onCLick ? 'icon' : ''}
				onClick={onCLick}
			>
				<Icon fill={fill} />
			</a>
		);
	};

	function getDisplayName(WrappedComponent: any) {
		return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	clickable.displayName = `WithSubscription(${getDisplayName(Icon)})`;

	return clickable;
};
