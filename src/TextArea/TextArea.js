import React, { Component } from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const Container = styled.div`
	* {
		box-sizing: border-box;
	}

	display: inline-block;
	padding-top: 20px;

	position: relative;
`;

const Input = styled.textarea`
	width: ${({ width }) => getComputedStyleAttributeValue(width, 'auto')};
	padding: 10px;

	outline: 0;

	border: 1px solid #c2c2c2;

	:hover,
	:focus {
		border-color: #a2a8af;
	}

	font-size: 14px;

	:disabled {
		background-color: rgba(216, 216, 216, 0.2);
		border-width: 0px;
	}
`;

const Label = styled.label`
	position: absolute;
	top: 0;
	left: 0;

	font-size: 12px;
	font-weight: bold;
	color: ${({ variant, disabled }) =>
		variant === 'boxed' && !disabled ? '#9f9396' : '#d3d3d3'};

	cursor: text;

	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'default')};

	${Input}:focus + & {
		color: #9f9396;
	}
`;

const WarningMessage = styled.span`
	color: #ec530a;
`;

class TextArea extends Component {
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
			width,
			label,
			warning,
			disabled: isDisabled,
			...otherProps
		} = this.props;
		const { inputValue } = this.state;

		const disabled = isDisabled ? { disabled: true } : {};

		return (
			<Container>
				<Input
					{...disabled}
					width={width}
					{...otherProps}
					value={inputValue}
					onChange={this.inputChangeHandler}
				/>

				<Label
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

export default TextArea;
