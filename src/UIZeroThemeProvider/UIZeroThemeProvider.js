import React from 'react';
import { ThemeProvider } from 'styled-components';

export default function ZeroUIThemeProvider({ children, theme = {} }) {
	const defaultTheme = {
		primaryColor: '#2F58F2',
		secondaryColor: '#FF425C'
	};

	const computedTheme = {
		...defaultTheme,
		...theme
	};

	return <ThemeProvider theme={computedTheme}>{children}</ThemeProvider>;
}
