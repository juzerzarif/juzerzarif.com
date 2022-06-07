<script lang="ts">
	import SettingsSvg from '@material-design-icons/svg/filled/settings.svg';

	import Modal from '$lib/components/modal';
	import Settings from '$lib/modules/settings';
	import { getCurrentColorScheme, getSiteColorVars } from '$lib/color-scheme';
	import { page } from '$app/stores';
	import { WindowActionButtons } from '$lib/components/system';

	import '../app.css';

	const { colorScheme } = getCurrentColorScheme();
	$: siteColors = getSiteColorVars($colorScheme);

	const currentYear = new Date().getFullYear();

	const getUnixPath = (path: string) => `root@Juzer-Zarif : ~${path}`.replace(/\/$/, '');

	let settingsModalOpen = false;
	const handleSettingsToggle = () => {
		settingsModalOpen = !settingsModalOpen;
	};
</script>

<div data-site-root class="h-full w-full" class:dark={$colorScheme === 'dark'} style={siteColors}>
	<div class="flex h-full w-full flex-col">
		<!-- Title bar -->
		<div
			class="relative inline-flex h-8 items-center border-b border-b-system-bg bg-system-toolbar px-3 py-2 text-system-fg shadow-md dark:shadow-lg"
		>
			<WindowActionButtons class="absolute" />
			<span
				class="mx-20 flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-sm font-semibold opacity-70 md:mx-32"
				style:direction="rtl"
				aria-hidden="true"
			>
				{getUnixPath($page.url.pathname)}
				<!-- This is so the unix path is rendered ltr even when the direction is set to rtl -->
				<span aria-hidden="true" class="invisible">l</span>
			</span>
			<button
				class="absolute right-1.5 aspect-square h-full px-1 drop-shadow-xl"
				on:click={handleSettingsToggle}
				aria-label="Preferences"
			>
				<SettingsSvg class="fill-system-fg/80" />
			</button>
		</div>

		<!-- Scroll container -->
		<div class="flex-grow overflow-auto bg-terminal-bg font-mono text-terminal-fg">
			<slot />
			<footer class="mt-8 p-4 text-center text-xs text-terminal-fg/80 md:text-sm">
				Copyright &copy; {currentYear} Juzer Zarif. All rights reserved.
			</footer>
		</div>
	</div>
	<Modal open={settingsModalOpen}><Settings on:close={handleSettingsToggle} /></Modal>
</div>

<style lang="postcss" global>
	.dark-mode-switch {
		@apply absolute right-3 dark:border-terminal-fg;

		[data-switch-track] {
			@apply bg-transparent;
		}
	}
</style>
