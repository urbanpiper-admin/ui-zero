import React from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const AnchorComponent = styled.a`
	opacity: ${({ disabledLink }) => (disabledLink ? '0.2' : '1')};

	outline: 0;

	font-size: ${({ fontSize }) =>
		getComputedStyleAttributeValue(fontSize, '12px')};
	font-weight: 500;
	text-decoration: none;
	color: #3498db;

	pointer-events: ${({ disabledLink }) => (disabledLink ? 'none' : 'auto')}
	cursor: pointer;

	:hover,
	:focus {
		text-decoration: underline;
	}
`;

export default function Anchor({
	children,
	disabled,
	tabIndex,
	...otherProps
}) {
	return (
		<AnchorComponent
			disabledLink={disabled}
			tabIndex={tabIndex || (disabled ? '-1' : '0')}
			{...otherProps}
		>
			{children}
		</AnchorComponent>
	);
}
