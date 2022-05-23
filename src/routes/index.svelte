<script lang="ts">
	import cx from 'clsx';
	import Typed from 'typed.js';
	import { onMount } from 'svelte';

	let introEl: HTMLHeadingElement;
	let isTyping = false;
	let showContentText = false;

	onMount(() => {
		const START_DELAY = 3000;
		const typed = new Typed(introEl, {
			strings: ['Hi, my name is Juzer ^1000 `👋`'],
			typeSpeed: 70,
			startDelay: START_DELAY,
			showCursor: false,
			onComplete() {
				isTyping = false;
				setTimeout(() => {
					showContentText = true;
				}, 500);
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

<div class="flex min-h-full justify-center">
	<div class="container flex flex-col items-center py-10 px-4">
		<h1 class="sr-only">Hi, my name is Juzer 👋</h1>
		<!-- svelte-ignore a11y-hidden -->
		<!-- svelte-ignore a11y-missing-content -->
		<h1
			aria-hidden="true"
			class={cx(
				'intro-text',
				!isTyping && 'cursor-blink',
				'relative text-center font-mono text-4xl font-bold md:text-5xl lg:text-6xl'
			)}
			bind:this={introEl}
		/>

		<p
			class={cx(
				'mt-12 text-center font-mono text-lg md:text-2xl',
				!showContentText ? 'opacity-0' : 'opacity-100 transition-opacity'
			)}
		>
			And this is my website. I am a web developer trying to learn how to make great software on the
			web for all people.
		</p>
	</div>
</div>

<style lang="postcss" global>
	.intro-text::before {
		content: '\200b';
	}
	.intro-text::after {
		content: '\00a0';
		@apply absolute -bottom-0.5 inline-block scale-y-110 bg-terminalLt-cursor text-terminalLt-cursor dark:bg-terminalDk-cursor dark:text-terminalDk-cursor;
	}

	@keyframes blink2 {
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
		animation: blink2 1s infinite;
	}
</style>
