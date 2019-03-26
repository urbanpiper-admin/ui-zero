import React from 'react';
import styled from 'styled-components';

import Image from '../Image/Image';
import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const Wrapper = styled.div`
	*,
	*::after,
	*::before {
		box-sizing: border-box;
	}

	width: ${({ cardWidth }) =>
		getComputedStyleAttributeValue(cardWidth, '100%')};
	box-shadow: 0 0 5px 0 hsla(0, 0%, 0%, 0.25);

	color: #231f20;
`;

const Body = styled.div`
	padding: 20px;
`;

const Card = ({
	children,
	width,
	imageRatio,
	imageSrc,
	imageAlt,
	imagePlaceholder,
	imageFallback,
	...otherProps
}) => {
	return (
		<Wrapper cardWidth={width} {...otherProps}>
			<Image
				ratio={imageRatio}
				width="100%"
				src={imageSrc}
				alt={imageAlt}
				placeholder={imagePlaceholder}
				fallback={imageFallback}
			/>
			<Body>{children}</Body>
		</Wrapper>
	);
};

export default Card;
