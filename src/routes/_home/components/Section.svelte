<script lang="ts">
	import cx from 'clsx';

	export let title: string;
</script>

<section>
	<h2 class={cx('section-header', 'flex text-3xl font-bold uppercase md:text-4xl lg:text-5xl')}>
		{title}
	</h2>
	<slot />
</section>

<style lang="postcss">
	.section-header {
		&::after,
		&::before {
			content: '';
			@apply my-auto grow border-t-2 border-terminal-fg/40;
		}
		&::before {
			@apply mr-4 md:mr-6;
		}
		&::after {
			@apply ml-4 md:ml-6;
		}
	}
</style>
