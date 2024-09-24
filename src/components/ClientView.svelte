<script>
	import { clients } from '@/lib/stores';
	import Link from '@/components/ui/Link.svelte';

	export let id;
	const client = $clients.find((client) => client.id === id);
</script>

{#if client}
	<article class="flex flex-col gap-4 p-4">
		<h1>{client.name}</h1>
		<p>
			{client.address.street}, {client.address.city}, {client.address.state}
		</p>
		<p>{client.contact.phone}</p>
		<p>{client.contact.email}</p>

		<Link href="/registrar/servicio/{id}">Registrar servicio</Link>
	</article>
{/if}
