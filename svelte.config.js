import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		})
	},
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'meta-shift', // Key combination to open the inspector
			holdMode: false, // Enable or disable hold mode
			showToggleButton: 'never', // Show toggle button ('always', 'active', 'never')
			toggleButtonPos: 'bottom-right' // Position of the toggle button
		}
	},
	onwarn: (warning, handler) => {
		const { code } = warning;
		if (code === 'css-unused-selector') return;
		if (
			code === 'a11y_consider_explicit_label' ||
			code === 'a11y_no_noninteractive_tabindex' ||
			code === 'a11y-click-events-have-key-events' ||
			code === 'a11y-no-static-element-interactions'
		)
			return;

		handler(warning);
	}
};

export default config;
