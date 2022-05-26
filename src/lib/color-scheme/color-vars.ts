import {
	SYSTEM_DARK_COLORS,
	SYSTEM_LIGHT_COLORS,
	TERMINAL_DARK_COLORS,
	TERMINAL_LIGHT_COLORS
} from './constants';

function buildCssVars(prefix: string, colors: Record<string, string>) {
	return Object.fromEntries(
		Object.entries(colors).map(([name, value]) => [`--${prefix}-${name}`, value])
	);
}

export function getSiteColorVars(scheme: App.ColorScheme): string {
	const terminalColors = scheme === 'dark' ? TERMINAL_DARK_COLORS : TERMINAL_LIGHT_COLORS;
	const systemColors = scheme === 'dark' ? SYSTEM_DARK_COLORS : SYSTEM_LIGHT_COLORS;

	const siteColors = {
		...buildCssVars('terminal', terminalColors),
		...buildCssVars('system', systemColors)
	};
	return Object.entries(siteColors).reduce(
		(styleStr, [varName, value]) => `${styleStr} ${varName}: ${value};`,
		''
	);
}
