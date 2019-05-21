import React, { Component } from 'react';
import styled from 'styled-components';

import AspectRatioBox from '../AspectRatioBox';
import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const Container = styled.div`
    width: ${({ imageWidth }) => {
			const computedWidth = getComputedStyleAttributeValue(imageWidth, '100%');
			const [extractedWidth, unit] = computedWidth.split(/(%|px)/);
			return extractedWidth + unit;
		}}
    background-image: url('${({ imagePlaceholder }) => imagePlaceholder}');
    background-size: cover;
`;

const Img = styled.img`
	opacity: ${({ hasImageLoaded }) => (hasImageLoaded ? 1 : 0)};
`;

export default class Image extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imageSrc: props.src,
			hasImageLoaded: false
		};

		this.imageLoadHandler = this.imageLoadHandler.bind(this);
		this.imageErrorHandler = this.imageErrorHandler.bind(this);

		this.containerRef = React.createRef();
	}

	imageLoadHandler(event) {
		this.setState({
			hasImageLoaded: true
		});
	}

	imageErrorHandler(event) {
		const { fallback } = this.props;

		this.setState({
			imageSrc: fallback
		});
	}

	render() {
		const {
			src,
			alt,
			ratio,
			width,
			height,
			placeholder,
			fallback,
			...otherProps
		} = this.props;

		const { imageSrc, hasImageLoaded } = this.state;

		return (
			<Container imageWidth={width} imagePlaceholder={placeholder}>
				<AspectRatioBox ratio={ratio}>
					<Img
						{...otherProps}
						src={imageSrc}
						alt={alt}
						width="100%"
						onLoad={this.imageLoadHandler}
						onError={this.imageErrorHandler}
						hasImageLoaded={hasImageLoaded}
					/>
				</AspectRatioBox>
			</Container>
		);
	}
}
