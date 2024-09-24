<script>
	import { clients } from '@/lib/stores';
	import ClientCard from '@/components/ClientCard.svelte';

	const services = $clients.filter((client) => client.services?.length > 0);
</script>

{#if services.length === 0}
	<div>
		<p>Ningun cliente registrado para hoy</p>
	</div>
{:else}
	<ul class="flex flex-col gap-2">
		{#each services as client}
			<li>
				<ClientCard {client} />
			</li>
		{/each}
	</ul>
{/if}
