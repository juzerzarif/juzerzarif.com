import cookie from 'js-cookie';
import { onMount } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';

import { session } from '$app/stores';

export function getCurrentColorScheme(): Writable<App.ColorScheme> {
	const initialColorScheme = get(session).colorScheme;
	const colorSchemeStore = writable<App.ColorScheme>(initialColorScheme || 'light');

	onMount(() => {
		const storeUnsubscribe = colorSchemeStore.subscribe((scheme) => {
			cookie.set('user-color-scheme', scheme, { expires: 1000 });
		});
		const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
		// Respond to system color scheme if there is no existing user selection
		if (!initialColorScheme) {
			colorSchemeStore.set(darkMode.matches ? 'dark' : 'light');
		}

		return storeUnsubscribe;
	});

	return colorSchemeStore;
}
