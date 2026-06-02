<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { createEventDispatcher } from 'svelte';

	import { flyAndScale } from '$lib/utils/transitions';

	export let show = false;

	export let side: 'bottom' | 'top' | 'right' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' = 'start';
	export let ariaLabel: string | undefined = undefined;
	export let buttonClass = '';
	export let buttonID = '';

	const dispatch = createEventDispatcher<any>();
</script>

<DropdownMenu.Root
	bind:open={show}
	onOpenChange={(state: any) => {
		dispatch('change', state);
	}}
>
	<DropdownMenu.Trigger
		aria-label={ariaLabel}
		data-dropdown-trigger="true"
		class={buttonClass}
		id={buttonID}
	>
		<slot />
	</DropdownMenu.Trigger>

	<slot name="content">
		<DropdownMenu.Content
			class="w-full max-w-[130px] rounded-lg px-1 py-1.5 border border-gray-900 z-50 bg-gray-850 text-white"
			sideOffset={8}
			onCloseAutoFocus={(event: Event) => event.preventDefault()}
			{side}
			{align}
			{...{ transition: flyAndScale } as any}
		>
			<DropdownMenu.Item class="flex items-center px-3 py-2 text-sm  font-medium">
				<div class="flex items-center">Profile</div>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="flex items-center px-3 py-2 text-sm  font-medium">
				<div class="flex items-center">Profile</div>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="flex items-center px-3 py-2 text-sm  font-medium">
				<div class="flex items-center">Profile</div>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</slot>
</DropdownMenu.Root>
