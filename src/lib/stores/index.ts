import { APP_NAME } from '$lib/constants';
import { type Writable, writable } from 'svelte/store';
import type { ModelConfig } from '$lib/apis';
import type { Banner } from '$lib/types';
import type { Socket } from 'socket.io-client';

import emojiShortCodes from '$lib/emoji-shortcodes.json';

type LooseRecord = Record<string, any>;

type ModelDownloadState = {
	abortController?: AbortController;
	pullProgress?: number;
	done?: boolean;
	[key: string]: any;
};

// Backend
export const WEBUI_NAME = writable(APP_NAME);
const defaultConfig: Config = {
	status: false,
	name: APP_NAME,
	version: 'dev',
	default_locale: 'en-US',
	default_models: '',
	default_prompt_suggestions: [],
	docs_url: '',
	docs_url_fr: '',
	survey_url: '',
	survey_url_fr: '',
	features: {
		auth: false,
		auth_trusted_header: false,
		enable_api_key: false,
		enable_signup: false,
		enable_login_form: true,
		enable_web_search: false,
		enable_wiki_grounding: false,
		enable_google_drive_integration: false,
		enable_image_generation: false,
		enable_admin_export: false,
		enable_admin_chat_access: false,
		enable_community_sharing: false
	},
	audio: {
		stt: {},
		tts: {}
	},
	oauth: {
		providers: {}
	}
};

const defaultSessionUser: SessionUser = {
	id: '',
	email: '',
	name: '',
	role: '',
	profile_image_url: ''
};

export const config: Writable<Config> = writable(defaultConfig);
export const user: Writable<SessionUser> = writable(defaultSessionUser);

// Electron App
export const isApp = writable(false);
export const appInfo: Writable<Record<string, unknown> | null> = writable(null);
export const appData: Writable<Record<string, unknown> | null> = writable(null);

// Frontend
export const MODEL_DOWNLOAD_POOL: Writable<Record<string, ModelDownloadState>> = writable({});

export const mobile = writable(false);

export const socket: Writable<null | Socket> = writable(null);
export const activeUserIds: Writable<null | string[]> = writable(null);
export const USAGE_POOL: Writable<null | string[]> = writable(null);

export const theme = writable('system');

export const shortCodesToEmojis = writable(
	Object.entries(emojiShortCodes).reduce<Record<string, string>>((acc, [key, value]) => {
		if (typeof value === 'string') {
			acc[value] = key;
		} else {
			for (const v of value) {
				acc[v] = key;
			}
		}

		return acc;
	}, {})
);

export const TTSWorker: Writable<unknown | null> = writable(null);

export const ariaMessage = writable('');

export const chatId = writable('');
export const chatTitle = writable('');

export const channels: Writable<LooseRecord[]> = writable([]);
export const chats: Writable<LooseRecord[]> = writable([]);
export const pinnedChats: Writable<LooseRecord[]> = writable([]);
export const tags: Writable<LooseRecord[]> = writable([]);

export const models: Writable<Model[]> = writable([]);

export const prompts: Writable<null | Prompt[]> = writable(null);
export const knowledge: Writable<Document[]> = writable([]);
export const tools: Writable<LooseRecord[] | null> = writable(null);
export const functions: Writable<LooseRecord[] | null> = writable(null);

export const banners: Writable<Banner[]> = writable([]);

export const settings: Writable<Partial<Settings>> = writable({});

export const showSidebar = writable(false);
export const showSettings = writable(false);
export const showArchivedChats = writable(false);
export const showChangelog = writable(false);

export const returnFocusButtonID = writable('');

export const showControls = writable(false);
export const showOverview = writable(false);
export const showArtifacts = writable(false);
export const showCallOverlay = writable(false);

export const temporaryChatEnabled = writable(false);
export const scrollPaginationEnabled = writable(false);
export const currentChatPage = writable(1);

export const isLastActiveTab = writable(true);
export const playingNotificationSound = writable(false);

export const suggestionCycle = writable(0);

export const initNewChatAction: Writable<(() => Promise<void>) | null> = writable(null);

export type Model = OpenAIModel | OllamaModel | ArenaModel;

type BaseModel = {
	id: string;
	name: string;
	info?: ModelConfig;
	owned_by: 'ollama' | 'openai' | 'arena';
};

export interface OpenAIModel extends BaseModel {
	owned_by: 'openai';
	external: boolean;
	source?: string;
}

export interface OllamaModel extends BaseModel {
	owned_by: 'ollama';
	details: OllamaModelDetails;
	size: number;
	description: string;
	model: string;
	modified_at: string;
	digest: string;
	ollama?: {
		name?: string;
		model?: string;
		modified_at: string;
		size?: number;
		digest?: string;
		details?: {
			parent_model?: string;
			format?: string;
			family?: string;
			families?: string[];
			parameter_size?: string;
			quantization_level?: string;
		};
		urls?: number[];
	};
}

export interface ArenaModel extends BaseModel {
	owned_by: 'arena';
	external?: boolean;
	source?: string;
}

type OllamaModelDetails = {
	parent_model: string;
	format: string;
	family: string;
	families: string[] | null;
	parameter_size: string;
	quantization_level: string;
};

type Settings = {
	models?: string[];
	conversationMode?: boolean;
	speechAutoSend?: boolean;
	responseAutoPlayback?: boolean;
	audio: AudioSettings;
	showUsername?: boolean;
	notificationEnabled?: boolean;
	wikipediaGrounding?: boolean;
	autoTags?: boolean;
	responseAutoCopy?: boolean;
	showChangelog?: boolean;
	showEmojiInCall?: boolean;
	voiceInterruption?: boolean;
	richTextInput?: boolean;
	largeTextAsFile?: boolean;
	landingPageMode?: string;
	chatBubble?: boolean;
	widescreenMode?: boolean;
	splitLargeChunks?: boolean;
	scrollOnBranchChange?: boolean;
	userLocation?: boolean;
	hapticFeedback?: boolean;
	imageCompression?: boolean;
	imageCompressionSize?: {
		width?: string;
		height?: string;
	};
	title?: TitleSettings;
	splitLargeDeltas?: boolean;

	system?: string;
	requestFormat?: string;
	keepAlive?: string;
	seed?: number;
	temperature?: string;
	repeat_penalty?: string;
	top_k?: string;
	top_p?: string;
	num_batch?: string;
	num_keep?: string;
	options?: ModelOptions;
	params?: Record<string, unknown>;
	[key: string]: unknown;
};

type ModelOptions = {
	stop?: string[];
	[key: string]: unknown;
};

type AudioSettings = {
	STTEngine?: string;
	TTSEngine?: string;
	speaker?: string;
	model?: string;
	nonLocalVoices?: boolean;
	stt: {
		engine?: string;
		model?: string;
		language?: string;
		[key: string]: unknown;
	};
	tts: {
		engine?: string;
		model?: string;
		voice?: string;
		defaultVoice?: string;
		nonLocalVoices?: boolean;
		playbackRate?: number;
		split_on?: string;
		[key: string]: unknown;
	};
	[key: string]: unknown;
};

type TitleSettings = {
	auto?: boolean;
	model?: string;
	modelExternal?: string;
	prompt?: string;
};

type Prompt = {
	command: string;
	user_id: string;
	title: string;
	content: string;
	timestamp: number;
};

type Document = {
	id?: string;
	collection_name: string;
	filename: string;
	name: string;
	title: string;
	description?: string;
	files?: any[];
	legacy?: boolean;
	type?: string;
	pyodideMplTarget?: unknown;
	meta?: {
		document?: boolean;
		legacy?: boolean;
		tags?: Array<{ name: string; [key: string]: any }>;
		[key: string]: any;
	};
	[key: string]: any;
};

type Config = {
	status: boolean;
	name: string;
	version: string;
	default_locale: string;
	default_models: string;
	default_prompt_suggestions: PromptSuggestion[];
	docs_url: string;
	docs_url_fr: string;
	survey_url: string;
	survey_url_fr: string;
	features: {
		auth: boolean;
		auth_trusted_header: boolean;
		enable_ldap?: boolean;
		enable_api_key: boolean;
		enable_signup: boolean;
		enable_login_form: boolean;
		enable_web_search?: boolean;
		enable_wiki_grounding?: boolean;
		enable_google_drive_integration: boolean;
		enable_image_generation: boolean;
		enable_admin_export: boolean;
		enable_admin_chat_access: boolean;
		enable_community_sharing: boolean;
		[key: string]: unknown;
	};
	audio: AudioSettings;
	file?: {
		max_count?: number;
		[key: string]: unknown;
	};
	onboarding?: boolean;
	oauth: {
		providers: {
			[key: string]: string;
		};
	};
	[key: string]: unknown;
};

type PromptSuggestion = {
	content: string;
	title: [string, string];
	lang: string;
};

type WorkspacePermissions = {
	models?: boolean;
	knowledge?: boolean;
	prompts?: boolean;
	tools?: boolean;
	[key: string]: unknown;
};

type SessionUserPermissions = {
	workspace?: WorkspacePermissions;
	[key: string]: unknown;
};

type SessionUser = {
	id: string;
	email: string;
	name: string;
	role: string;
	profile_image_url: string;
	permissions?: SessionUserPermissions;
	groups?: string[];
	[key: string]: unknown;
};
