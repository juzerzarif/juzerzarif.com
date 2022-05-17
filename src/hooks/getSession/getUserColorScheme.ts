import { parse as parseCookies } from 'cookie';
import type { GetSession } from '@sveltejs/kit';

type Event = Parameters<GetSession>[0];

export function getUserColorScheme(event: Event) {
	const cookies = parseCookies(event.request.headers.get('Cookie') || '');
	const colorScheme = cookies['user-color-scheme'] as App.ColorScheme | undefined;
	return colorScheme;
}
