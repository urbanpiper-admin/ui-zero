import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../Button/index';


/************************* 
	NEEDS WORK
********************/

const TimePickerElement = styled.div`
	display: inline-flex;
	flex-wrap: wrap;

	height: 100px;
	/* width: 200px; */
	padding: 25px 0;

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
`;

const TransitionContainerElement = styled.div`
	position: relative;

	height: 50px;
	width: 50px;
	/* width: 30%;
	margin: 0 1.5%; */
	margin: 0 3px;
`;

const TransitionButton = styled(Button)`
	position: absolute;
	${({ align }) => `${align}: 0;`}
	left: 50%;

	border-color: #727272;
	border-width: 0;
	background-color: transparent;

	transform: translate(
		-50%,
		${({ align }) => (align === 'top' ? '-100%' : '100%')}
	);

	&::after {
		content: '';

		padding: 3px;
		border: 1px solid #727272;
		border-right-width: 0;
		border-bottom-width: 0;

		transition: transform 0.15s ease 0s;
		transform: ${({ align }) =>
				align === 'top' ? 'rotate(45deg)' : 'rotate(-135deg)'}
			translate(25%, 25%);
	}

	&:hover::after {
		transform: ${({ align }) =>
				align === 'top' ? 'rotate(45deg)' : 'rotate(-135deg)'}
			translate(0, 0);
	}
`;

const Scroller = styled.div`
	display: flex;
	flex-wrap: wrap;

	overflow-y: auto;

	height: 100%;

	border-radius: 50%;
	border: 1px solid #727272;

	font-size: 18px;

	&::-webkit-scrollbar {
		width: 0;
	}
`;

const TimeElement = styled(Button)`
	border-color: #727272;
	border-width: 0;
	border-radius: 0;

	color: #727272;
	font-size: 18px;

	${({ active, theme }) =>
		active
			? `
					// border-width: 2px;
					// font-weight: bolder;
					background-color: ${theme.primaryColor};
					// background-color: #e2e2e2;
					// background-color: transparent;
					color: white;
					// color: #727272;
					// color: ${theme.primaryColor};
					border-color: white;
					border-color: #727272;
					border-color: ${theme.primaryColor};
				`
			: ''}
`;

const TransitionContainer = React.forwardRef(
	({ children, ...otherProps }, ref) => {
		const transitionButtonClickHandler = (event, buttonType) => {
			const top = buttonType === 'top' ? -48 : 48;

			const { parentElement: parent } = event.target;

			const isAtTop = parent.scrollTop === 0;
			const isAtBottom =
				parent.offsetHeight + parent.scrollTop - 2 === parent.scrollHeight;

			if (isAtTop && buttonType === 'top') {
				parent.scrollTo({
					top: parent.scrollHeight,
					left: 0,
					behavior: 'smooth'
				});
			} else if (isAtBottom && buttonType === 'bottom') {
				parent.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			} else {
				parent.scrollBy({
					top,
					left: 0,
					behavior: 'smooth'
				});
			}
		};

		return (
			<TransitionContainerElement {...otherProps}>
				<Scroller ref={ref}>
					<TransitionButton
						height="25px"
						align="top"
						backgroundColor="#f2f2f2"
						onClick={event => transitionButtonClickHandler(event, 'top')}
					/>
					{children}
					<TransitionButton
						height="25px"
						align="bottom"
						backgroundColor="#f2f2f2"
						onClick={event => transitionButtonClickHandler(event, 'bottom')}
					/>
				</Scroller>
			</TransitionContainerElement>
		);
	}
);

class TimePicker extends Component {
	constructor(props) {
		super(props);

		const { defaultSelected = {} } = props;

		this.state = {
			hour: defaultSelected.hour || null,
			minute: defaultSelected.minute || null,
			second: defaultSelected.second || null,
			unit: defaultSelected.unit || null
		};

		this.parseTimeUnit = this.parseTimeUnit.bind(this);
		this.changeTimeHandler = this.changeTimeHandler.bind(this);
		this.getValidHours = this.getValidHours.bind(this);
		this.range = this.range.bind(this);

		this.hourPickerRef = React.createRef();
		this.minutePickerRef = React.createRef();
		this.secondPickerRef = React.createRef();
		this.unitPickerRef = React.createRef();
	}

	parseTimeUnit(number) {
		const stringVersion = number.toString();

		if (stringVersion.length === 1) {
			return `0${stringVersion}`;
		}

		return number;
	}

	changeTimeHandler(event, segment, segmentValue) {
		const { onTimeChange } = this.props;
		const { hour, minute, second, unit } = this.state;

		if (onTimeChange) {
			onTimeChange({ hour, minute, second, unit });
		}

		this.setState({
			[segment]: segmentValue
		});
	}

	range(startAt, endAt) {
		return [...Array(endAt - startAt).keys()].map(index => index + startAt);
	}

	getValidHours(startTime, endTime) {
		const { hour, second, minute, unit } = this.state;

		if (startTime.unit === endTime.unit) {
			return this.range(startTime.hour, endTime.hour + 1);
		} else if (startTime.unit === 'am' && endTime.unit === 'pm') {
			if (unit === 'am') {
				return this.range(startTime.hour, 12);
			} else if (unit === 'pm') {
				return this.range(0, endTime.hour + 1);
			}

			return this.range(0, 12);
		}
	}

	render() {
		const {
			hideHour,
			hideMinute,
			hideSecond,
			hideUnit,
			startTime = { hour: 0, minute: 0, second: 0, unit: 'am' },
			endTime = { hour: 11, minute: 59, second: 59, unit: 'pm' }
		} = this.props;
		const { hour, minute, second, unit } = this.state;

		// console.log(this.getValidHours(startTime, endTime));

		return (
			<TimePickerElement>
				{!hideHour ? (
					<TransitionContainer ref={this.hourPickerRef}>
						{Array(12)
							.fill()
							.map((_, index) => (
								<TimeElement
									key={index}
									height="100%"
									width="100%"
									onClick={event =>
										this.changeTimeHandler(event, 'hour', index)
									}
									active={hour === index}
								>
									{this.parseTimeUnit(index)}
								</TimeElement>
							))}
					</TransitionContainer>
				) : null}

				{!hideMinute ? (
					<TransitionContainer ref={this.minutePickerRef}>
						{Array(60)
							.fill()
							.map((_, index) => (
								<TimeElement
									key={index}
									height="100%"
									width="100%"
									onClick={event =>
										this.changeTimeHandler(event, 'minute', index)
									}
									active={minute === index}
								>
									{this.parseTimeUnit(index)}
								</TimeElement>
							))}
					</TransitionContainer>
				) : null}

				{!hideSecond ? (
					<TransitionContainer ref={this.secondPickerRef}>
						{Array(60)
							.fill()
							.map((_, index) => (
								<TimeElement
									key={index}
									height="100%"
									width="100%"
									onClick={event =>
										this.changeTimeHandler(event, 'second', index)
									}
									active={second === index}
								>
									{this.parseTimeUnit(index)}
								</TimeElement>
							))}
					</TransitionContainer>
				) : null}

				{!hideUnit ? (
					<TransitionContainer ref={this.unitPickerRef}>
						{['am', 'pm'].map((unitType, index) => (
							<TimeElement
								key={index}
								height="100%"
								width="100%"
								onClick={event =>
									this.changeTimeHandler(event, 'unit', unitType)
								}
								active={unitType === unit}
							>
								{unitType}
							</TimeElement>
						))}
					</TransitionContainer>
				) : null}
			</TimePickerElement>
		);
	}

	componentDidMount() {
		const { defaultVisibleTime = {} } = this.props;
		const { hour, minute, second, unit } = defaultVisibleTime;

		const pickers = {
			hour: this.hourPickerRef.current,
			minute: this.minutePickerRef.current,
			second: this.secondPickerRef.current,
			unit: this.unitPickerRef.current
		};

		const containerScrollHeight = pickers.hour.offsetHeight - 2;

		Object.keys(defaultVisibleTime).map(type => {
			if (defaultVisibleTime[type]) {
				pickers[type].scrollTo(0, containerScrollHeight * type);
			}
		});
	}
}

export default TimePicker;
