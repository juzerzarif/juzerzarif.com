import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import svg from '@poppanator/sveltekit-svg';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({ postcss: true }),

	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				['script-src']: ['self']
			}
		},
		vite: {
			plugins: [
				svg({
					svgoOptions: {
						plugins: [
							{
								name: 'preset-default',
								params: { overrides: { removeViewBox: false } }
							},
							'removeDimensions'
						]
					}
				})
			]
		}
	}
};

export default config;
