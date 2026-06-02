<script lang="ts">
	import { getI18n } from '$lib/utils/context';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<any>();
	const i18n = getI18n();

	import Switch from './Switch.svelte';

	type ValveProperty = {
		title?: string;
		type?: string;
		enum?: string[];
		description?: string;
		default?: unknown;
	};

	type ValveSpec = {
		properties?: Record<string, ValveProperty>;
		required?: string[];
	};

	export let valvesSpec: ValveSpec | null = null;
	export let valves: Record<string, unknown> = {};
</script>

{#if valvesSpec && Object.keys(valvesSpec?.properties ?? {}).length}
	{@const valveProperties = valvesSpec?.properties ?? {}}
	{#each Object.keys(valveProperties) as property, idx}
		<div class=" py-0.5 w-full justify-between">
			<div class="flex w-full justify-between">
				<div class=" self-center text-xs font-medium">
					{valveProperties[property].title}

					{#if (valvesSpec?.required ?? []).includes(property)}
						<span class=" text-gray-500">*required</span>
					{/if}
				</div>

				<button
					class="p-1 px-3 text-xs flex rounded transition"
					type="button"
					on:click={() => {
						valves[property] =
							(valves[property] ?? null) === null
								? (valveProperties[property]?.default ?? '')
								: null;

						dispatch('change');
					}}
				>
					{#if (valves[property] ?? null) === null}
						<span class="ml-2 self-center">
							{#if (valvesSpec?.required ?? []).includes(property)}
								{$i18n.t('None')}
							{:else}
								{$i18n.t('Default')}
							{/if}
						</span>
					{:else}
						<span class="ml-2 self-center"> {$i18n.t('Custom')} </span>
					{/if}
				</button>
			</div>

			{#if (valves[property] ?? null) !== null}
				<!-- {valves[property]} -->
				<div class="flex mt-0.5 mb-1.5 space-x-2">
					<div class=" flex-1">
						{#if valveProperties[property]?.enum ?? null}
							<select
								class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none border border-gray-100 dark:border-gray-800"
								bind:value={valves[property]}
								on:change={() => {
									dispatch('change');
								}}
							>
								{#each valveProperties[property].enum as option}
									<option value={option} selected={option === valves[property]}>
										{option}
									</option>
								{/each}
							</select>
						{:else if (valveProperties[property]?.type ?? null) === 'boolean'}
							<div class="flex justify-between items-center">
								<div class="text-xs text-gray-500">
									{valves[property] ? 'Enabled' : 'Disabled'}
								</div>

								<div class=" pr-2">
									<Switch
										state={Boolean(valves[property])}
										on:change={(e: any) => {
											valves[property] = Boolean(e.detail);
											dispatch('change');
										}}
									/>
								</div>
							</div>
						{:else}
							<input
								class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none border border-gray-100 dark:border-gray-800"
								type="text"
								placeholder={valveProperties[property].title}
								bind:value={valves[property]}
								autocomplete="off"
								required
								on:change={() => {
									dispatch('change');
								}}
							/>
						{/if}
					</div>
				</div>
			{/if}

			{#if (valveProperties[property]?.description ?? null) !== null}
				<div class="text-xs text-gray-500">
					{valveProperties[property].description}
				</div>
			{/if}
		</div>
	{/each}
{:else}
	<div class="text-xs">No valves</div>
{/if}
