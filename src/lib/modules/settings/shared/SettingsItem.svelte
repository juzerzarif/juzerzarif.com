<div class="settings-item grid w-full grid-cols-[1fr_2fr] gap-x-4 text-sm">
	<slot name="label" />
	<slot name="field" />
</div>

<style lang="postcss">
	.settings-item:first-child {
		@apply text-right;
	}
</style>
