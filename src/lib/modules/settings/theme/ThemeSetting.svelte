<script lang="ts">
	import { getCurrentColorScheme } from '$lib/color-scheme';

	import SettingsItem from '../shared/SettingsItem.svelte';

	import DarkMode from './darkmode.svg';
	import LightMode from './lightmode.svg';
	import System from './system.svg';
	import ThemeButton from './ThemeButton.svelte';

	const { userSelection } = getCurrentColorScheme();

	const handleSchemeChange = (colorScheme?: App.ColorScheme) => {
		$userSelection = colorScheme;
	};
</script>

<SettingsItem>
	<fieldset slot="label" class="contents">
		<legend class="self-end pb-5">Theme:</legend>
		<div class="flex gap-4">
			<ThemeButton
				label="Light"
				selected={$userSelection === 'light'}
				on:click={() => handleSchemeChange('light')}
			>
				<LightMode />
			</ThemeButton>
			<ThemeButton
				label="Dark"
				selected={$userSelection === 'dark'}
				on:click={() => handleSchemeChange('dark')}
			>
				<DarkMode />
			</ThemeButton>
			<ThemeButton
				label="System"
				selected={$userSelection === undefined}
				on:click={() => handleSchemeChange(undefined)}
			>
				<System />
			</ThemeButton>
		</div>
	</fieldset>
</SettingsItem>
