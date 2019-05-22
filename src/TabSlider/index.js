import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../Button';

const Wrapper = styled.div`
	display: flex;

	position: relative;

	height: ${({ sliderHeight }) => sliderHeight};
	width: 100%;
	box-shadow: 0 2px 5px 0 hsla(0, 0%, 0%, 0.5);

	background-color: ${({ theme, primaryColor }) =>
		primaryColor || theme.primaryColor};

	text-align: center;
	color: ${({ secondaryColor }) => secondaryColor};

	cursor: pointer;

	&,
	*,
	::before,
	::after {
		box-sizing: border-box;
	}
`;

const IconButton = styled(Button)`
	flex-shrink: 0;

	position: relative;

	height: ${({ sliderHeight }) => sliderHeight};
	width: calc(${({ sliderHeight }) => sliderHeight} * 1.5);
	border: 0;
	border-radius: 0;
	box-shadow: 0 0 2px 0 hsla(0, 0%, 0%, 0.25);

	background-color: ${({ theme, primaryColor }) =>
		primaryColor || theme.primaryColor};

	&:hover,
	&:focus {
		filter: brightness(90%);
	}

	&::before {
		content: '';

		position: absolute;
		top: 50%;
		left: 50%;

		padding: ${({ sliderHeight }) => `calc(${sliderHeight} / 12)`};
		border: 3px solid ${({ secondaryColor }) => secondaryColor};

		transform: translate(-50%, -50%) rotate(-45deg);

		${({ align }) =>
			align === 'left'
				? `
						border-right: transparent;
						border-bottom: transparent;
					`
				: `
						border-left: transparent;
						border-top: transparent;
					`}
	}
`;

const TabContainers = styled.div`
	display: flex;

	scrollbar-width: none;
	overflow-x: -moz-scrollbars-none;
	overflow-x: auto;

	height: 100%;
	width: 100%;
	margin: 0 auto;

	background-color: ${({ theme, primaryColor }) =>
		primaryColor || theme.primaryColor};

	text-align: center;
	color: ${({ secondaryColor }) => secondaryColor};

	cursor: pointer;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const TabContainer = styled.div`
	flex-shrink: 0;

	/* position: relative; */

	height: ${({ sliderHeight }) => sliderHeight};
	padding: 10px 0;
`;

const Tab = styled(Button)`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	margin: auto;
	padding: 0 15px;
	border: 0;
	border-right: 1px solid ${({ secondaryColor }) => secondaryColor};

	background-color: transparent;
	color: ${({ secondaryColor }) => secondaryColor};

	${({ active }) => (active ? 'font-weight: bolder' : '')};
	line-height: ${({ sliderHeight }) => sliderHeight};

	${TabContainer}:last-child > & {
		border-right: 0;
	}

	${({ collapsible, secondaryColor }) =>
		collapsible
			? `	
					&:after {
						content: '';

						margin-left: 10px;
						padding: 3px;
						border: 2px solid ${secondaryColor};
						border-top: 0;
						border-left: 0;

						transform: rotate(45deg);
						}
				`
			: ''}
`;

const Options = styled.div`
	display: flex;
	flex-direction: column;

	position: absolute;
	top: calc(100% + 7px);
	left: ${({ left }) => left + 'px'};
	opacity: 0;

	/* visibility: hidden; */
	/* opacity: 0;
	pointer-events: none; */

	width: 200px;
	box-shadow: 0 5px 10px -1px hsla(0, 0%, 0%, 0.25);

	background-color: white;

	/* transform: translateY(20px); */
	transform: translateX(-50%) scaleY(0);
	transform-origin: top;
	transition: transform 0.3s ease 0s;

	${TabContainer}:hover > &,
	${Tab}:focus + & {
		/* pointer-events: default; */
		/* opacity: 1; */
		transform: translateX(-50%) scaleY(1);
		opacity: 1;

		/* transform: translateY(0px); */
	}

	::before {
		content: '';

		position: absolute;
		top: 0;
		left: 50%;

		border: 7px solid transparent;
		border-bottom-color: white;

		transform: translate(-50%, -100%);
	}

	::after {
		content: '';

		position: absolute;
		top: -7px;
		left: 0;

		height: 7px;
		width: 100%;
	}
`;

const Option = styled(Tab)`
	width: 100%;
	padding: 0 10px;

	color: #525252;

	border-right-width: 0;
	border-bottom: 1px solid #a2a2a2;

	&:last-child {
		border-bottom-width: 0;
	}

	&:hover,
	&:focus {
		background-color: #f2f2f2;
	}
`;

export default class TabSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			focussedTabLeft: 0,
			showOptions: false
		};

		this.tabFocusHandler = this.tabFocusHandler.bind(this);
		this.tabBlurHandler = this.tabBlurHandler.bind(this);
	}

	tabFocusHandler(event) {
		const { currentTarget: hoveredTab } = event;

		const tabBounds = hoveredTab.getBoundingClientRect();

		this.setState({
			showOptions: true,
			focussedTabLeft:
				tabBounds.left -
					hoveredTab.parentElement.parentElement.getBoundingClientRect().left <
				0
					? 0
					: tabBounds.left -
					  hoveredTab.parentElement.parentElement.getBoundingClientRect()
							.left +
					  tabBounds.width / 2
		});
	}

	tabBlurHandler(event) {
		this.setState({
			showOptions: false
		});
	}

	render() {
		const {
			tabs,
			primaryColor,
			secondaryColor = 'white',
			height = '40px',
			activeTabID,
			onChange,
			...otherProps
		} = this.props;

		const { focussedTabLeft, showOptions } = this.state;

		return (
			<Wrapper
				sliderHeight={height}
				primaryColor={primaryColor}
				{...otherProps}
			>
				<IconButton
					align="left"
					sliderHeight={height}
					primaryColor={primaryColor}
					secondaryColor={secondaryColor}
					onClick={event =>
						event.target.nextSibling.scrollBy({
							left: -250,
							top: 0,
							behavior: 'smooth'
						})
					}
				/>
				<TabContainers
					primaryColor={primaryColor}
					secondaryColor={secondaryColor}
					sliderHeight={height}
				>
					{tabs.map(
						(
							{ component: TabElement, id: tabID, options, ...otherTabProps },
							index
						) => {
							const tabContainerEvents = options
								? {
										onMouseOut: this.tabBlurHandler,
										onBlur: this.tabBlurHandler,
										onMouseOver: this.tabFocusHandler,
										onFocus: this.tabFocusHandler
								  }
								: {};

							const tabEvents = options
								? {
										onClick: event => {}
								  }
								: {
										onClick: event =>
											onChange(event, { id: tabID, ...otherTabProps })
								  };

							return (
								<TabContainer
									key={tabID || index}
									sliderHeight={height}
									{...tabContainerEvents}
								>
									<Tab
										collapsible={options}
										secondaryColor={secondaryColor}
										sliderHeight={height}
										{...tabEvents}
										active={activeTabID === tabID}
									>
										{typeof TabElement === 'string' ? (
											TabElement
										) : (
											<TabElement />
										)}
									</Tab>

									{options ? (
										<Options left={focussedTabLeft} showOptions={showOptions}>
											{options.map(
												(
													{
														id: optionID,
														component: OptionElement,
														...otherOptionProps
													},
													optionIndex
												) => (
													<Option
														secondaryColor={secondaryColor}
														sliderHeight={height}
														onClick={event =>
															onChange(
																event,
																{ id: tabID, ...otherTabProps },
																{ id: optionID, ...otherOptionProps }
															)
														}
														tabIndex={showOptions ? '0' : '-1'}
														key={optionID || optionIndex}
													>
														{typeof OptionElement === 'string' ? (
															OptionElement
														) : (
															<OptionElement />
														)}
													</Option>
												)
											)}
										</Options>
									) : null}
								</TabContainer>
							);
						}
					)}
				</TabContainers>

				<IconButton
					align="right"
					sliderHeight={height}
					primaryColor={primaryColor}
					secondaryColor={secondaryColor}
					onClick={event =>
						event.target.previousSibling.scrollBy({
							left: 250,
							top: 0,
							behavior: 'smooth'
						})
					}
				/>
			</Wrapper>
		);
	}
}