import React from 'react';
import styled from 'styled-components';

import Button from '../Button/Button';
import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const Wrapper = styled.div`
	display: flex;
	align-items: center;

	height: ${({ counterHeight }) => counterHeight};
	width: ${({ counterWidth }) =>
		getComputedStyleAttributeValue(counterWidth, '110px')};

	&,
	& * {
		box-sizing: border-box;
	}
`;

const CounterValue = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;

	height: 100%;
	width: 33.33333%;
	border: solid
		${({ theme, primaryColor }) =>
			getComputedStyleAttributeValue(primaryColor, theme.primaryColor)};
	border-width: 1px 0;

	background-color: white;

	color: ${({ theme, primaryColor }) =>
		getComputedStyleAttributeValue(primaryColor, theme.primaryColor)};
	};
`;

const CounterButton = styled(Button)`
	height: 100%;

	background-color: ${({ theme, primaryColor }) =>
		getComputedStyleAttributeValue(primaryColor, theme.primaryColor)};
	border-radius: 0;
	border-color: ${({ theme, primaryColor }) =>
		getComputedStyleAttributeValue(primaryColor, theme.primaryColor)}};

	color: ${({ secondaryColor }) =>
		getComputedStyleAttributeValue(secondaryColor, 'white')};
`;

export default function Counter({
	children,
	width,
	height = '36px',
	primaryColor,
	secondaryColor,
	onIncrement,
	onDecrement,
	...otherProps
}) {
	return (
		<Wrapper
			primaryColor={primaryColor}
			secondaryColor={secondaryColor}
			counterWidth={width}
			counterHeight={height}
			{...otherProps}
		>
			<CounterButton
				primaryColor={primaryColor}
				secondaryColor={secondaryColor}
				width="33.33333%"
				onClick={onDecrement}
			>
				-
			</CounterButton>
			<CounterValue primaryColor={primaryColor} secondaryColor={secondaryColor}>
				{children}
			</CounterValue>
			<CounterButton
				primaryColor={primaryColor}
				secondaryColor={secondaryColor}
				width="33.33333%"
				onClick={onIncrement}
			>
				+
			</CounterButton>
		</Wrapper>
	);
}
