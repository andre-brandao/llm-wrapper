<script lang="ts">
	import type { Message, CreateMessage, DataMessage } from 'ai';
	import { onMount, tick } from 'svelte';

	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import SvelteMarckdown from 'svelte-markdown';
	import { enhance } from '$app/forms';
	import SvelteMarkdown from 'svelte-markdown';

	import { useChat } from '@ai-sdk/svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Input from '$lib/components/ui/input/input.svelte';

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
	} = useChat({});

	function sendMessage() {}

	function focusInputs() {}

	function clearChat() {
		setMessages;
	}
</script>

{#snippet Message(msg: Message)}
	{#if msg.role === 'user'}
		<li class="flex flex-col items-end">
			<div class="flex items-center gap-3">
				<Avatar.Root>
					<Avatar.Image
						src="https://github.com/shadcn.png"
						alt="@shadcn"
					/>
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>

				<p>
					{msg.role}
				</p>
			</div>
			{msg.content}
		</li>
	{:else if msg.role === 'assistant'}
		<li class="flex flex-col">
			<div class="flex items-center gap-3">
				<Avatar.Root>
					<Avatar.Image
						src="https://github.com/shadcn.png"
						alt="@shadcn"
					/>
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>

				<p>
					{msg.role}
				</p>
			</div>
			{msg.content}
		</li>
	{:else}
		<li class="flex flex-col">
			<div class="flex items-center gap-3">
				<Avatar.Root>
					<Avatar.Image
						src="https://github.com/shadcn.png"
						alt="@shadcn"
					/>
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>

				<p>
					{msg.role}
				</p>
			</div>
			{msg.content}
		</li>
	{/if}
{/snippet}

<main class="container mx-auto">
	<ul class="flex h-[80vh] flex-col gap-5 bg-background">
		{#each $messages as m}
			{@render Message(m)}
		{/each}
	</ul>
	<form onsubmit={handleSubmit} class="flex items-center gap-2">
		<Input bind:value={$input} />
		<Input
			type="file"
			onchange={(e) => {
				const target = e.target as HTMLInputElement;
				const file = target.files?.[0];
				if (!file) return;
				const reader = new FileReader();
				reader.onload = (event) => {
					const data = event.target?.result;

					if (data) {
						// append({ role: 'user', content:});
					}
				};
				reader.readAsDataURL(file);
			}}
		/>
		<Button type="submit" class="" disabled={$isLoading}>
			{$isLoading ? 'Sending...' : 'Send'}
		</Button>
	</form>
</main>
