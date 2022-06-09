const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const purgecss = require('@fullhuman/postcss-purgecss');
const tailwindcss = require('tailwindcss');

module.exports = {
	plugins: [
		postcssNested,
		autoprefixer,
		tailwindcss,
		purgecss({
			content: ['./src/**/*.{html,js,ts,svelte}'],
			// Only target the animate.css classes, tailwind will take care of the rest
			safelist: [/^(?!.*animate__[a-zA-Z]+).*/],
			keyframes: true
		})
	]
};
