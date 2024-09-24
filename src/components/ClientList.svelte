<script>
	import { clients } from '@/lib/stores';

	import Link from '@/components/ui/Link.svelte';
	import ClientCard from '@/components/ClientCard.svelte';
</script>

{#if !$clients.length}
	<div class="flex flex-col items-start gap-2">
		<p>No has registrado ningún cliente todavía</p>
		<Link href="/registrar/cliente">Registrar un cliente nuevo</Link>
	</div>
{:else}
	<ul class="flex flex-col gap-2">
		{#each $clients as client}
			<li>
				<ClientCard {client} />
			</li>
		{/each}
	</ul>
{/if}
