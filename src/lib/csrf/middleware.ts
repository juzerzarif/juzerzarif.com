import * as cheerio from 'cheerio';
import CryptoJS from 'crypto-js';
import { nanoid } from 'nanoid';
import { parse as parseCookie, serialize as serializeCookie } from 'cookie';
import type { Handle } from '@sveltejs/kit';

import { CSRF_HASH_COOKIE, CSRF_TOKEN_FIELD, CSRF_TOKEN_HEADER } from './constants';

function generateTokenHash(token: string) {
	return CryptoJS.HmacSHA256(token, import.meta.env.VITE_CSRF_PASSPHRASE).toString();
}

const injectCsrfToken: Handle = async ({ event, resolve }) => {
	const token = nanoid();
	const tokenHash = generateTokenHash(token);

	const response = await resolve(event, {
		transformPage: ({ html }) => {
			const $ = cheerio.load(html);
			$('head').append(`
				<meta name="csrf-param" content="${CSRF_TOKEN_HEADER}">
        <meta name="csrf-token" content="${token}">
			`);
			$('form').each((_, el) => {
				$(el).append(`<input type="hidden" name="${CSRF_TOKEN_FIELD}" value="${token}" />`);
			});
			return $.html();
		}
	});
	response.headers.set(
		'Set-Cookie',
		serializeCookie(CSRF_HASH_COOKIE, tokenHash, { httpOnly: true })
	);

	return response;
};

const verifyCsrfToken: Handle = async ({ event, resolve }) => {
	const request = event.request.clone();
	const csrfHash = parseCookie(request.headers.get('Cookie') || '')[CSRF_HASH_COOKIE];
	const csrfHeader = request.headers.get(CSRF_TOKEN_HEADER);
	const csrfFormValue = (await request.formData()).get(CSRF_TOKEN_FIELD) as string | null;
	const csrfToken = csrfHeader || csrfFormValue;

	if (csrfHash && csrfToken && csrfHash === generateTokenHash(csrfToken)) {
		return resolve(event);
	}
	return new Response(null, { status: 401 });
};

export const handleCsrf: Handle = ({ event, resolve }) => {
	const method = event.request.method.toLowerCase();
	const contentTypes = event.request.headers.get('Accept')?.split(',') || [];
	const omittedMethods = ['get', 'head', 'options'];

	if (method === 'get' && contentTypes.includes('text/html')) {
		return injectCsrfToken({ event, resolve });
	} else if (!omittedMethods.includes(method)) {
		return verifyCsrfToken({ event, resolve });
	}
	return resolve(event);
};
