import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: inline-flex;
	align-items: center;

	* {
		box-sizing: border-box;
	}
`;

const RadioButtonContainer = styled.div`
	display: inline-block;

	position: relative;

	height: 18px;
	width: 18px;
`;

const ActualRadioButton = styled.input`
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
			${({ primaryColor, theme }) => primaryColor || theme.primaryColor};

		::after {
			content: '';

			position: absolute;
			top: 50%;
			left: 50%;

			height: 7px;
			width: 7px;
			border-radius: 50%;

			background-color: ${({ primaryColor, theme }) =>
				primaryColor || theme.primaryColor};

			transform: translate(-50%, -50%);
		}
	}
`;

const Label = styled.label`
	padding-left: 3px;
	padding-right: 3px;

	cursor: pointer;

	${({ labelColor }) => `color: ${labelColor};`};

	${({ isRadioDisabled }) =>
		isRadioDisabled
			? `
					opacity: 0.2;
					cursor: default;
				`
			: ''}
`;

function RadioButton({
	checked,
	defaultChecked,
	primaryColor,
	secondaryColor,
	labelColor,
	label,
	disabled,
	...otherProps
}) {
	function pseudoRadioButtonClickHandler(event) {
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
			<RadioButtonContainer>
				<ActualRadioButton
					type="radio"
					{...computedDefaultChecked}
					{...isDisabled}
					{...otherProps}
				/>
				<PseudoRadioButton
					primaryColor={primaryColor}
					secondaryColor={secondaryColor}
					onClick={pseudoRadioButtonClickHandler}
				/>
			</RadioButtonContainer>

			{label ? (
				<Label
					isRadioDisabled={disabled}
					onClick={labelClickHandler}
					labelColor={labelColor}
				>
					{label}
				</Label>
			) : null}
		</Wrapper>
	);
}

export default RadioButton;
