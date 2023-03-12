<script lang="ts">
	import cx from 'clsx';

	export let element: 'input' | 'textarea' = 'input';
	export let label: string;
	export let disabled: boolean = false;
</script>

<div class={cx('relative inline-flex', disabled && 'opacity-60')}>
	<svelte:element
		this={element}
		{...$$restProps}
		class={cx(
			'text-field',
			'w-full border-[3px] bg-transparent py-2 px-3 transition-all focus:ring-0',
			$$restProps.class
		)}
		aria-label={label}
		placeholder=" "
		{disabled}
	/>
	<fieldset
		class="pointer-events-none absolute border-[3px] px-2 transition-all"
		aria-hidden="true"
	>
		<legend class="relative px-1 transition-all">{label}</legend>
	</fieldset>
</div>

<style lang="postcss">
	.text-field ~ fieldset {
		--stroke-color: var(--terminal-fg);
	}
	.text-field:focus ~ fieldset {
		--stroke-color: var(--terminal-blue);
	}

	.text-field {
		@apply border-transparent;

		& ~ fieldset {
			inset: -0.55rem 0 0;
			border-color: rgb(var(--stroke-color));

			legend {
				color: rgb(var(--stroke-color));
				@apply top-0 text-sm;
			}
		}
	}

	.text-field:placeholder-shown:not(:focus) {
		@apply border-terminal-fg;

		& ~ fieldset {
			@apply border-transparent;

			legend {
				@apply top-[1.375rem] text-base text-terminal-fg/70;
			}
		}
	}
</style>
