import { nanoid } from 'nanoid';
import type { GetSession } from '@sveltejs/kit';

import { getColorSchemeConfig } from '$lib/color-scheme';

const getSession: GetSession = (event) => {
	return {
		id: nanoid(),
		colorSchemeConfig: getColorSchemeConfig(event)
	};
};

export default getSession;
