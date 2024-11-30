<script lang="ts">
	import type {
		Message,
		CreateMessage,
		DataMessage,
		Attachment
	} from 'ai';
	import { onMount, tick } from 'svelte';

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Paperclip } from 'lucide-svelte';

	import SvelteMarckdown from 'svelte-markdown';
	import { enhance } from '$app/forms';
	import SvelteMarkdown from 'svelte-markdown';

	import { useChat } from '@ai-sdk/svelte';

	import { extractTextFromFile } from '$lib/utils';
	import MessagesComponent from './Messages.svelte';

	let fileInput: HTMLInputElement;
	let textInput: HTMLInputElement;
	let chatContainer: HTMLUListElement;
	const {
		input,
		handleSubmit,
		messages,
		append,
		data,
		error,
		isLoading,
		metadata,
		reload,
		addToolResult,
		setData,
		setMessages,
		stop
	} = useChat({
		initialMessages: loadMessagesFromLocalStorage()
	});

	function clearChat() {
		setMessages([]);
	}
	function saveMessagesToLocalStorage(msgs: Message[]) {
		localStorage.setItem('chatMessages', JSON.stringify(msgs));
	}

	function loadMessagesFromLocalStorage() {
		const savedMessages = localStorage.getItem('chatMessages');
		if (!savedMessages) return [];
		// if (savedMessages) {
		// 	setMessages(JSON.parse(savedMessages));
		// }
		return JSON.parse(savedMessages);
	}

	function scrollToBottom() {
		if (!chatContainer) return;
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}

	onMount(() => {
		setTimeout(() => {
			scrollToBottom();
		}, 100);
	});

	$: {
		saveMessagesToLocalStorage($messages);
		scrollToBottom();
	}
	async function sendFile(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		const target = e.target as HTMLInputElement;
		const files = target.files;
		if (!files) return;

		let fileText: Record<string, string> = {};
		for (const file of files) {
			const pdf_text = await extractTextFromFile(file);
			console.log(pdf_text);
			fileText[file.name] = pdf_text;
		}

		function formatFileText() {
			let formattedText = '';
			for (const [key, value] of Object.entries(fileText)) {
				formattedText += `PDF:${key}\n${value}\n\n`;
			}
			return formattedText;
		}
		const newMSG: CreateMessage = {
			content: 'PDF:\n' + JSON.stringify(fileText),
			role: 'user',
			data: JSON.stringify(fileText)
		};
		console.log(newMSG);
		const resp = await append(newMSG);
		console.log(resp);
	}
</script>

<main class="container mx-auto">
	<ul
		class="my-5 flex h-[80vh] flex-col gap-5 overflow-y-scroll rounded border border-primary p-5"
		bind:this={chatContainer}
	>
		{#each $messages as m}
			<MessagesComponent msg={m} />
		{/each}
	</ul>
	<form onsubmit={handleSubmit} class="flex items-center gap-2">
		<Button onclick={() => fileInput.click()}>
			<Paperclip />
		</Button>
		<Input bind:value={$input} class="border-primary" />

		<input
			bind:this={fileInput}
			class="hidden"
			type="file"
			accept="application/pdf"
			onchange={sendFile}
		/>
		{#if $isLoading}
			<Button onclick={stop} variant="destructive">Stop</Button>
		{:else}
			<Button type="submit" class="" disabled={$isLoading}>
				{$isLoading ? 'Sending...' : 'Send'}
			</Button>
		{/if}
	</form>

	<div class=" m-2 flex items-center justify-center gap-5">
		<Button onclick={clearChat} variant="outline">Clear Chat</Button>
	</div>

	{#if $error}
		<p class="text-center text-red-600">{$error}</p>
		<Button onclick={reload}>Reload</Button>
	{/if}
</main>
