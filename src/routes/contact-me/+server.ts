import { Readable } from 'stream';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

interface FormspreeError {
	code: string;
	field: string;
	message: string;
}

async function verifyRecaptchaToken(token: string) {
	const postParams = { secret: env.GRECAPTCHA_SECRET_KEY, response: token };
	const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'post',
		body: new URLSearchParams(Object.entries(postParams)).toString(),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	if (!response.ok) {
		throw response;
	}

	const { success } = (await response.json()) as { success: boolean };
	if (!success) {
		console.error('GRecaptcha response:\n', response);
		throw new Error('Recaptcha verification failed');
	}
}

export const POST: RequestHandler = async (event) => {
	const formData = await event.request.formData();
	try {
		await verifyRecaptchaToken(formData.get('g-recaptcha-response') as string);

		const response = await fetch(env.FORMSPREE_ENDPOINT as string, {
			method: 'post',
			body: formData,
			headers: { Accept: 'application/json' }
		});
		if (response.ok) {
			return new Response(undefined, { status: 201 });
		} else {
			console.error(response);
			const responseData = (await response.json()) as { errors?: FormspreeError[] };
			const errorText = responseData.errors?.map((err) => err.message).join(', ');
			return new Response(Readable.from(errorText || 'Unknown error'), { status: response.status });
		}
	} catch (err) {
		console.error(err);
		return new Response(Readable.from('Unknown error'), { status: 500 });
	}
};
