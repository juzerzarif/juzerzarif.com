import { Readable } from 'stream';
import type { RequestHandler } from '@sveltejs/kit';

interface FormspreeError {
	code: string;
	field: string;
	message: string;
}

export const POST: RequestHandler = async (event) => {
	try {
		const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
			method: 'post',
			body: await event.request.formData(),
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
