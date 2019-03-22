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

const ActualCheckBox = styled.input`
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

const PseudoCheckBox = styled.div`
	box-sizing: border-box;

	display: inline-block;

	position: relative;

	height: 100%;
	width: 100%;
	border: 1px solid #b8c2c8;
	border-radius: 1px;

	cursor: pointer;

	${ActualCheckBox}:disabled + & {
		opacity: 0.2;

		cursor: default;
	}

	${ActualCheckBox}:checked + & {
		border-width: 0;

		background-color: ${({ primaryColor, theme }) =>
			getComputedStyleAttributeValue(primaryColor, theme.primaryColor)};

		::after {
			content: '✓';

			position: absolute;
			top: 50%;
			left: 50%;

			font-size: 18px;
			color: ${({ secondaryColor }) =>
				getComputedStyleAttributeValue(secondaryColor, 'white')};

			transform: translate(-50%, -50%);
		}
	}
`;

function CheckBox({
	checked,
	primaryColor,
	secondaryColor,
	borderColor,
	onChange,
	...otherProps
}) {
	function pseudoCheckBoxClickHandler(event) {
		event.target.previousSibling.click();
	}

	const defaultChecked = checked ? { defaultChecked: true } : {};

	return (
		<Wrapper>
			<ActualCheckBox
				onChange={onChange}
				type="checkbox"
				{...otherProps}
				{...defaultChecked}
			/>
			<PseudoCheckBox
				primaryColor={primaryColor}
				secondaryColor={secondaryColor}
				onClick={pseudoCheckBoxClickHandler}
			/>
		</Wrapper>
	);
}

export default CheckBox;
