<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Github } from 'lucide-svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="mt-5 flex items-center justify-center gap-5 text-2xl">
	Deds Chat

	<Button
		variant="ghost"
		href="https://github.com/andre-brandao/llm-wrapper"
	>
		<Github /> Github
	</Button>
</div>
{@render children()}

<footer class="flex items-center justify-center">
	<p>
		&copy; {new Date().getFullYear()} André Brandão. All rights reserved. <Button
			variant="ghost"
			href="https://github.com/andre-brandao/llm-wrapper"
		>
			<Github /> Github
		</Button>
	</p>
</footer>
