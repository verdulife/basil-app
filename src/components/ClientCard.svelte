<script>
	export let client;
</script>

<a href="/clientes/{client.id}">
	<article class="flex flex-col rounded border p-4">
		<h2 class="text-xl">{client.name}</h2>
		<p>{client.address.city}, {client.address.state}</p>
	</article>
</a>
