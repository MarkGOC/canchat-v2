<script lang="ts">
	import { getI18n } from '$lib/utils/context';

	import { DropdownMenu } from 'bits-ui';

	import { flyAndScale } from '$lib/utils/transitions';

	import Dropdown from '$lib/components/common/Dropdown.svelte';
	import QuestionMarkCircle from '$lib/components/icons/QuestionMarkCircle.svelte';
	import Lifebuoy from '$lib/components/icons/Lifebuoy.svelte';
	import Keyboard from '$lib/components/icons/Keyboard.svelte';
	import ExclamationCircle from '$lib/components/icons/ExclamationCircle.svelte';
	import LightBlub from '$lib/components/icons/LightBlub.svelte';
	import BookOpen from '$lib/components/icons/BookOpen.svelte';
	const i18n = getI18n();

	export let showShortcutsHandler: Function;
	export let showSurveyHandler: Function;
	export let showDocsHandler: Function;
	export let showIssueHandler: Function;
	export let showSuggestionHandler: Function;
	export let showTrainingHandler: Function;

	export let onClose: Function = () => {};

	export let ariaLabel: string = 'Help';
</script>

<Dropdown
	{ariaLabel}
	on:change={(e: any) => {
		if (e.detail === false) {
			onClose();
		}
	}}
>
	<slot />

	<div slot="content">
		<DropdownMenu.Content
			class="w-full max-w-[200px] rounded-xl px-1 py-1.5 border border-gray-300/30 dark:border-gray-700/50 z-50 bg-white dark:bg-gray-850 dark:text-white shadow-lg"
			sideOffset={4}
			side="top"
			align="end"
			{...{ transition: flyAndScale } as any}
		>
			<DropdownMenu.Item
				class="flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
				id="docs-button"
				onclick={() => {
					showDocsHandler();
				}}
			>
				<QuestionMarkCircle className="size-5" />
				<div class="flex items-center">{$i18n.t('Documentation')}</div>
			</DropdownMenu.Item>

			<DropdownMenu.Item
				class="flex gap-2 items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
				id="training-button"
				onclick={() => {
					showTrainingHandler();
				}}
			>
				<BookOpen className="size-5" />
				<div class="flex items-center">{$i18n.t('Training Course')}</div>
			</DropdownMenu.Item>

			<DropdownMenu.Item
				class="flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
				id="issue-button"
				onclick={() => {
					showIssueHandler();
				}}
			>
				<ExclamationCircle className="size-5" />
				<div class="flex items-center">{$i18n.t('Report an Issue')}</div>
			</DropdownMenu.Item>

			<DropdownMenu.Item
				class="flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
				id="suggestion-button"
				onclick={() => {
					showSuggestionHandler();
				}}
			>
				<LightBlub className="size-5" />
				<div class="flex items-center">{$i18n.t('Suggestion Box')}</div>
			</DropdownMenu.Item>

			<DropdownMenu.Item
				class="flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
				id="survey-button"
				onclick={() => {
					showSurveyHandler();
				}}
			>
				<Lifebuoy className="size-5" />
				<div class="flex items-center">{$i18n.t('User Survey')}</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
				id="shortcut-button"
				onclick={() => {
					showShortcutsHandler();
				}}
			>
				<Keyboard className="size-5" />
				<div class="flex items-center">{$i18n.t('Keyboard shortcuts')}</div>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</div>
</Dropdown>
