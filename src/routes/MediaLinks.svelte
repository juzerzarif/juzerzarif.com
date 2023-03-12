<script lang="ts">
	import FacebookIcon from '$assets/images/facebook.svg';
	import GithubIcon from '$assets/images/github.svg';
	import InstagramIcon from '$assets/images/instagram.svg';
</script>

<div class="flex h-8 w-full justify-center gap-8 md:h-12">
	<a
		class="media-anchor rounded-full"
		href="https://github.com/juzerzarif"
		aria-label="Github profile"
	>
		<GithubIcon class="fill-terminal-fg" />
	</a>
	<a
		class="media-anchor rounded-xl"
		href="https://instagram.com/juzerzarif"
		aria-label="Instagram profile"
	>
		<InstagramIcon class="fill-terminal-fg" />
	</a>
	<a
		class="media-anchor rounded-full"
		href="https://facebook.com/juzerzarif"
		aria-label="Facebook profile"
	>
		<FacebookIcon class="fill-terminal-fg" />
	</a>
</div>

<style lang="postcss">
	.media-anchor {
		@apply aspect-square h-full transition-all hover:scale-110 focus-visible:scale-110;

		:global(svg) {
			@apply h-full;
		}
	}
</style>
