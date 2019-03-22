import React from 'react';
import styled from 'styled-components';

const SwitchComponent = styled.div`
	display: inline-block;

	position: relative;

	box-sizing: border-box;
	height: 31px;
	width: 55px;
	border-radius: 18px;

	background-color: ${({ enabled }) => (enabled ? '#3CAE4D' : '#B8C2C8')};

	transition: background-color 0.18s ease 0s;
	cursor: pointer;

	::after {
		content: '';

		position: absolute;
		top: 50%;
		left: 0;

		box-sizing: border-box;
		height: 21px;
		width: 21px;
		border-radius: 50%;

		background-color: white;

		transform: translate(${({ enabled }) => (enabled ? '29px' : '5px')}, -50%);

		transition: transform 0.18s ease 0s;
	}
`;

function Switch({ enabled, onToggle, ...otherProps }) {
	return (
		<SwitchComponent enabled={enabled} {...otherProps} onClick={onToggle} />
	);
}

export default Switch;
