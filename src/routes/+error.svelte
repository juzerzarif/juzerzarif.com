<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: commandOutput =
		$page.status === 404
			? `cd: no such file or directory: ${$page.url.toString()}`
			: 'Segmentation fault (core dumped)';

	$: errorTitle = `${$page.status}: ${$page.error?.message || 'Unknown Error'}`;
</script>

<div class="h-full p-4">
	<span class="command-output text-sm text-terminal-red md:text-base">{commandOutput}</span>
	<h1 class="mt-6 text-center text-4xl font-semibold md:text-6xl">
		{errorTitle}
	</h1>
	<div class="mt-10 flex justify-center gap-10">
		<button class=" p-2 text-lg underline" on:click={() => history.back()}>Back</button>
		<button class=" p-2 text-lg underline" on:click={() => goto('/')}>Home</button>
	</div>
</div>

<style lang="postcss">
	.command-output::before {
		content: '❯';
		@apply mr-2 text-terminal-green;
	}
</style>
