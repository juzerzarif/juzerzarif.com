const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			colors: {
				lgray: colors.stone,
				dgray: colors.zinc
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
