import React, { Component } from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

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
	/* width: ${({ width }) => getComputedStyleAttributeValue(width, 'auto')}; */
	width: 100%;
	/* width: ${({ width }) => width}; */
	padding: ${({ variant }) => (variant === 'boxed' ? '8px' : '0')};

	outline: 0;

	:hover, :focus {
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

	:disabled {
		background-color: rgba(216, 216, 216, 0.2);
		border-width: 0px;
	}
`;

const Label = styled.label`
	position: absolute;
	bottom: ${({ variant }) => (variant === 'boxed' ? '13px' : '7px')};
	left: 0;

	/* font-size: ${({ variant }) => (variant === 'boxed' ? '12px' : '14px')}; */
	font-size: ${({ variant, isActive }) =>
		isActive || variant === 'boxed' ? '12px' : '14px'};
	font-weight: ${({ variant, isActive }) =>
		!isActive || variant === 'boxed' ? 'normal' : 'bolder'};
	color: ${({ theme, isActive, variant, disabled }) => {
		if (disabled) {
			return '#d3d3d3';
		} else {
			return isActive ? theme.primaryColor : '#9f9396';
			// return isActive && variant !== 'boxed' ? theme.primaryColor : '#9f9396';
		}
	}};

	transform: translateY(
		${({ isActive, variant }) =>
			isActive || variant === 'boxed' ? '-24px' : '0px'}
	);
	transition: transform 0.15s ease 0s, font-size 0.15s ease 0s, font-weight 0.075s ease 0s;
	cursor: text;

	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'default')};

	${Input}:focus + & {
		font-size: 12px;
		/* font-weight: bolder; */
		font-weight: ${({ variant }) => (variant === 'boxed' ? 'normal' : 'bolder')};
		

		color: ${({ theme }) => theme.primaryColor};
		/* color: ${({ theme, variant }) =>
			variant === 'boxed' ? '#9f9396' : theme.primaryColor}; */

		transform: translateY(-24px);
	}
`;

const WarningMessage = styled.span`
	color: #ec530a;
`;

class TextField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: props.input || ''
		};

		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.labelClickHandler = this.labelClickHandler.bind(this);
	}

	inputChangeHandler(event) {
		this.setState({
			inputValue: event.target.value
		});

		const { onChange: receivedOnChange } = this.props;

		if (receivedOnChange) {
			receivedOnChange(event);
		}
	}

	labelClickHandler(event) {
		event.currentTarget.previousSibling.focus();
	}

	render() {
		const {
			width = 'auto',
			label,
			warning,
			disabled: isDisabled,
			variant,
			...otherProps
		} = this.props;
		const { inputValue } = this.state;

		const disabled = isDisabled ? { disabled: true } : {};

		return (
			<Container inputWidth={width}>
				<Input
					{...disabled}
					{...otherProps}
					variant={variant}
					value={inputValue}
					onChange={this.inputChangeHandler}
				/>

				<Label
					variant={variant}
					onClick={this.labelClickHandler}
					isActive={inputValue !== ''}
					{...disabled}
				>
					{label}
					{warning ? <WarningMessage> ({warning})</WarningMessage> : null}
				</Label>
			</Container>
		);
	}
}

export default TextField;
