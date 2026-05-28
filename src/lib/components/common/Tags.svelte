<script lang="ts">
	import { getI18n } from '$lib/utils/context';

	import TagInput from './Tags/TagInput.svelte';
	import TagList from './Tags/TagList.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<any>();

	const i18n = getI18n();

	export let tags: any[] = [];
</script>

<div class="flex flex-row flex-wrap gap-1 line-clamp-1">
	<TagList
		{tags}
		on:delete={(e: any) => {
			dispatch('delete', e.detail);
		}}
	/>

	<TagInput
		label={tags.length == 0 ? $i18n.t('Add Tags') : ''}
		on:add={(e: any) => {
			dispatch('add', e.detail);
		}}
	/>
</div>
