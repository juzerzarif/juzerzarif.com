import { derived, get, writable, type Writable } from 'svelte/store';
import { onMount } from 'svelte';
import { serialize as serializeCookie } from 'cookie';

import { session } from '$app/stores';

import { COLOR_CONFIG_COOKIE_KEY } from './constants';

export function getCurrentColorScheme(): Writable<App.ColorScheme> {
	const { colorSchemeConfig } = get(session);
	const configStore = writable<App.ColorSchemeConfig>(colorSchemeConfig);
	const schemeStore = derived(configStore, ($config) => $config.user || $config.system);

	const updateConfigStore = (newConfig: Partial<App.ColorSchemeConfig>) => {
		configStore.update((prevConfig) => ({ ...prevConfig, ...newConfig }));
	};

	onMount(() => {
		const configStoreUnsubscribe = configStore.subscribe((config) => {
			document.cookie = serializeCookie(COLOR_CONFIG_COOKIE_KEY, JSON.stringify(config), {
				expires: new Date(Date.now() + 8640000000) // expire in a 100 days from now
			});
		});

		const handleDarkMode = (query: MediaQueryList | MediaQueryListEvent) => {
			const colorScheme = query.matches ? 'dark' : 'light';
			configStore.update((prevConfig) => ({ ...prevConfig, system: colorScheme }));
		};
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		handleDarkMode(darkModeQuery);
		darkModeQuery.addEventListener('change', handleDarkMode);

		return () => {
			configStoreUnsubscribe();
			darkModeQuery.removeEventListener('change', handleDarkMode);
		};
	});

	return {
		...schemeStore,
		set: (userScheme) => updateConfigStore({ user: userScheme }),
		update: (updater) => updateConfigStore({ user: updater(get(schemeStore)) })
	};
}
