/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			colors: {
				// Terminal color schemes
				terminalLt: {
					// Solarized Light
					fg: '#657B83',
					bg: '#FDF6E3',
					black: '#073642',
					red: '#DC322F',
					green: '#859900',
					yellow: '#B58900',
					blue: '#268BD2',
					magenta: '#D33682',
					cyan: '#2AA198',
					white: '#EEE8D5'
				},
				terminalDk: {
					// Molokai
					fg: '#C7C7C7',
					bg: '#171717',
					black: '#171717',
					red: '#FE4386',
					green: '#A6E32C',
					yellow: '#E6DA73',
					blue: '#0094D9',
					magenta: '#9B37FF',
					cyan: '#51B7D9',
					white: '#C7C7C7'
				}
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
