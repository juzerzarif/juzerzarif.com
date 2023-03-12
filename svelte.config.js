import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({}),

	kit: {
		adapter: adapter(),
		alias: {
			$assets: 'src/assets'
		},
		csp: {
			mode: 'auto',
			directives: {
				['script-src']: [
					'self',
					'https://www.google.com/recaptcha/api.js',
					'https://www.gstatic.com'
				]
			}
		},
		env: { publicPrefix: 'PUBLIC_' },
		typescript: {
			config: (tsConfig) => ({
				...tsConfig,
				include: ['../src/vite-env-override.d.ts', ...tsConfig.include]
			})
		}
	}
};

export default config;
