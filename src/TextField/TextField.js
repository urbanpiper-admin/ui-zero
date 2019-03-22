import React, { Component } from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const Container = styled.div`
	position: relative;
`;

const Input = styled.input`
	height: 34px;
	width: ${({ width }) => getComputedStyleAttributeValue(width, 'auto')};
	border-width: 0;
	border-bottom: 1px solid #e2e2e2;
	outline: 0;

	font-size: 14px;
`;

const Label = styled.label`
	position: absolute;
	bottom: 10px;
	left: 0;

	font-size: 12px;
	font-weight: bold;
	color: ${({ isActive }) => (isActive ? '#9f9396' : '#d3d3d3')};

	transform: translateY(${({ isActive }) => (isActive ? '-24px' : '0px')});
	transition: transform 0.15s ease 0s;
	cursor: text;

	${Input}:focus + & {
		color: #9f9396;

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
			width,
			placeholder,
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

				<Label onClick={this.labelClickHandler} isActive={inputValue !== ''}>
					{placeholder}
					{warning ? <WarningMessage> ({warning})</WarningMessage> : null}
				</Label>
			</Container>
		);
	}
}

export default TextField;
