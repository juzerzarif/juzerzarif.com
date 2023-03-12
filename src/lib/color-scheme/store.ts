import { derived, get, writable, type Writable } from 'svelte/store';
import { serialize as serializeCookie } from 'cookie';

import { page } from '$app/stores';

import { COLOR_CONFIG_COOKIE_KEY } from './constants';

const colorSchemeConfig = {
	session: '',
	store: null as unknown as Writable<App.ColorSchemeConfig>
};

export function getCurrentColorScheme() {
	const { colorSchemeConfig: sessionColorScheme, sessionId } = get(page).data;
	/**
	 * Recreate store on a new session. The server will see a new session id for each request and the
	 * client will only ever see one session id.
	 */
	const isSessionInitialized = colorSchemeConfig.session === sessionId;
	if (!isSessionInitialized) {
		colorSchemeConfig.session = sessionId;
		colorSchemeConfig.store = writable(sessionColorScheme);
	}

	const updateConfigStore = (newConfig: Partial<App.ColorSchemeConfig>) => {
		colorSchemeConfig.store.update((prevConfig) => ({ ...prevConfig, ...newConfig }));
	};

	if (typeof document !== 'undefined' && !isSessionInitialized) {
		colorSchemeConfig.store.subscribe((config) => {
			document.cookie = serializeCookie(COLOR_CONFIG_COOKIE_KEY, JSON.stringify(config), {
				expires: new Date(Date.now() + 8640000000) // expire in a 100 days from now
			});
		});

		const handleDarkMode = (query: MediaQueryList | MediaQueryListEvent) => {
			const colorScheme = query.matches ? 'dark' : 'light';
			updateConfigStore({ system: colorScheme });
		};
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		handleDarkMode(darkModeQuery);
		darkModeQuery.addEventListener('change', handleDarkMode);
	}

	return {
		colorScheme: derived(colorSchemeConfig.store, (config) => config.user || config.system),
		userSelection: {
			...derived(colorSchemeConfig.store, (config) => config.user),
			set: (scheme?: App.ColorScheme) => updateConfigStore({ user: scheme })
		} as Writable<App.ColorScheme | undefined>
	};
}
