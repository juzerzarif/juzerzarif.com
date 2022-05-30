<script lang="ts">
	import cx from 'clsx';
	import { createEventDispatcher } from 'svelte';

	import CloseIcon from './close.svg';
	import MinimizeIcon from './minimize.svg';
	import MaximizeIcon from './maximize.svg';

	export let disabled: Partial<Record<'close' | 'maximize' | 'minimize', boolean>> = {};

	const commonButtonClass = 'h-3.5 w-3.5 overflow-hidden rounded-full';
	const getIconClass = (disabled: boolean) =>
		cx(
			'mx-auto h-full transition-opacity',
			disabled ? 'opacity-0' : 'opacity-[var(--wab-icon-opacity)]'
		);
	const dispatch = createEventDispatcher();
</script>

<div {...$$restProps} class={cx('action-buttons flex items-center gap-2', $$restProps.class)}>
	<fieldset class="contents">
		<legend class="sr-only">Window Controls</legend>
		<button
			aria-label="Close"
			class={cx(commonButtonClass, disabled.close ? 'bg-system-fg/30' : 'bg-[#FF5F57]')}
			disabled={!!disabled.close}
			on:click={(event) => dispatch('close', event)}
		>
			<CloseIcon class={cx(getIconClass(!!disabled.close), 'py-[12%]')} />
		</button>
		<button
			aria-label="Minimize"
			class={cx(commonButtonClass, disabled.minimize ? 'bg-system-fg/30' : 'bg-[#FEBC2E]')}
			disabled={!!disabled.minimize}
			on:click={(event) => dispatch('minimize', event)}
		>
			<MinimizeIcon class={cx(getIconClass(!!disabled.minimize), 'py-[12%]')} />
		</button>
		<button
			aria-label="Maximize"
			class={cx(commonButtonClass, disabled.maximize ? 'bg-system-fg/30' : 'bg-[#28C840]')}
			disabled={!!disabled.maximize}
			on:click={(event) => dispatch('maximize', event)}
		>
			<MaximizeIcon class={cx(getIconClass(!!disabled.maximize), 'py-[17%]')} />
		</button>
	</fieldset>
</div>

<style lang="postcss">
	.action-buttons {
		--wab-icon-opacity: 0;

		&:hover,
		&:active,
		button:focus-visible {
			--wab-icon-opacity: 0.6;
		}
	}
</style>
