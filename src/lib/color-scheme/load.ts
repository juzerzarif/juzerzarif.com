import type { LayoutServerLoadEvent } from '../../routes/$types';
import { COLOR_CONFIG_COOKIE_KEY } from './constants';

export function loadColorScheme(event: LayoutServerLoadEvent): App.ColorSchemeConfig {
	const colorSchemeCookie = event.cookies.get(COLOR_CONFIG_COOKIE_KEY);
	const savedColorSchemeConfig = JSON.parse(
		colorSchemeCookie || 'null'
	) as App.ColorSchemeConfig | null;

	return savedColorSchemeConfig || { system: 'light' };
}
