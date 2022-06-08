<script lang="ts">
	import cx from 'clsx';
	import CloseSvg from '@material-design-icons/svg/filled/close.svg';

	import fetch from '$lib/fetch';
	import TextField from '$lib/components/form/TextField.svelte';

	let requestPending = false;
	let requestResult = null as { success: boolean; text: string } | null;

	const closeAlert = () => {
		requestResult = null;
	};

	const enhanceForm = (form: HTMLFormElement) => {
		const submitHandler = async (event: SubmitEvent) => {
			event.preventDefault();
			const formData = new FormData(form);

			try {
				requestPending = true;
				requestResult = null;
				const response = await fetch(form.action, { method: form.method, body: formData });
				if (!response.ok) {
					requestResult = { success: false, text: await response.text() };
				} else {
					requestResult = { success: true, text: 'Successfully submitted message!' };
					form.reset();
				}
			} catch (err) {
				console.error(err);
				requestResult = {
					success: false,
					text: (err instanceof Error && err.message) || 'Unknown error occurred'
				};
			} finally {
				requestPending = false;
			}
		};

		form.addEventListener('submit', submitHandler);
		return { destroy: () => form.removeEventListener('submit', submitHandler) };
	};
</script>

<div class={cx('mx-auto w-full max-w-2xl transition-all')}>
	{#if requestResult}
		<div
			class={cx(
				'mb-6 flex items-start justify-between gap-2 p-2 text-terminal-white dark:text-terminal-black',
				requestResult.success ? 'bg-terminal-green' : 'bg-terminal-red'
			)}
			role="alert"
		>
			<span class="ml-1">{requestResult.text}</span>
			<button class="-mr-1 shrink-0 rounded-full p-1" aria-label="Close" on:click={closeAlert}>
				<CloseSvg class="h-5 w-5 fill-terminal-white dark:fill-terminal-black" />
			</button>
		</div>
	{/if}

	<form class="flex flex-col gap-6 text-lg" action="/contact-me" method="post" use:enhanceForm>
		<TextField label="Name" name="name" disabled={requestPending} required />
		<TextField
			label="Email"
			name="email"
			type="email"
			pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'}
			disabled={requestPending}
			required
		/>
		<TextField element="textarea" label="Message" rows="8" disabled={requestPending} required />
		<div class="inline-flex justify-end">
			<button
				class="relative bg-terminal-fg px-6 py-3 font-mono uppercase text-terminal-bg disabled:opacity-70 md:px-8 md:py-4"
				type="submit"
				disabled={requestPending}
			>
				<div
					class="absolute inset-0 flex h-full w-full items-center justify-center gap-2 p-[inherit]"
					class:hidden={!requestPending}
				>
					<div class="waiting-dot h-2 w-2 bg-terminal-bg" />
					<div class="waiting-dot h-2 w-2 bg-terminal-bg" style:--dot-delay="200ms" />
					<div class="waiting-dot h-2 w-2 bg-terminal-bg" style:--dot-delay="400ms" />
				</div>
				<span class={cx(requestPending && 'opacity-0')}>Submit</span>
			</button>
		</div>
	</form>
</div>

<style lang="postcss">
	@keyframes bounce {
		0%,
		50%,
		100% {
			transform: translateY(0%);
		}
		12.5% {
			transform: translateY(-75%);
		}
		37.5% {
			transform: translateY(75%);
		}
	}

	.waiting-dot {
		animation: bounce 2s ease-in-out var(--dot-delay, 0ms) infinite;
	}
</style>
