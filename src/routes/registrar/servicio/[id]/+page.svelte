<script>
	import { page } from '$app/stores';
	import { clients } from '@/lib/stores';
	import ServiceForm from '@/components/ServiceForm.svelte';

	const { id } = $page.params;
	const clientIndex = $clients.findIndex((client) => client.id === id);
</script>

{#if clientIndex > -1}
	<section class="flex flex-col gap-4 p-4">
		<h1>Registrar servicio para {$clients[clientIndex].name}</h1>
		<ServiceForm bind:client={$clients[clientIndex]} />
	</section>
{/if}
