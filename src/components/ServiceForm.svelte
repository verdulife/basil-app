<script lang="ts">
	import type { Client, ServiceClient, Log } from '@/lib/types';
	import { nanoid } from 'nanoid';
	import { services } from '@/lib/stores';
	import { formatCurrency } from '@/lib/utils';
	import { PRICE_TYPE_LIB } from '@/lib/consts';

	import Button from '@/components/ui/Button.svelte';

	export let client: Client;
	let priceType: 'fixed' | 'hourly' = 'fixed';
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

	function saveServiceIfNew(service: ServiceClient) {
		const serviceExist = $services.find((s) => s.name.toLowerCase() === service.name.toLowerCase());
		const { weekdays, hours, log, ...cleanService } = service;
		if (!serviceExist) $services = [...$services, cleanService];
	}

	function handleSubmit(ev: SubmitEvent) {
		const target = ev.target as HTMLFormElement;
		if (!target) return;

		const formData = new FormData(target);
		const service: ServiceClient = {
			id: nanoid(),
			name: formData.get('name') as string,
			price: formData.get('price') as string,
			price_type: priceType,
			weekdays,
			hours: priceType === 'hourly' ? (formData.get('hours') as string) : null,
			log: []
		};

		let basePrice = service.price;
		if (service.hours) {
			basePrice = `${Number(service.hours) * Number(service.price)}`;
		}

		const extraPrice = '0';

		const currentLog: Log = {
			date: new Date().toISOString(),
			paid: 'no',
			paid_amount: '0',
			extras: [],
			to_pay: {
				base: basePrice,
				extra: extraPrice,
				total: `${Number(basePrice) + Number(extraPrice)}`
			}
		};

		service.log = [...service.log, currentLog];
		client.services = [...client.services, service];
		saveServiceIfNew(service);

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
			{#each $services as { id, name, price, price_type }}
				<option data-id={id} value={name}
					>Anterior: {formatCurrency(price)} ({PRICE_TYPE_LIB[price_type]})</option
				>
			{/each}
		</datalist>

		<label for="week">Días de la semana</label>
		<div class="grid grid-cols-4 gap-2">
			<label
				for="week-1"
				class="flex cursor-pointer items-center justify-center overflow-hidden text-ellipsis rounded border border-neutral-400 p-2"
				class:bg-neutral-200={weekdays.monday}
			>
				<span class="w-full overflow-hidden text-ellipsis text-center">Lunes</span>
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
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-2"
				class:bg-neutral-200={weekdays.tuesday}
			>
				<span class="w-full overflow-hidden text-ellipsis text-center">Martes</span>
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
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-2"
				class:bg-neutral-200={weekdays.wednesday}
			>
				<span class="w-full overflow-hidden text-ellipsis text-center">Miércoles</span>
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
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-2"
				class:bg-neutral-200={weekdays.thursday}
			>
				<span class="w-full overflow-hidden text-ellipsis text-center">Jueves</span>
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
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-2"
				class:bg-neutral-200={weekdays.friday}
			>
				<span class="w-full overflow-hidden text-ellipsis text-center">Viernes</span>
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
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-2"
				class:bg-neutral-200={weekdays.saturday}
			>
				<span class="w-full overflow-hidden text-ellipsis text-center">Sábado</span>
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
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-2"
				class:bg-neutral-200={weekdays.sunday}
			>
				<span class="w-full overflow-hidden text-ellipsis text-center">Domingo</span>
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

		<label for="price_type">Tipo de precio</label>
		<div class="grid grid-cols-2 gap-2">
			<label
				for="fixed_price"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-2"
				class:bg-neutral-200={priceType === 'fixed'}>Precio fijo</label
			>
			<input
				type="radio"
				id="fixed_price"
				name="price_type"
				value="fixed"
				class="sr-only"
				bind:group={priceType}
				required
			/>

			<label
				for="hourly_price"
				class="flex cursor-pointer items-center justify-center rounded border border-neutral-400 p-2"
				class:bg-neutral-200={priceType === 'hourly'}>Precio por hora</label
			>
			<input
				type="radio"
				id="hourly_price"
				name="price_type"
				value="hourly"
				class="sr-only"
				bind:group={priceType}
				required
			/>
		</div>

		{#if priceType === 'hourly'}
			<label for="hours">Horas contratadas al mes</label>
			<input
				type="text"
				id="hours"
				name="hours"
				class=" w-full rounded border border-neutral-400 p-2"
				required
			/>
		{/if}

		<label for="price">Precio {priceType === 'hourly' ? 'por hora' : 'fijo'}</label>
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

		<Button class="mt-4">Registrar</Button>
	</form>
{/if}
