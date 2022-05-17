<script lang="ts">
	import cx from 'clsx';
	import { createEventDispatcher } from 'svelte';

	export let value: boolean = false;
	interface Events {
		change: boolean;
	}
	const dispatch = createEventDispatcher<Events>();

	function handleButtonClick() {
		value = !value;
		dispatch('change', value);
	}
</script>

<button
	{...$$restProps}
	class={cx(
		$$restProps.class,
		'flex overflow-hidden rounded-full border border-lgray-700 border-opacity-60 dark:border-dgray-700',
		'focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-lgray-400/60'
	)}
	type="button"
	aria-pressed={value}
	on:click={handleButtonClick}
>
	<div
		class={cx(
			'transi h-5 w-10 bg-opacity-60 p-0.5 transition-colors',
			value ? 'bg-green-400 dark:bg-green-600' : 'bg-lgray-300 dark:bg-dgray-300'
		)}
		aria-hidden="true"
		data-switch-track
	>
		<div class="relative flex h-full w-full items-center">
			<span
				class={cx(
					'absolute z-10 aspect-square h-full rounded-full border border-lgray-700 border-opacity-60 bg-lgray-200 drop-shadow transition-all motion-reduce:transition-none dark:border-dgray-700 dark:bg-dgray-100',
					value ? 'left-full -translate-x-full' : 'left-0'
				)}
				data-switch-thumb
			/>
			<slot />
		</div>
	</div>
</button>
