import React from 'react';
import styled, { keyframes } from 'styled-components';

const Animation = keyframes`
	from {
		background-position: -50%;
	}

	to {
		background-position: 150%;
	}
`;

const ShimmerElement = styled.div`
	height: ${({ shimmerHeight }) => shimmerHeight};
	width: ${({ shimmerWidth }) => shimmerWidth};

	background: #f6f6f6;

	background-image: linear-gradient(
		to right,
		#f6f6f6,
		#eeeeee 20%,
		#dddddd 50%,
		#eeeeee 80%,
		#f6f6f6
	);
	background-repeat: no-repeat;
	background-position: right;
	background-size: 50% 100%;

	animation: ${Animation} 1s ease 0s forwards infinite;
`;

function Shimmer({ height = '30px', width = '50%', ...otherProps }) {
	return (
		<ShimmerElement
			shimmerHeight={height}
			shimmerWidth={width}
			{...otherProps}
		/>
	);
}

export default Shimmer;
