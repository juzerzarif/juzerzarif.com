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
		'flex overflow-hidden rounded-full border border-terminal-fg border-opacity-60 dark:border-terminal-black',
		'focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-blue-300'
	)}
	type="button"
	aria-pressed={value}
	on:click={handleButtonClick}
>
	<div
		class={cx(
			'transi h-5 w-10 p-0.5 transition-colors',
			value
				? 'bg-terminal-green dark:bg-terminal-green/60'
				: 'bg-terminal-black/20 dark:bg-terminal-white/60'
		)}
		aria-hidden="true"
		data-switch-track
	>
		<div class="relative flex h-full w-full items-center">
			<span
				class={cx(
					'absolute z-10 aspect-square h-full rounded-full border border-terminal-black/60 bg-terminal-white drop-shadow transition-all motion-reduce:transition-none',
					value ? 'left-full -translate-x-full' : 'left-0'
				)}
				data-switch-thumb
			/>
			<slot />
		</div>
	</div>
</button>
