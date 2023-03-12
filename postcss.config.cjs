const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const tailwindcss = require('tailwindcss');
const tailwindcssNesting = require('tailwindcss/nesting');

module.exports = {
	plugins: [
		autoprefixer,
		tailwindcssNesting,
		tailwindcss,
		purgecss({
			content: ['./src/**/*.{html,js,ts,svelte}'],
			// Only target the animate.css classes, tailwind will take care of the rest
			safelist: [/^(?!.*animate__[a-zA-Z]+).*/],
			keyframes: true
		})
	]
};
