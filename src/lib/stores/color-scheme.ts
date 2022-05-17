import { get, writable, type Writable } from 'svelte/store';
import { onMount } from 'svelte';
import { serialize as serializeCookie } from 'cookie';

import { session } from '$app/stores';

export function getCurrentColorScheme(): Writable<App.ColorScheme> {
	const initialColorScheme = get(session).colorScheme;
	const colorSchemeStore = writable<App.ColorScheme>(initialColorScheme || 'light');

	onMount(() => {
		const storeUnsubscribe = colorSchemeStore.subscribe((scheme) => {
			document.cookie = serializeCookie('user-color-scheme', scheme, {
				expires: new Date(2100, 12)
			});
		});
		// Respond to system color scheme if there is no existing user selection
		if (!initialColorScheme) {
			const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
			colorSchemeStore.set(darkModeQuery.matches ? 'dark' : 'light');
		}

		return storeUnsubscribe;
	});

	return colorSchemeStore;
}
