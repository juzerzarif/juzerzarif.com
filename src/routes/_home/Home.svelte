<script lang="ts">
	import cx from 'clsx';

	import TypedGreeting from './components/TypedGreeting.svelte';

	let showContent = false;
	const handleTypingComplete = () => {
		setTimeout(() => {
			showContent = true;
		}, 300);
	};
</script>

<div class="flex min-h-full justify-center">
	<div class="container flex flex-col items-center py-10 px-10">
		<img
			class="mb-8 h-[30vh] rounded-full transition-all md:min-h-[20rem]"
			class:opacity-0={!showContent}
			class:opacity-100={showContent}
			src="images/juzer-seattle.webp"
			alt="Juzer smiling with the city of seattle in the background"
		/>
		<TypedGreeting on:typing-complete={handleTypingComplete} />
		<div class={cx('transition-opacity', showContent ? 'opacity-100' : 'opacity-0')}>
			<p class={cx('text-md self-center text-justify font-mono md:text-xl lg:text-2xl')}>
				Welcome to my website. I am a software engineer trying to learn how to make great software
				for all people. In my free time I like to bake and cook, mess with audio equipment,
				mechanical keyboards, and hobby electronics. If you'd like to say hi, feel free to reach out
				to me using any of the media listed here. Have fun!
			</p>
		</div>
	</div>
</div>
