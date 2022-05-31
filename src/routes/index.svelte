<script lang="ts">
	import cx from 'clsx';
	import Typed from 'typed.js';
	import { onMount } from 'svelte';

	let introEl: HTMLHeadingElement;
	let isTyping = false;
	let showContentText = false;

	onMount(() => {
		const START_DELAY = 1000;
		const typed = new Typed(introEl, {
			strings: ['Hi, my name is Juzer ^500 `👋`'],
			typeSpeed: 50,
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
	<div class="container flex flex-col items-center py-10 px-10">
		<h1 class="sr-only">Hi, my name is Juzer 👋</h1>
		<!-- svelte-ignore a11y-hidden -->
		<!-- svelte-ignore a11y-missing-content -->
		<h1
			aria-hidden="true"
			class={cx(
				'intro-text',
				!isTyping && 'cursor-blink',
				'relative mb-12 text-center font-mono text-4xl font-bold md:text-5xl lg:text-6xl'
			)}
			bind:this={introEl}
		/>
		<div class="grid grid-cols-12 gap-6">
			<img
				class={cx(
					'col-span-12 max-h-[50vh] justify-self-center rounded-lg transition-opacity lg:col-span-4 lg:rounded-full xl:col-span-3',
					showContentText ? 'opacity-100' : 'opacity-0'
				)}
				src="images/juzer-seattle.webp"
				alt="Juzer smiling with the city of Seattle in the background"
			/>
			<p
				class={cx(
					'text-md col-span-12 self-center text-justify font-mono transition-opacity md:text-2xl lg:col-span-8 xl:col-span-9',
					!showContentText ? 'opacity-0' : 'opacity-100'
				)}
			>
				Welcome to my website. I am a software engineer trying to learn how to make great software
				for all people. In my free time I like to bake and cook, mess with audio equipment,
				mechanical keyboards, and hobby electronics. If you'd like to say hi, feel free to reach out
				to me using any of the media listed here. Have fun!
			</p>
		</div>
	</div>
</div>

<style lang="postcss" global>
	.intro-text::before {
		content: '\200b';
	}
	.intro-text::after {
		content: '\00a0';
		@apply absolute -bottom-0.5 inline-block scale-y-110 bg-terminal-cursor text-terminal-cursor;
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
