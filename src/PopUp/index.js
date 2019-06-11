import React from 'react';
import styled from 'styled-components';

import Modal from '../Modal';

const Message = styled.div`
	padding: 20px;
	border-top: 5px solid
		${({ primaryColor, theme }) => primaryColor || theme.primaryColor};

	text-align: center;
	font-size: 16px;
	color: ${({ fontColor }) => fontColor};
`;

export default function PopUp({
	primaryColor,
	color,
	visible,
	message,
	onClose,
	...otherProps
}) {
	return (
		<Modal width="450px" showModal={visible} onClose={onClose} {...otherProps}>
			<Message primaryColor={primaryColor} fontColor={color}>
				{message}
			</Message>
		</Modal>
	);
}
