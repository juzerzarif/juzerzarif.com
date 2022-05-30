<script lang="ts" context="module">
	let componentCount = 1;
</script>

<script lang="ts">
	import cx from 'clsx';

	export let label: string;
	export let selected: boolean;

	const buttonId = `theme-button-${componentCount++}`;
</script>

<div class="flex flex-col">
	<button
		id={buttonId}
		class={cx(
			'mb-px h-12 w-12 overflow-hidden rounded shadow-sm active:opacity-70',
			selected ? 'border-2 border-blue-500' : 'border border-system-fg/30'
		)}
		aria-pressed={selected}
		on:click
	>
		<slot />
	</button>
	<label for={buttonId} class="text-center opacity-80">{label}</label>
</div>
