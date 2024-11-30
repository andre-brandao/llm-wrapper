<script lang="ts">
	import type {
		Message,
		CreateMessage,
		DataMessage,
		Attachment
	} from 'ai';

	import SvelteMarckdown from 'svelte-markdown';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Paperclip } from 'lucide-svelte';

	export let msg: Message;
</script>

{#snippet UserMessage(msg: Message)}
	{#if msg.content.startsWith('PDF:')}
		<li class="flex flex-col items-end">
			<div class="flex items-center gap-3">
				<Dialog.Root>
					<Dialog.Trigger>
						<Button><Paperclip /> Arquivo</Button>
					</Dialog.Trigger>
					<Dialog.Content class="max-h-[600px]">
						<Dialog.Header>
							<Dialog.Title>{msg.content}</Dialog.Title>
							<Dialog.Description></Dialog.Description>
						</Dialog.Header>
						<ScrollArea
							class="h-[600px] w-full overflow-scroll rounded-md border"
							orientation="vertical"
						>
							{JSON.stringify(msg.data, null, 2)}
						</ScrollArea>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</li>
	{:else}
		<li class="flex flex-col items-end">
			<div class="flex items-center gap-3">
				<Avatar.Root>
					<Avatar.Image
						src="https://github.com/shadcn.png"
						alt="User Avatar"
					/>
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>

				<p>
					{msg.role}
				</p>
			</div>
			<SvelteMarckdown source={msg.content} />
		</li>
	{/if}
{/snippet}

{#if msg.role === 'user'}
	{@render UserMessage(msg)}
{:else if msg.role === 'assistant'}
	<li class="flex flex-col">
		<div class="flex items-center gap-3">
			<Avatar.Root>
				<Avatar.Image
					src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.8tracks.com%2Fcover%2Fi%2F010%2F081%2F037%2Frick_sanchez-4295.png%3Frect%3D0%2C0%2C749%2C749%26q%3D98%26fm%3Djpg%26fit%3Dmax&f=1&nofb=1&ipt=77430bea185e4601ceb66010d0d9386350bbda4d5d2d023e1104090ac7e24311&ipo=images"
					alt="AI Avatar"
				/>
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>

			<p>
				{msg.role}
			</p>
		</div>
		<SvelteMarckdown source={msg.content} />
	</li>
{:else if msg.role === 'data'}
	<li class="flex flex-col items-end">
		<div class="flex items-center gap-3">
			<Dialog.Root>
				<Dialog.Trigger>
					<Button><Paperclip /> Arquivo</Button>
				</Dialog.Trigger>
				<Dialog.Content class="max-h-[600px]">
					<Dialog.Header>
						<Dialog.Title>{msg.content}</Dialog.Title>
						<Dialog.Description></Dialog.Description>
					</Dialog.Header>
					<ScrollArea class="h-72 rounded-md border">
						{JSON.stringify(msg.data, null, 2)}
					</ScrollArea>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</li>
{:else}
	<li class="flex flex-col">
		<div class="flex items-center gap-3">
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>

			<p>
				{msg.role}
			</p>
		</div>
		<SvelteMarckdown source={msg.content} />
	</li>
{/if}
