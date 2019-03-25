import React, { Component } from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

// TODO: Rewrite Modal to improve animation performance

const ModalBG = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${({ zIndex }) => getComputedStyleAttributeValue(zIndex, '10000')};

	height: 100vh;
	width: 100vw;

	background-color: hsla(
		0,
		0%,
		0%,
		${({ showModal }) => (showModal ? '0.5' : '0')}
	);

	${({ sliding, showModal }) =>
		`transform: translateX(${showModal ? '0' : '-100%'});
    ${
			sliding
				? `
				transition: background-color 0.3s ease 0s,
					transform 0s ease ${showModal ? '0' : '0.3'}s;`
				: ''
		}`}
`;

const ModalContent = styled.div`
  box-sizing: border-box;

  *, *::before, *::after {
    box-sizing: border-box;
  } 

	
	::-webkit-scrollbar {
		width: 5px;
	}

	::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	}

	::-webkit-scrollbar-thumb {
		background-color: hsl(0, 0%, 50%);
		outline: 1px solid hsl(210, 13%, 50%);
	}

	position: fixed;
	top: 50%;
	${({ align, modalWidth, showModal }) => {
		const width = getComputedStyleAttributeValue(modalWidth, '400px');

		switch (align) {
			case 'left':
				return `left: -${showModal ? '0' : width}`;
			case 'right':
				return `right: -${showModal ? '0' : width}`;
			default:
				return `left: ${showModal ? '50%' : `-${width}`}`;
		}
	}}
	z-index: ${({ zIndex }) => getComputedStyleAttributeValue(zIndex, '10000')};
	overflow: auto;

	height: ${({ modalHeight, align }) =>
		getComputedStyleAttributeValue(modalHeight, 'auto')};
	max-height: ${({ align }) =>
		align === 'left' || align === 'right' ? '100%' : '90%'};
	width: ${({ modalWidth }) =>
		getComputedStyleAttributeValue(modalWidth, '400px')};
	max-width: ${({ align }) =>
		align === 'left' || align === 'right' ? '100%' : '90%'};

	background-color: white;
	box-shadow: 0 0 10px 0 hsla(0, 0%, 0%, 0.3);

	${({ align, sliding, showModal }) => {
		let modalXTranslation = {
			whenVisible: '',
			whenHidden: ''
		};

		switch (align) {
			case 'left':
				modalXTranslation = {
					whenVisible: '0',
					whenHidden: '-100%'
				};
				break;
			case 'right':
				modalXTranslation = {
					whenVisible: '0',
					whenHidden: '100%'
				};
				break;
			default:
				modalXTranslation = {
					whenVisible: '-50%',
					whenHidden: '-100vw'
				};
				break;
		}
		return sliding
			? `transform: translate(${
					showModal
						? modalXTranslation.whenVisible
						: modalXTranslation.whenHidden
			  }, -50%);
				transition: left 0.3s ease 0s, right 0.3s ease 0s, transform 0.3s ease 0s;`
			: 'transform: translate(-50%, -50%)';
	}}
`;

export default class Modal extends Component {
	constructor(props) {
		super(props);

		this.keyDownHandler = this.keyDownHandler.bind(this);
	}

	keyDownHandler(event) {
		const { onClose, showModal } = this.props;

		const key = event.keyCode || event.which || event.key;

		if ((key === 27 || key === 'Escape') && showModal) {
			onClose();
		}
	}

	render() {
		const {
			children,
			align,
			showModal,
			height,
			width,
			zIndex,
			sliding,
			onClose,
			...otherProps
		} = this.props;

		return (
			<div>
				<ModalBG
					zIndex={zIndex}
					sliding={sliding}
					showModal={showModal}
					onClick={onClose}
				/>
				<ModalContent
					zIndex={zIndex}
					modalHeight={height}
					modalWidth={width}
					align={align}
					sliding={sliding}
					showModal={showModal}
					{...otherProps}
				>
					{children}
				</ModalContent>
			</div>
		);
	}

	componentDidMount() {
		const { showModal } = this.props;

		if (showModal) {
			window.addEventListener('keydown', this.keyDownHandler);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { showModal } = this.props;

		if (showModal) {
			window.addEventListener('keydown', this.keyDownHandler);
		} else {
			window.removeEventListener('keydown', this.keyDownHandler);
		}
	}

	componentWillUnmount() {
		const { showModal } = this.props;

		if (showModal) {
			window.removeEventListener('keydown', this.keyDownHandler);
		}
	}
}
