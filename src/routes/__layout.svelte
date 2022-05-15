<script lang="ts">
	import { page } from '$app/stores';

	import '../app.css';

	const getUnixPath = (path: string) => `pcuser@Juzer-Zarif : ~${path}`.replace(/\/$/, '');
</script>

<div class="hero-bg flex h-full w-full flex-col overflow-scroll">
	<!-- Title bar -->
	<div
		class="relative inline-flex h-8 items-center border-b-[1px] border-b-stone-400 bg-neutral-100 px-3 py-2 shadow-md shadow-neutral-200/50 dark:border-b-stone-900 dark:bg-neutral-800 dark:shadow-zinc-900/50"
	>
		<div class="absolute inline-flex h-4 items-center">
			<div class="mr-2 aspect-square w-3 rounded-full bg-red-500" />
			<div class="mr-2 aspect-square w-3 rounded-full bg-yellow-500" />
			<div class="aspect-square w-3 rounded-full bg-green-500" />
		</div>
		<span
			aria-hidden="true"
			class="window-title mx-20 flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-sm font-semibold opacity-70 dark:opacity-60 md:mx-32"
		>
			{getUnixPath($page.url.pathname)}
			<!-- This is so the unix path is rendered ltr even when the direction is set to rtl -->
			<span aria-hidden="true" class="invisible">l</span>
		</span>
	</div>

	<div class="flex-grow overflow-scroll">
		<slot />
	</div>
</div>

<style>
	.window-title {
		direction: rtl;
	}
</style>
