export default function getStateStyles(
	styleOnHover,
	styleOnActive,
	styleOnFocus
) {
	function getConvertedStateStyle(styleObject) {
		const styles = styleObject
			? Object.keys(styleObject).reduce(
					(convertedStyle, styleAttribute) =>
						`${convertedStyle}
						${styleAttribute}: ${styleObject[styleAttribute]};\n`,
					''
			  )
			: '';

		return styles;
	}

	return `
		${
			styleOnHover
				? `:hover:not(:disabled) {
			${getConvertedStateStyle(styleOnHover)}
		}`
				: ''
		}
		
		${
			styleOnFocus
				? `:focus:not(:disabled) {
			${getConvertedStateStyle(styleOnFocus)}
		}`
				: ''
		}
		
		${
			styleOnActive
				? `:active:not(:disabled) {
			${getConvertedStateStyle(styleOnActive)}
		}`
				: ''
		}
	`;
}
