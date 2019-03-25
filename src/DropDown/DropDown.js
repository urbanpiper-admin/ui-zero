import React, { Component } from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

// TODO: allow disabled prop

const Wrapper = styled.div`
	* {
		box-sizing: border-box;
		background-color: white;
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

const SelectedName = styled.div`
	width: 100%;
	margin-right: 1em;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Arrow = styled.span`
	position: absolute;
	top: 50%;
	right: 8px;

	width: 1em;

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
		this.setState({
			isActive: false
		});
	}

	selectKeyDownHandler(event) {
		const key = event.keyCode || event.which || event.key;

		const { options } = this.props;
		const { selectedOption, isActive } = this.state;

		const arrowKeyDownHandler = (startingIndex, edgeIndex) => {
			event.preventDefault();

			if (selectedOption.value === '') {
				this.setState({
					selectedOption: { ...options[startingIndex] }
				});
			} else {
				const prevOptionIndex = options.findIndex(
					option => option.value === selectedOption.value
				);

				if (prevOptionIndex !== edgeIndex) {
					const curIndex =
						startingIndex === 0 ? prevOptionIndex + 1 : prevOptionIndex - 1;

					this.setState({
						selectedOption: {
							...options[curIndex]
						}
					});
				}
			}
		};

		if (key === 13 || key === 'Enter') {
			this.setState({
				isActive: !isActive
			});
		} else if (key === 'ArrowUp' || key === 38) {
			arrowKeyDownHandler(options.length - 1, 0);
		} else if (key === 'ArrowDown' || key === 40) {
			arrowKeyDownHandler(0, options.length - 1);
		} else if (key === 27 || key === 'Escape') {
			this.setState({
				isActive: false
			});
		}
	}

	optionClickHandler(event, selectedOption) {
		const { onChange } = this.props;

		this.setState({
			selectedOption
		});

		const selectElement = event.target.parentElement.parentElement;

		selectElement.value = selectedOption.value;

		const simulatedEvent = {
			target: selectElement
		};

		onChange(simulatedEvent);
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

					<SelectedName>{selectedOption.name}</SelectedName>

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
