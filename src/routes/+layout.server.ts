import { loadColorScheme } from '$lib/color-scheme';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = function (event) {
	return {
		sessionId: event.locals.sessionId,
		colorSchemeConfig: loadColorScheme(event)
	};
};
