<script lang="ts">
	import DarkModeSvg from '@material-design-icons/svg/filled/nightlight.svg';
	import LightModeSvg from '@material-design-icons/svg/filled/light_mode.svg';

	import Switch from '$lib/components/switch';
	import { getCurrentColorScheme, getSiteColorVars } from '$lib/color-scheme';
	import { page } from '$app/stores';

	import '../app.css';

	const { colorScheme, userSelection } = getCurrentColorScheme();
	$: siteColors = getSiteColorVars($colorScheme);

	const getUnixPath = (path: string) => `root@Juzer-Zarif : ~${path}`.replace(/\/$/, '');

	const handleDarkModeToggle = (event: CustomEvent<boolean>) => {
		const isDarkMode = event.detail;
		$userSelection = isDarkMode ? 'dark' : 'light';
	};
</script>

<div data-site-root class="h-full w-full" class:dark={$colorScheme === 'dark'} style={siteColors}>
	<div class="flex h-full w-full flex-col bg-terminal-bg text-terminal-fg">
		<!-- Title bar -->
		<div
			class="relative inline-flex h-8 items-center border-b border-b-system-bg bg-system-toolbar px-3 py-2 text-system-fg shadow-md dark:shadow-lg"
		>
			<div class="absolute inline-flex h-4 items-center">
				<div class="mr-2 aspect-square w-3 rounded-full bg-[#FF5F57]" />
				<div class="mr-2 aspect-square w-3 rounded-full bg-[#FEBC2E]" />
				<div class="aspect-square w-3 rounded-full bg-[#28C840]" />
			</div>
			<span
				class="mx-20 flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-sm font-semibold opacity-70 md:mx-32"
				style:direction="rtl"
				aria-hidden="true"
			>
				{getUnixPath($page.url.pathname)}
				<!-- This is so the unix path is rendered ltr even when the direction is set to rtl -->
				<span aria-hidden="true" class="invisible">l</span>
			</span>
			<Switch
				class="dark-mode-switch"
				type="button"
				aria-label="Toggle color scheme"
				value={$colorScheme === 'dark'}
				on:change={handleDarkModeToggle}
			>
				<DarkModeSvg class="h-[80%] -rotate-12 fill-sky-400" />
				<LightModeSvg class="ml-auto h-[90%] fill-yellow-600" />
			</Switch>
		</div>

		<!-- Scroll container -->
		<div class="flex-grow overflow-auto">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss" global>
	.dark-mode-switch {
		@apply absolute right-3 dark:border-terminal-fg;

		[data-switch-track] {
			@apply bg-transparent;
		}
	}
</style>
