<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<any>();
	import RecursiveFolder from './RecursiveFolder.svelte';
	export let folders: Record<string, any> = {};
	export let selectedChatIds: string[] = [];
	export let showBulkActions = false;

	let folderList: any[] = [];
	// Get the list of folders that have no parent, sorted by name alphabetically
	$: folderList = Object.keys(folders)
		.filter((key) => folders[key].parent_id === null)
		.sort((a, b) =>
			folders[a].name.localeCompare(folders[b].name, undefined, {
				numeric: true,
				sensitivity: 'base'
			})
		);
</script>

{#each folderList as folderId (folderId)}
	<RecursiveFolder
		className=""
		{folders}
		{folderId}
		{selectedChatIds}
		{showBulkActions}
		on:import={(e: any) => {
			dispatch('import', e.detail);
		}}
		on:update={(e: any) => {
			dispatch('update', e.detail);
		}}
		on:change={(e: any) => {
			dispatch('change', e.detail);
		}}
		on:select={(e: any) => {
			dispatch('select', e.detail);
		}}
		on:unselect={(e: any) => {
			dispatch('unselect', e.detail);
		}}
		on:tag={(e: any) => {
			dispatch('tag', e.detail);
		}}
	/>
{/each}
