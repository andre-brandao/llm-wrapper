<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div>
	Disclaimer: O chat bot não possui memoria, os arquivos e mensagensa sao
	perdidos apos o fechamento da pagina.
</div>
{@render children()}
