import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	* {
		box-sizing: border-box;
	}

	display: inline-block;

	position: relative;

	width: ${({ inputWidth }) => inputWidth};
	padding-top: 20px;
`;

const Input = styled.textarea`
	width: 100%;
	padding: 10px;
	border: 1px solid #c2c2c2;
	outline: 0;

	background-color: transparent;

	&:hover,
	&:focus {
		border-color: #a2a8af;
	}

	font-size: 14px;

	&:disabled {
		background-color: rgba(216, 216, 216, 0.2);
		border-width: 0px;
	}
`;

const Label = styled.label`
	position: absolute;
	top: 0;
	left: 0;

	font-size: 12px;
	/* font-weight: bolder; */
	color: ${({ variant, disabled }) =>
		variant === 'boxed' && !disabled ? '#9f9396' : '#d3d3d3'};

	cursor: text;

	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'default')};

	${Input}:focus + & {
		color: #9f9396;
		color: ${({ theme }) => theme.primaryColor};
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
			<Container inputWidth={width}>
				<Input
					{...disabled}
					{...otherProps}
					value={inputValue}
					onChange={this.inputChangeHandler}
				/>

				{label ? (
					<Label
						onClick={this.labelClickHandler}
						isActive={inputValue !== ''}
						{...disabled}
					>
						{label}
						{warning ? <WarningMessage> ({warning})</WarningMessage> : null}
					</Label>
				) : null}
			</Container>
		);
	}
}

export default TextArea;
