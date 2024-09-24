<script lang="ts">
	import type { Client } from '@/lib/types';
	import { clients } from '@/lib/stores';
	import { nanoid } from 'nanoid';

	import Button from '@/components/ui/Button.svelte';

	function handleSubmit(ev: SubmitEvent) {
		const target = ev.target as HTMLFormElement;
		if (!target) return;

		const formData = new FormData(target);
		const client: Client = {
			id: nanoid(),
			name: formData.get('name') as string,
			contact: {
				phone: formData.get('phone') as string,
				email: formData.get('email') as string
			},
			address: {
				street: formData.get('street') as string,
				city: formData.get('city') as string,
				state: formData.get('state') as string
			},
			services: []
		};

		clients.update((clients) => [client, ...clients]);
		target.reset();
		window.history.back();
	}
</script>

<form class="flex flex-col gap-2" on:submit|preventDefault={handleSubmit}>
	<label for="name" class="block">Nombre</label>
	<input
		type="text"
		id="name"
		name="name"
		class="block w-full rounded border border-neutral-400 p-2"
		required
	/>

	<label for="email" class="block">Email</label>
	<input
		type="email"
		id="email"
		name="email"
		class="block w-full rounded border border-neutral-400 p-2"
	/>

	<label for="phone" class="block">Teléfono</label>
	<input
		type="tel"
		id="phone"
		name="phone"
		class="block w-full rounded border border-neutral-400 p-2"
	/>

	<label for="street" class="block">Calle</label>
	<input
		type="text"
		id="street"
		name="street"
		class="block w-full rounded border border-neutral-400 p-2"
		required
	/>

	<label for="city" class="block">Ciudad</label>
	<input
		type="text"
		id="city"
		name="city"
		class="block w-full rounded border border-neutral-400 p-2"
		required
	/>

	<label for="state" class="block">Provincia</label>
	<input
		type="text"
		id="state"
		name="state"
		class="block w-full rounded border border-neutral-400 p-2"
		required
	/>

	<Button class="mt-4">Registrar</Button>
</form>
