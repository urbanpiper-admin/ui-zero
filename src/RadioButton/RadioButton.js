import React from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from './../utils/getComputedStyleAttributeValue';

const Wrapper = styled.div`
	box-sizing: border-box;

	display: inline-block;

	position: relative;

	height: 18px;
	width: 18px;
`;

const ActualRadioButton = styled.input`
	box-sizing: border-box;

	display: inline-block;

	position: absolute;
	top: 0;
	left: 0;

	height: 100%;
	width: 100%;
	margin: 0;

	visibility: hidden;
`;

const PseudoRadioButton = styled.div`
	box-sizing: border-box;

	display: inline-block;

	position: relative;

	height: 100%;
	width: 100%;
	border: 1px solid #b8c2c8;
	border-radius: 50%;

	cursor: pointer;

	${ActualRadioButton}:disabled + & {
		opacity: 0.2;

		cursor: default;
	}

	${ActualRadioButton}:checked + & {
		border: 3px solid
			${({ primaryColor, theme }) =>
				getComputedStyleAttributeValue(primaryColor, theme.primaryColor)};

		::after {
			content: '';

			position: absolute;
			top: 50%;
			left: 50%;

			height: 7px;
			width: 7px;
			border-radius: 50%;

			background-color: ${({ primaryColor, theme }) =>
				getComputedStyleAttributeValue(primaryColor, theme.primaryColor)};

			transform: translate(-50%, -50%);
		}
	}
`;

function RadioButton({
	checked,
	primaryColor,
	secondaryColor,
	borderColor,
	onChange,
	...otherProps
}) {
	function pseudoRadioButtonClickHandler(event) {
		event.target.previousSibling.click();
	}

	const defaultChecked = checked ? { defaultChecked: true } : {};

	return (
		<Wrapper>
			<ActualRadioButton
				onChange={onChange}
				type="radio"
				{...otherProps}
				{...defaultChecked}
			/>
			<PseudoRadioButton
				primaryColor={primaryColor}
				secondaryColor={secondaryColor}
				onClick={pseudoRadioButtonClickHandler}
			/>
		</Wrapper>
	);
}

export default RadioButton;
