import { Readable } from 'stream';
import type { RequestHandler } from '@sveltejs/kit';

interface FormspreeError {
	code: string;
	field: string;
	message: string;
}

export const post: RequestHandler = async (event) => {
	try {
		const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
			method: 'post',
			body: await event.request.formData(),
			headers: { Accept: 'application/json' }
		});
		if (response.ok) {
			return { status: 201 };
		} else {
			console.error(response);
			const responseData = (await response.json()) as { errors?: FormspreeError[] };
			const errorText = responseData.errors?.map((err) => err.message).join(', ');
			return { status: response.status, body: Readable.from(errorText || 'Unknown error') };
		}
	} catch (err) {
		console.error(err);
		return { status: 500, body: Readable.from('Unknown error') };
	}
};
