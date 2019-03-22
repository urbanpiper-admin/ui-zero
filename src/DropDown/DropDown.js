import React, { Component } from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const Wrapper = styled.div`
	* {
		box-sizing: border-box;
	}
`;

const Box = styled.div`
	display: flex;
	align-items: center;

	height: ${({ boxHeight }) =>
		getComputedStyleAttributeValue(boxHeight, '36px')};
	padding: 8px;
	border: 1px solid #c2c2c2;

	font-size: 14px;

	cursor: pointer;
`;

const Select = styled(Box)`
	position: relative;

	width: ${({ boxWidth }) => getComputedStyleAttributeValue(boxWidth, '100%')};
	border-radius: 1px;
	border-color: #c2c2c2;
	outline: 0;

	:hover,
	:focus {
		border-color: ${({ isActive }) => (isActive ? '#4d545b' : '#a2a8af')};
	}
`;

const Arrow = styled.span`
	position: absolute;
	top: 50%;
	right: 8px;

	font-size: 10px;

	transform: translateY(-50%);
`;

const Options = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	overflow: hidden;

	width: 100%;
	margin: 1px 0 0;

	transform: scaleY(0);
	transform-origin: top;
	transition: transform 0.1s ease 0s;

	${Select}:focus > & {
		transform: scaleY(${({ expanded }) => (expanded ? '1' : '0')});
	}
`;

const Option = styled(Box)`
	width: 100%;
	margin: -1px 0 0;
	/* padding-right: 16px;
	padding-left: 16px; */

	:first-of-type {
		margin: 0;
	}

	:last-of-type {
		border-bottom-left-radius: 1px;
		border-bottom-right-radius: 1px;
	}

	:hover,
	:focus {
		background-color: #fdfdfe;
	}
`;

export default class DropDown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedOption: { name: '', value: '' },
			isActive: false
		};

		this.selectClickHandler = this.selectClickHandler.bind(this);
		this.selectBlurHandler = this.selectBlurHandler.bind(this);
		this.selectKeyDownHandler = this.selectKeyDownHandler.bind(this);
		this.optionClickHandler = this.optionClickHandler.bind(this);
	}

	selectClickHandler(event) {
		const { isActive } = this.state;

		this.setState({
			isActive: !isActive
		});
	}

	selectBlurHandler(event) {
		// const { isActive } = this.state;

		this.setState({
			isActive: false
		});
	}

	selectKeyDownHandler(event) {
		console.log('keypress');
	}

	optionClickHandler(event, selectedOption) {
		const { onChange } = this.props;

		this.setState({
			selectedOption
		});

		onChange({ value: selectedOption.value });
	}

	render() {
		const { height, width, options, ...otherProps } = this.props;
		const { selectedOption, isActive } = this.state;

		return (
			<Wrapper>
				<Select
					boxHeight={height}
					boxWidth={width}
					{...otherProps}
					isActive={isActive}
					onClick={this.selectClickHandler}
					onBlur={this.selectBlurHandler}
					onKeyDown={this.selectKeyDownHandler}
					tabIndex="0"
				>
					<Arrow>▼</Arrow>

					{selectedOption.name}

					<Options expanded={isActive}>
						{options.map(option => (
							<Option
								key={option.value}
								onClick={event => this.optionClickHandler(event, option)}
							>
								{option.name}
							</Option>
						))}
					</Options>
				</Select>
			</Wrapper>
		);
	}
}
