import React, { Component } from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const Wrapper = styled.div`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
`;

const Headers = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Header = styled.div`
	width: ${({ headerWidth }) => headerWidth};
	padding: 10px;
	border-bottom: 1px solid
		${({ theme, active }) =>
			active
				? getComputedStyleAttributeValue(theme.primaryColor, '#2F58F2')
				: 'rgba(151, 151, 151, 0.2)'};
	outline: 0;

	text-align: center;
	font-size: 16px;
	font-weight: ${({ active }) => (active ? 'bold' : 'regular')};
	word-wrap: break-word;
	color: ${({ theme, active }) =>
		active
			? getComputedStyleAttributeValue(theme.primaryColor, '#2F58F2')
			: 'rgba(0, 0, 0, 0.75)'};

	cursor: pointer;

	:hover,
	:focus {
		background-color: #fafafa;
	}

	@media (max-width: 600px) {
		padding: 10px 3px;

		font-size: 14px;
	}
`;

export default class Tabs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTabIndex: props.defaultActiveTabIndex
		};

		this.tabHeaderClickHandler = this.tabHeaderClickHandler.bind(this);
		this.tabHeaderKeyDownHandler = this.tabHeaderKeyDownHandler.bind(this);
	}

	tabHeaderClickHandler(event, index) {
		const { headers, onChange } = this.props;

		this.setState({
			activeTabIndex: index
		});

		if (onChange) {
			onChange({ target: { value: headers[index] } });
		}
	}

	tabHeaderKeyDownHandler(event, index) {
		const { headers, onChange } = this.props;

		const key = event.key || event.which || event.key;

		if (key === 'Enter' || key === 13) {
			this.setState({
				activeTabIndex: index
			});

			if (onChange) {
				onChange({ target: { value: headers[index] } });
			}
		}
	}

	render() {
		const { children, headers, maxPerRow, ...otherProps } = this.props;
		const { activeTabIndex } = this.state;

		const computedMaxPerRow = maxPerRow || 5;
		const computedHeaderWidth =
			100 /
				(headers.length >= computedMaxPerRow
					? computedMaxPerRow
					: headers.length) +
			'%';

		return (
			<Wrapper {...otherProps}>
				<Headers>
					{headers.map((header, index) => (
						<Header
							tabIndex="0"
							headerWidth={computedHeaderWidth}
							key={header}
							active={(activeTabIndex || 0) === index}
							onClick={event => this.tabHeaderClickHandler(event, index)}
							onKeyDown={event => this.tabHeaderKeyDownHandler(event, index)}
						>
							{header}
						</Header>
					))}
				</Headers>
				{children.map((child, index) =>
					index === (activeTabIndex || 0) ? child : null
				)}
			</Wrapper>
		);
	}
}
