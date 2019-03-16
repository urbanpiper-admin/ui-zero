import React from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const Container = styled.div`
	position: relative;

	font-family: 'Source Sans Pro';
`;

const Input = styled.input`
	height: 34px;
	width: ${({ width }) => getComputedStyleAttributeValue(width, 'auto')};
	border-width: 0;
	border-bottom: 1px solid #c2c2c2;
	outline: 0;

	font-size: 14px;
`;

const Label = styled.label`
	position: absolute;
	bottom: 10px;
	left: 0;
	opacity: 0.4;

	font-size: 12px;
	font-weight: bold;

	transition: transform 0.15s ease 0s;
	cursor: text;

	${Input}:focus + & {
		opacity: 0.6;

		transform: translateY(-24px);
	}
`;

function TextField({ width, placeholder, ...otherProps }) {
	function labelClickHandler(event) {
		event.target.previousSibling.focus();
	}

	return (
		<Container>
			<Input width={width} {...otherProps} />

			<Label onClick={labelClickHandler}>{placeholder}</Label>
		</Container>
	);
}

export default TextField;
