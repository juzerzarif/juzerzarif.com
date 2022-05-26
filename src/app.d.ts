/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	type ColorScheme = 'light' | 'dark';

	interface ColorSchemeConfig {
		user?: ColorScheme;
		system: ColorScheme;
	}

	// interface Locals {}
	// interface Platform {}
	interface Session {
		colorSchemeConfig: ColorSchemeConfig;
	}
	// interface Stuff {}
}
