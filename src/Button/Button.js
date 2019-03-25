import React from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';
import getStateStyles from '../utils/getStateStyles';
import styles from './Button.css.js';

const ButtonComponent = styled.button`
	${styles.buttonStyles}

	height: ${({ btnHeight }) => getComputedStyleAttributeValue(btnHeight, '36px')};
	width: ${({ btnWidth, shape }) =>
		getComputedStyleAttributeValue(
			btnWidth,
			shape === 'circle' ? '36px' : 'auto'
		)};
	border: 1px solid
		${({ borderColor, backgroundColor, theme }) =>
			getComputedStyleAttributeValue(
				borderColor,
				backgroundColor ? backgroundColor : theme.primaryColor
			)};
	border-radius: ${({ shape, btnColorheme }) => {
		switch (shape) {
			case 'circle':
				return '50%';
			case 'rounded':
				return '24px';
			default:
				return '2px';
		}
	}};

	background-color: ${({ backgroundColor }) =>
		getComputedStyleAttributeValue(backgroundColor, 'white')};

	color: ${({ btnColor, theme }) =>
		getComputedStyleAttributeValue(btnColor, theme.primaryColor)};

	${({ styleOnHover, styleOnFocus, styleOnActive }) =>
		getStateStyles(styleOnHover, styleOnActive, styleOnFocus)}
`;

function Button({ width, height, color, children, ...otherProps }) {
	return (
		<ButtonComponent
			btnColor={color}
			btnWidth={width}
			btnHeight={height}
			{...otherProps}
		>
			{children}
		</ButtonComponent>
	);
}

export default Button;
