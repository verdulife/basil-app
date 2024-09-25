<script lang="ts">
	import { clients } from '@/lib/stores';
	import { WEEKDAYS_LIB } from '@/lib/consts';

	import Link from '@/components/ui/Link.svelte';
	import Slider from '@/components/Slider.svelte';
	import Slide from '@/components/Slide.svelte';

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

		<Slider>
			{#each client.services as { name, price, weekdays }}
				<Slide>
					<h2>{name}</h2>
					<p>Precio: {price}</p>
					<p>
						Días: {#each Object.entries(weekdays) as [day, isWeekday]}
							{#if isWeekday}
								{WEEKDAYS_LIB[day]}
							{/if}
						{/each}
					</p>
				</Slide>
			{/each}
		</Slider>

		<Link href="/registrar/servicio/{id}">Registrar servicio</Link>
	</article>
{/if}
