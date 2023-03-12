<script lang="ts">
	import cx from 'clsx';
	import CloseSvg from '@material-design-icons/svg/filled/close.svg';
	import { load, ReCaptchaInstance } from 'recaptcha-v3';
	import { onMount } from 'svelte';

	import TextField from '$lib/components/form/TextField.svelte';
	import { PUBLIC_GRECAPTCHA_SITE_KEY } from '$env/static/public';

	let recaptchaApi = null as unknown as Promise<ReCaptchaInstance>;
	onMount(() => {
		recaptchaApi = load(PUBLIC_GRECAPTCHA_SITE_KEY, { autoHideBadge: true });
	});

	let requestPending = false;
	let requestResult = null as { success: boolean; text: string } | null;

	const closeAlert = () => {
		requestResult = null;
	};

	async function handleFormSubmit(event: SubmitEvent) {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			requestPending = true;
			requestResult = null;

			const gRecaptchaResponse = await recaptchaApi.then((r) => r.execute('contactFormSubmit'));
			formData.append('g-recaptcha-response', gRecaptchaResponse);

			const response = await fetch(form.action, { method: form.method, body: formData });
			if (!response.ok) {
				const errorText = (await response.text()) || 'Unknown error occurred';
				requestResult = { success: false, text: errorText };
			} else {
				requestResult = { success: true, text: 'Successfully submitted message!' };
				form.reset();
			}
		} catch (err) {
			console.error(err);
			const errMessage = (err instanceof Error && err.message) || 'Unknown error occurred';
			requestResult = { success: false, text: errMessage };
		} finally {
			requestPending = false;
		}
	}
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

	<form
		class="flex flex-col gap-6 text-lg"
		action="/contact-me"
		method="post"
		on:submit|preventDefault={handleFormSubmit}
	>
		<TextField label="Name" name="name" disabled={requestPending} required />
		<TextField
			label="Email"
			name="email"
			type="email"
			pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'}
			disabled={requestPending}
			required
		/>
		<TextField
			element="textarea"
			name="message"
			label="Message"
			rows="8"
			disabled={requestPending}
			required
		/>
		<div class="inline-flex justify-end">
			<button
				class="relative bg-terminal-fg px-6 py-3 uppercase text-terminal-bg disabled:opacity-70 md:px-8 md:py-4"
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
