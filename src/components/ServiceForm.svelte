<script lang="ts">
	import type { Client, Extra, Service } from '@/lib/types';
	import { extras, services } from '@/lib/stores';
	import { nanoid } from 'nanoid';
	import { formatCurrency, onEnter } from '@/lib/utils';

	import Button from '@/components/ui/Button.svelte';
	import Trash from '@/assets/Trash.svelte';

	export let client: Client;
	let serviceType: 'semanal' | 'mensual' = 'semanal';
	let currentExtras: Extra[] = [];
	let extraName: string;
	let price: string = '60';

	function addExtra() {
		const extra = {
			id: nanoid(),
			name: extraName,
			price: '0'
		};

		currentExtras = [...currentExtras, extra];
		extraName = '';
	}

	function removeExtra(id: string) {
		currentExtras = currentExtras.filter((extra) => extra.id !== id);
	}

	function saveServiceIfNew(service: Service) {
		client.services = [...client.services, service];
		const serviceExist = $services.find((service) => service.id === service.id);
		if (!serviceExist) $services = [...$services, service];
	}

	function saveExtrasIfNew() {
		currentExtras.forEach((extra) => {
			const extraExist = $extras.find((extra) => extra.id === extra.id);
			if (!extraExist) $extras = [...$extras, extra];
		});
	}

	function handleSubmit(ev: SubmitEvent) {
		const target = ev.target as HTMLFormElement;
		if (!target) return;

		const formData = new FormData(target);
		const service = {
			id: nanoid(),
			name: formData.get('name') as string,
			type: serviceType,
			hours: formData.get('hours') as string,
			price: formData.get('price') as string,
			extras: currentExtras
		};

		saveServiceIfNew(service);
		saveExtrasIfNew();

		currentExtras = [];
		target.reset();
		window.history.back();
	}
</script>

{#if client}
	<form class="flex flex-col gap-2" on:submit|preventDefault={handleSubmit}>
		<label for="name" class="block">Servicio</label>
		<input
			list="services"
			type="text"
			id="name"
			name="name"
			class="block w-full rounded border border-neutral-400 p-2"
			required
			autocomplete="off"
		/>
		<datalist id="services">
			{#each $services as { name }}
				<option value={name} />
			{/each}
		</datalist>

		<div class="grid grid-cols-2 gap-2">
			<label
				for="type-1"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-4"
				class:bg-neutral-200={serviceType === 'semanal'}>Semanal</label
			>
			<input
				type="radio"
				id="type-1"
				name="type"
				value="semanal"
				class="sr-only"
				bind:group={serviceType}
				required
			/>

			<label
				for="type-2"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-4"
				class:bg-neutral-200={serviceType === 'mensual'}>Mensual</label
			>
			<input
				type="radio"
				id="type-2"
				name="type"
				value="mensual"
				class="sr-only"
				bind:group={serviceType}
				required
			/>
		</div>

		<label for="hours" class="block">Horas contratadas</label>
		<input
			type="text"
			id="hours"
			name="hours"
			class="block w-full rounded border border-neutral-400 p-2"
			required
		/>

		<label for="price" class="block">Precio por hora</label>
		<div class="relative">
			<input
				type="number"
				id="price"
				step="0.01"
				name="price"
				bind:value={price}
				class="w-full rounded border border-neutral-400 p-2"
				required
			/>
			<span
				class="absolute left-0 pointer-events-none w-full rounded border border-neutral-400 p-2"
				>{formatCurrency(price)}</span
			>
		</div>

		<label for="currentExtras" class="block">Extras</label>

		{#if currentExtras.length}
			<ul class="flex flex-col gap-2">
				{#each currentExtras as { id, name, price }}
					<li class="flex items-center gap-2 rounded border border-neutral-400 bg-neutral-200 p-2">
						<p class="w-full">{name}</p>
						<input
							type="text"
							name="extra_price"
							value={price}
							class="rounded border border-neutral-400 p-2"
						/>
						<button type="button" on:click={() => removeExtra(id)}>
							<Trash />
						</button>
					</li>
				{/each}
			</ul>
		{/if}

		<div class="flex items-center gap-2">
			<input
				list="extras"
				type="text"
				id="currentExtras"
				name="currentExtras"
				class="block w-full rounded border border-neutral-400 p-2"
				bind:value={extraName}
				on:keydown={(ev) => onEnter(ev, addExtra)}
			/>
			<datalist id="extras">
				{#each $extras as { name, price }}
					<option value={name}>{formatCurrency(price)}</option>>
				{/each}
			</datalist>

			<Button type="button" on:click={addExtra}>Añadir</Button>
		</div>

		<Button class="mt-4">Registrar</Button>
	</form>
{/if}
