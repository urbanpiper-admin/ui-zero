import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	&,
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	display: flex;
	flex-wrap: wrap;

	position: fixed;
	top: 0;
	left: 0;
	z-index: ${({ zIndex }) => zIndex || '10000'};
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
	overflow-x: hidden;
	overflow-y: auto;

	height: 100%;
	width: 100%;
	padding: ${({ align, showModal }) =>
		align === 'left' || align === 'right' ? '0' : '5vh 5%'};

	> * {
		${({ align }) => {
			switch (align) {
				case 'left':
					return 'margin: auto auto auto 0';
				case 'right':
					return 'margin: auto 0 auto auto';
				default:
					return 'margin: auto';
			}
		}}
	}

	pointer-events: ${({ showModal }) => (showModal ? 'auto' : 'none')};
`;

const ModalBG = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${({ zIndex }) => '-1'};
	/* position: absolute;
	top: 0;
	left: 0; */

	height: 100%;
	width: 100%;

	background-color: #000000;
	opacity: ${({ showModal }) => (showModal ? '0.5' : '0')}
	pointer-events: ${({ showModal }) => (showModal ? 'auto' : 'none')};
	pointer-events: none;;

	${({ sliding, showModal }) =>
		sliding
			? `
						transition: opacity 0.3s ease 0s;
					`
			: ''}
`;

const ModalContent = styled.div`
  box-sizing: border-box;

  *, *::before, *::after {
    box-sizing: border-box;
  } 

	
	/* ::-webkit-scrollbar {
		width: 5px;
	}

	::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	}

	::-webkit-scrollbar-thumb {
		background-color: hsl(0, 0%, 50%);
		outline: 1px solid hsl(210, 13%, 50%);
	} */

	/* position: fixed; */
	/* position: relative; */
	/* top: 50%; */
	/* ${({ align, modalWidth, showModal }) => {
		switch (align) {
			case 'left':
				return `left: -${modalWidth};`;
			// return `left: -${showModal ? '0' : width}`;
			case 'right':
				return `right: -${modalWidth};`;
			// return `right: -${showModal ? '0' : width}`;
			default:
				return `left: ${showModal ? '50%' : `-${modalWidth}`}`;
		}
	}} */

	
	z-index: ${({ zIndex }) => '100'};
	/* overflow: auto; */

	height: ${({ modalHeight, align }) => modalHeight};
	/* max-height: ${({ align }) =>
		align === 'left' || align === 'right' ? '100%' : '90%'}; */
	width: ${({ modalWidth }) => modalWidth};
	/* max-width: ${({ align }) =>
		align === 'left' || align === 'right' ? '100%' : '90%'}; */
	${({ align, modalWidth }) => {
		switch (align) {
			case 'left':
				// extra 5px to hide shadow
				return `margin: auto auto auto 0; left: calc(-${modalWidth} - 5px);`;
			case 'right':
				return `margin: auto 0 auto auto; right: calc(-${modalWidth} - 5px);`;
			default:
				return 'margin: auto;';
		}
	}}

	position: relative;
	
	background-color: white;
	box-shadow: 0 0 10px 0 hsla(0, 0%, 0%, 0.3);

	${({ align, sliding, showModal }) => {
		if (align !== 'left' && align !== 'right') {
			return `
								transform: translateX(${showModal ? '0' : '-200vw'});
								${sliding ? 'transition: transform 0.3s ease 0s;' : ''}
							`;
		} else {
			// align === 'right'
			let transformStyles = '';
			if (showModal) {
				transformStyles = `transform: translateX(${
					align === 'left' ? '100%' : '-100%'
				});`;
			} else {
				transformStyles = '';
			}

			return `
								${transformStyles}
								${sliding ? 'transition: transform 0.3s ease 0s;' : ''}
							`;
		}
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
			height = 'auto',
			width = '400px',
			zIndex = '10000',
			sliding,
			onClose,
			...otherProps
		} = this.props;

		return (
			<Container
				zIndex={zIndex}
				align={align}
				showModal={showModal}
				onClick={onClose}
			>
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
					onClick={event => event.stopPropagation()}
					{...otherProps}
				>
					{children}
				</ModalContent>
			</Container>
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
