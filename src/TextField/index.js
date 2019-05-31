import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: inline-block;

	* {
		box-sizing: border-box;
	}

	position: relative;

	width: ${({ inputWidth }) => inputWidth};
	padding-top: 20px;
`;

const Input = styled.input`
	display: inline-block;

	height: 34px;
	width: 100%;
	padding: ${({ variant }) => (variant === 'boxed' ? '8px' : '0')};

	outline: 0;

	&:hover,
	&:focus {
		border-color: #a2a8af;
	}

	${({ variant }) =>
		variant === 'boxed'
			? `
					border: 1px solid #c2c2c2;
				`
			: `
					border-width: 0;
					border-bottom: 1px solid #e2e2e2;
				`}

	font-size: 14px;

	&:disabled {
		background-color: rgba(216, 216, 216, 0.2);
		border-width: 0px;
	}
`;

const Label = styled.label`
	position: absolute;
	bottom: ${({ variant }) => (variant === 'boxed' ? '13px' : '7px')};
	left: 0;

	font-size: ${({ variant, isActive }) =>
		isActive || variant === 'boxed' ? '12px' : '14px'};
	font-weight: ${({ variant, isActive }) =>
		!isActive || variant === 'boxed' ? 'normal' : 'bolder'};
	color: ${({ theme, isActive, variant, disabled }) => {
		if (disabled) {
			return '#d3d3d3';
		} else {
			return isActive ? theme.primaryColor : '#9f9396';
		}
	}};

	transform: translateY(
		${({ isActive, variant }) =>
			isActive || variant === 'boxed' ? '-24px' : '0px'}
	);
	transition: transform 0.15s ease 0s, font-size 0.15s ease 0s,
		font-weight 0.075s ease 0s;
	cursor: text;

	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'default')};

	${Input}:focus + & {
		font-size: 12px;
		font-weight: ${({ variant }) =>
			variant === 'boxed' ? 'normal' : 'bolder'};

		color: ${({ theme }) => theme.primaryColor};

		transform: translateY(-24px);
	}
`;

const WarningMessage = styled.span`
	color: #ec530a;
`;

const TextField = ({
	value,
	onChange,
	width = 'auto',
	label,
	warning,
	disabled: isDisabled,
	variant,
	...otherProps
}) => {
	// const [inputValue, setInputValue] = useState(value);

	// useEffect(() => {
	// 	setInputValue(value);
	// }, [value]);

	// const inputChangeHandler = event => {
	// 	onChange(event);

	// 	setInputValue(event.target.value);
	// };

	const labelClickHandler = event => {
		event.currentTarget.previousSibling.focus();
	};

	const disabled = isDisabled ? { disabled: true } : {};

	return (
		<Container inputWidth={width}>
			<Input
				{...disabled}
				{...otherProps}
				variant={variant}
				value={value}
				onChange={onChange}
			/>

			<Label
				variant={variant}
				onClick={labelClickHandler}
				isActive={value}
				{...disabled}
			>
				{label}
				{warning ? <WarningMessage> ({warning})</WarningMessage> : null}
			</Label>
		</Container>
	);
};

export default TextField;
