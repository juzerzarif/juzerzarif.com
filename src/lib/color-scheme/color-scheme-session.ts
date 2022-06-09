import { parse as parseCookies } from 'cookie';
import type { GetSession } from '@sveltejs/kit';

import { COLOR_CONFIG_COOKIE_KEY } from './constants';

type Event = Parameters<GetSession>[0];

export function getColorSchemeConfig(event: Event): App.Session['colorSchemeConfig'] {
	const cookie = parseCookies(event.request.headers.get('Cookie') || '')[COLOR_CONFIG_COOKIE_KEY];
	const colorSchemeConfig = JSON.parse(cookie || 'null') as App.ColorSchemeConfig | null;
	return colorSchemeConfig || { system: 'light' };
}
