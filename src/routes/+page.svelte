<script lang="ts">
	import cx from 'clsx';

	import ContactForm from './ContactForm.svelte';
	import MediaLinks from './MediaLinks.svelte';
	import Section from './Section.svelte';
	import TypedGreeting from './TypedGreeting.svelte';

	let showContent = false;
	const handleTypingComplete = () => {
		setTimeout(() => {
			showContent = true;
		}, 300);
	};
</script>

<svelte:head>
	<title>Juzer Zarif</title>
	<meta
		name="description"
		content="Juzer Zarif is a software engineer focused on web development. Contact him on his website."
	/>
</svelte:head>

<div
	class="container mx-auto flex flex-col items-center py-10 px-6 sm:px-10"
	style:--content-opacity={showContent ? 1 : 0}
>
	<img
		class={cx('delayed-visible', 'mb-8 h-[30vh] rounded-full transition-all md:min-h-[20rem]')}
		src="images/juzer-seattle.webp"
		alt="Juzer smiling with the city of Seattle in the background"
	/>
	<TypedGreeting on:typing-complete={handleTypingComplete} />
	<div class={cx('delayed-visible', 'transition-opacity')}>
		<p class="text-md mb-24 self-center text-justify md:mb-48 md:text-xl lg:text-2xl">
			Welcome to my website. I am a software engineer trying to learn how to make great software for
			all people. In my free time I like to bake and cook, mess with audio equipment, mechanical
			keyboards, and hobby electronics. If you'd like to say hi, feel free to reach out to me using
			any of the media listed here. Have fun!
		</p>

		<Section title="Get in touch">
			<div class="mt-12 flex flex-col gap-12">
				<MediaLinks />
				<ContactForm />
			</div>
		</Section>
	</div>
</div>

<style lang="postcss">
	:global(body[no-js]) .delayed-visible {
		opacity: 1;
	}

	.delayed-visible {
		opacity: var(--content-opacity, 0);
	}
</style>
