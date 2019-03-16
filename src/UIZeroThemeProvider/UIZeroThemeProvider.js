import React from 'react';
import { ThemeProvider } from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

export default function ZeroUIThemeProvider({ children, theme }) {
	const computedTheme = {
		primaryColor: getComputedStyleAttributeValue(
			theme && theme.primaryColor,
			'#2F58F2'
		),
		secondaryColor: getComputedStyleAttributeValue(
			theme && theme.secondaryColor,
			'#FF425C'
		)
	};

	return <ThemeProvider theme={computedTheme}>{children}</ThemeProvider>;
}
