<script lang="ts">
	import ThemeSetting from './theme';
	import { WindowActionButtons } from '$lib/components/system';
</script>

<div
	class="mx-auto mt-12 w-full overflow-hidden rounded-lg border border-system-fg/30 bg-system-bg text-system-fg shadow-lg shadow-system-fg/70 dark:shadow-system-bg md:max-w-2xl"
>
	<div
		class="relative flex justify-center border-b border-b-system-fg/30 bg-system-toolbar py-3 dark:border-b-stone-900"
	>
		<WindowActionButtons
			class="absolute left-4 top-[50%] -translate-y-[50%]"
			disabled={{ minimize: true, maximize: true }}
			on:close
		/>
		<h2 class="font-bold">Preferences</h2>
	</div>
	<div class="p-4">
		<ThemeSetting />
	</div>
</div>
