<script lang="ts">
	import cx from 'clsx';
	import Typed from 'typed.js';
	import { createEventDispatcher, onMount } from 'svelte';

	let introEl: HTMLHeadingElement;
	let isTyping = false;
	const dispatch = createEventDispatcher();

	onMount(() => {
		const START_DELAY = 1000;
		const typed = new Typed(introEl, {
			strings: ['Hi, my name is Juzer ^500 `👋`'],
			typeSpeed: 50,
			startDelay: START_DELAY,
			showCursor: false,
			onComplete() {
				isTyping = false;
				dispatch('typing-complete');
			}
		});
		const typingTimeout = setTimeout(() => {
			isTyping = true;
		}, START_DELAY);

		return () => {
			clearTimeout(typingTimeout);
			typed.destroy();
		};
	});
</script>

<h1 class="untyped-greeting">Hi, my name is Juzer 👋</h1>
<!-- svelte-ignore a11y-hidden -->
<!-- svelte-ignore a11y-missing-content -->
<h1
	aria-hidden="true"
	class={cx(
		'typed-greeting',
		!isTyping && 'cursor-blink',
		'relative mb-12 text-center font-mono text-4xl font-bold md:text-5xl lg:text-6xl'
	)}
	bind:this={introEl}
/>

<style lang="postcss">
	:global(body[no-js]) {
		.untyped-greeting {
			@apply relative mb-12 text-center font-mono text-4xl font-bold md:text-5xl lg:text-6xl;
		}

		.typed-greeting {
			display: none;
		}
	}

	:global(body:not([no-js])) .untyped-greeting {
		@apply sr-only;
	}

	.typed-greeting::before {
		content: '\200b';
	}
	.typed-greeting::after {
		content: '\00a0';
		@apply absolute -bottom-0.5 inline-block scale-y-110 bg-terminal-cursor text-terminal-cursor;
	}

	@keyframes blink {
		25% {
			opacity: 1;
		}
		26% {
			opacity: 0;
		}
		74% {
			opacity: 0;
		}
		75% {
			opacity: 1;
		}
	}
	.cursor-blink::after {
		animation: blink 1s infinite;
	}
</style>
