import type { GetSession } from '@sveltejs/kit';

import { getColorSchemeConfig } from '$lib/color-scheme';

const getSession: GetSession = (event) => {
	return {
		colorSchemeConfig: getColorSchemeConfig(event)
	};
};

export default getSession;
