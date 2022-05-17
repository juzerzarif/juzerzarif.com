/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	type ColorScheme = 'light' | 'dark';
	// interface Locals {}
	// interface Platform {}
	interface Session {
		colorScheme?: ColorScheme;
	}
	// interface Stuff {}
}
