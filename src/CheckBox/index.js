import React from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from './../utils/getComputedStyleAttributeValue';

const Wrapper = styled.div`
	display: inline-flex;
	align-items: center;

	* {
		box-sizing: border-box;
	}
`;

const CheckBoxContainer = styled.div`
	display: inline-block;

	position: relative;

	height: 18px;
	width: 18px;
`;

const ActualCheckBox = styled.input`
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

		&::after {
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

const Label = styled.label`
	padding-left: 3px;
	padding-right: 3px;

	cursor: pointer;

	${({ labelColor }) => `color: ${labelColor};`};

	${({ isCheckBoxDisabled }) =>
		isCheckBoxDisabled
			? `
					opacity: 0.2;
					cursor: default;
				`
			: ''}
`;

function CheckBox({
	checked,
	defaultChecked,
	primaryColor,
	secondaryColor,
	labelColor,
	label,
	disabled,
	...otherProps
}) {
	function pseudoCheckBoxClickHandler(event) {
		event.target.previousSibling.click();
	}

	function labelClickHandler(event) {
		event.target.previousSibling.children[0].click();
	}

	const computedDefaultChecked =
		checked || defaultChecked ? { defaultChecked: true } : {};

	const isDisabled = disabled ? { disabled: true } : {};

	return (
		<Wrapper>
			<CheckBoxContainer>
				<ActualCheckBox
					type="checkbox"
					{...isDisabled}
					{...otherProps}
					{...computedDefaultChecked}
				/>
				<PseudoCheckBox
					primaryColor={primaryColor}
					secondaryColor={secondaryColor}
					onClick={pseudoCheckBoxClickHandler}
				/>
			</CheckBoxContainer>

			{label ? (
				<Label
					isCheckBoxDisabled={disabled}
					onClick={labelClickHandler}
					labelColor={labelColor}
				>
					{label}
				</Label>
			) : null}
		</Wrapper>
	);
}

export default CheckBox;
