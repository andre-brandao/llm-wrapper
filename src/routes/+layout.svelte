<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mt-5 flex items-center justify-center text-2xl">Deds Chat</div>
{@render children()}

<footer class="flex items-center justify-center">
	<p>
		&copy; {new Date().getFullYear()} André Brandão. All rights reserved.
	</p>
</footer>
