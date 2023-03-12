// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		type ColorScheme = 'light' | 'dark';

		interface ColorSchemeConfig {
			user?: ColorScheme;
			system: ColorScheme;
		}

		// interface Error {}

		interface Locals {
			sessionId: string;
		}

		interface PageData {
			sessionId: string;
			colorSchemeConfig: ColorSchemeConfig;
		}

		// interface Platform {}
	}
}

export {};
