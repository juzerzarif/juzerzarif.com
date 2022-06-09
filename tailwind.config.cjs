const defaultTheme = require('tailwindcss/defaultTheme');

function buildColorDict(colorVars) {
	return Object.fromEntries(
		Object.entries(colorVars).map(([colorName, varName]) => [
			colorName,
			({ opacityValue }) =>
				opacityValue === undefined
					? `rgb(var(${varName}))`
					: `rgb(var(${varName}) / ${opacityValue})`
		])
	);
}

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			colors: {
				terminal: buildColorDict({
					fg: '--terminal-fg',
					bg: '--terminal-bg',
					black: '--terminal-black',
					red: '--terminal-red',
					green: '--terminal-green',
					yellow: '--terminal-yellow',
					blue: '--terminal-blue',
					magenta: '--terminal-magenta',
					cyan: '--terminal-cyan',
					white: '--terminal-white',
					cursor: '--terminal-cursor'
				}),
				system: buildColorDict({
					fg: '--system-fg',
					bg: '--system-bg',
					toolbar: '--system-toolbar'
				})
			},
			fontFamily: {
				mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
