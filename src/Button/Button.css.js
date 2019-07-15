const buttonStyles = `
	display: inline-flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	box-sizing: border-box;
	padding-right: 10px;
	padding-left: 10px;
	outline: none;
	font-size: 14px;
	transition: 180ms;
	cursor: pointer;
	user-select: none;

	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;

export default {
	buttonStyles
};
