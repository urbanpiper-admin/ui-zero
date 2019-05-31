import React from 'react';
import styled from 'styled-components';

import getStateStyles from '../utils/getStateStyles';
import styles from './Button.css.js';

const ButtonComponent = styled.button`
	${styles.buttonStyles}

	height: ${({ btnHeight }) => btnHeight};
	width: ${({ btnWidth }) => btnWidth};
	border: 1px solid
		${({ theme, variant, borderColor, backgroundColor, btnColor }) =>
			borderColor ||
			(variant === 'fill'
				? backgroundColor || theme.primaryColor
				: theme.primaryColor)};
	border-radius: ${({ btnShape }) => {
		switch (btnShape) {
			case 'circle':
				return '50%';
			case 'rounded':
				return '24px';
			default:
				return '2px';
		}
	}};

	background-color: ${({ theme, variant, backgroundColor }) =>
		backgroundColor || (variant === 'fill' ? theme.primaryColor : 'white')};

	color: ${({ theme, btnColor, variant }) =>
		btnColor || (variant === 'fill' ? 'white' : theme.primaryColor)};

	${({ styleOnHover, styleOnFocus, styleOnActive }) =>
		getStateStyles(styleOnHover, styleOnActive, styleOnFocus)}
`;

function Button({
	variant = 'outline',
	shape = 'rectangle',
	width = shape === 'circle' ? '36px' : 'auto',
	height = '36px',
	color,
	children,
	backgroundColor,
	borderColor,
	onClick = event => {},
	...otherProps
}) {
	return (
		<ButtonComponent
			btnColor={color}
			btnWidth={width}
			btnHeight={height}
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			variant={variant}
			btnShape={shape}
			onClick={onClick}
			{...otherProps}
		>
			{children}
		</ButtonComponent>
	);
}

export default Button;
