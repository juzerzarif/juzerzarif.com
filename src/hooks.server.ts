import { nanoid } from 'nanoid';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = function ({ event, resolve }) {
	event.locals.sessionId = nanoid();
	return resolve(event);
};
