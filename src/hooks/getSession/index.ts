import type { GetSession } from '@sveltejs/kit';

import { getUserColorScheme } from './getUserColorScheme';

const getSession: GetSession = (event) => {
	return {
		colorScheme: getUserColorScheme(event)
	};
};

export default getSession;
