import { getCsrfToken } from '$lib/csrf';

/**
 * Simple wrapper around fetch to add some default fields
 */
export const fetch: typeof window.fetch = (input, init) => {
	const csrfHeader = getCsrfToken();
	return window.fetch(input, {
		...init,
		headers: { ...(init?.headers as Record<string, string>), ...csrfHeader }
	});
};
