import React from 'react';
import styled, { keyframes } from 'styled-components';

const ProgressAnimation = keyframes`
	from {
		transform: scaleX(0);
	}

	to {
		transform: scaleX(1);
	}
`;

const ProgressBarElement = styled.div`
	height: 5px;
	width: 100%;

	background-color: ${({ theme, primaryColor }) =>
		primaryColor || theme.primaryColor};

	transform: scaleX(0);
	transform-origin: left;

	animation: ${ProgressAnimation} 2s ease 0s forwards infinite;
`;

function ProgressBar({ primaryColor, ...otherProps }) {
	return <ProgressBarElement primaryColor={primaryColor} {...otherProps} />;
}

export default ProgressBar;
