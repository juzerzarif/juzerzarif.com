import { sequence } from '@sveltejs/kit/hooks';

import { handleCsrf } from '$lib/csrf';

export default sequence(handleCsrf);
