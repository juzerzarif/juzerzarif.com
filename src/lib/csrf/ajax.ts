import { CSRF_TOKEN_HEADER } from './constants';

export function getCsrfToken(): { [key in typeof CSRF_TOKEN_HEADER]: string } {
	const csrfMetaTag = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
	const csrfToken = csrfMetaTag.content;

	return { [CSRF_TOKEN_HEADER]: csrfToken };
}
