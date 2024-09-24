<script lang="ts">
	import type { Client, Extra, Service, ServiceClient, Weekdays } from '@/lib/types';
	import { extras, services } from '@/lib/stores';
	import { nanoid } from 'nanoid';
	import { formatCurrency, onEnter } from '@/lib/utils';

	import Button from '@/components/ui/Button.svelte';
	import Trash from '@/assets/Trash.svelte';

	export let client: Client;
	let currentExtras: Extra[] = [];
	let extraName: string;
	let price: string = '0';
	let weekdays = {
		monday: false,
		tuesday: false,
		wednesday: false,
		thursday: false,
		friday: false,
		saturday: false,
		sunday: false
	};

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

	function saveServiceIfNew(service: ServiceClient) {
		const serviceExist = $services.find((s) => s.name.toLowerCase() === service.name.toLowerCase());
		const { weekdays, hours, extras, ...cleanService } = service;
		if (!serviceExist) $services = [...$services, cleanService];
	}

	function saveExtrasIfNew() {
		currentExtras.forEach((extra) => {
			const extraExist = $extras.find(
				(extra) => extra.name.toLowerCase() === extra.name.toLowerCase()
			);
			if (!extraExist) $extras = [...$extras, extra];
		});
	}

	function handleSubmit(ev: SubmitEvent) {
		const target = ev.target as HTMLFormElement;
		if (!target) return;

		const formData = new FormData(target);
		const service: ServiceClient = {
			id: nanoid(),
			name: formData.get('name') as string,
			hours: formData.get('hours') as string,
			weekdays,
			price: formData.get('price') as string,
			extras: currentExtras
		};
		client.services = [...client.services, service];

		saveServiceIfNew(service);
		saveExtrasIfNew();

		currentExtras = [];
		target.reset();
		window.history.back();
	}
</script>

{#if client}
	<form class="flex flex-col gap-2" on:submit|preventDefault={handleSubmit}>
		<label for="name">Servicio</label>
		<input
			list="services"
			type="text"
			id="name"
			name="name"
			class=" w-full rounded border border-neutral-400 p-2"
			required
			autocomplete="off"
		/>
		<datalist id="services">
			{#each $services as { id, name, price }}
				<option data-id={id} value={name}>{formatCurrency(price)}</option>
			{/each}
		</datalist>

		<label for="hours">Horas contratadas al mes</label>
		<input
			type="text"
			id="hours"
			name="hours"
			class=" w-full rounded border border-neutral-400 p-2"
			required
		/>

		<label for="week">Días de la semana</label>
		<div class="grid grid-cols-7 gap-2">
			<label
				for="week-1"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-4"
				class:bg-neutral-200={weekdays.monday}
			>
				Lunes
			</label>
			<input
				type="checkbox"
				id="week-1"
				name="week"
				value="lunes"
				class="sr-only"
				bind:checked={weekdays.monday}
			/>

			<label
				for="week-2"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-4"
				class:bg-neutral-200={weekdays.tuesday}
			>
				Martes
			</label>
			<input
				type="checkbox"
				id="week-2"
				name="week"
				value="martes"
				class="sr-only"
				bind:checked={weekdays.tuesday}
			/>

			<label
				for="week-3"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-4"
				class:bg-neutral-200={weekdays.wednesday}
			>
				Miércoles
			</label>
			<input
				type="checkbox"
				id="week-3"
				name="week"
				value="miercoles"
				class="sr-only"
				bind:checked={weekdays.wednesday}
			/>

			<label
				for="week-4"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-4"
				class:bg-neutral-200={weekdays.thursday}
			>
				Jueves
			</label>
			<input
				type="checkbox"
				id="week-4"
				name="week"
				value="jueves"
				class="sr-only"
				bind:checked={weekdays.thursday}
			/>

			<label
				for="week-5"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-4"
				class:bg-neutral-200={weekdays.friday}
			>
				Viernes
			</label>
			<input
				type="checkbox"
				id="week-5"
				name="week"
				value="viernes"
				class="sr-only"
				bind:checked={weekdays.friday}
			/>

			<label
				for="week-6"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-4"
				class:bg-neutral-200={weekdays.saturday}
			>
				Sábado
			</label>
			<input
				type="checkbox"
				id="week-6"
				name="week"
				value="sabado"
				class="sr-only"
				bind:checked={weekdays.saturday}
			/>

			<label
				for="week-7"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-4"
				class:bg-neutral-200={weekdays.sunday}
			>
				Domingo
			</label>
			<input
				type="checkbox"
				id="week-7"
				name="week"
				value="domingo"
				class="sr-only"
				bind:checked={weekdays.sunday}
			/>
		</div>

		<label for="price" class="">Precio por hora</label>
		<div class="relative">
			<input
				type="number"
				id="price"
				step="0.01"
				name="price"
				bind:value={price}
				class="w-full rounded border border-neutral-400 p-2 text-transparent"
				required
			/>
			<span class="pointer-events-none absolute left-0 w-full rounded border border-neutral-400 p-2"
				>{formatCurrency(price)}</span
			>
		</div>

		<label for="extras" class="">Extras</label>

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
				class="w-full rounded border border-neutral-400 p-2"
				bind:value={extraName}
				on:keydown={(ev) => onEnter(ev, addExtra)}
				autocomplete="off"
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
