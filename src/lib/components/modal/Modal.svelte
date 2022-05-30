<script lang="ts">
	import cx from 'clsx';
	import { createFocusTrap } from 'focus-trap';

	export let open: boolean = false;

	const ANIMATION_DURATION = 300;
	let contentVisible = open;
	let contentTimeout: ReturnType<typeof setTimeout>;
	$: {
		if (!open) {
			contentTimeout = setTimeout(() => {
				contentVisible = false;
			}, ANIMATION_DURATION);
		} else {
			clearTimeout(contentTimeout);
			contentVisible = true;
		}
	}

	const trapFocus = (node: HTMLDivElement) => {
		const trap = createFocusTrap(node, { initialFocus: false }).activate();
		return { destroy: () => trap.deactivate() };
	};
</script>

{#if contentVisible}
	<div
		style:--animate-duration={`${ANIMATION_DURATION}ms`}
		class={cx(
			'animate__animated fixed top-0 left-0 h-full w-full bg-system-fg/20 backdrop-blur-sm',
			open ? 'animate__fadeIn' : 'animate__fadeOut'
		)}
	>
		<div
			{...$$restProps}
			class={cx(
				'animate__animated container mx-auto h-full p-4',
				open ? 'animate__slideInDown' : 'animate__slideOutDown',
				$$restProps.class
			)}
			role="dialog"
			use:trapFocus
		>
			<slot />
		</div>
	</div>
{/if}
