<script lang="ts">
	import type { Client, ServiceClient, Weekday } from '@/lib/types';
	import { nanoid } from 'nanoid';
	import { services } from '@/lib/stores';
	import { formatCurrency, getWeekday } from '@/lib/utils';
	import { PRICE_TYPE_LIB, WEEKDAYS_LIB } from '@/lib/consts';

	import Button from '@/components/ui/Button.svelte';

	export let client: Client;
	let priceType: 'fixed' | 'hourly' = 'fixed';
	let price: string = '0';
	let weekday: Weekday = getWeekday();
	let date = new Date();

	function saveServiceIfNew(service: ServiceClient) {
		const serviceExist = $services.find((s) => s.name.toLowerCase() === service.name.toLowerCase());
		const { weekday, hours, date, paid, paid_amount, to_pay, ...cleanService } = service;
		if (!serviceExist) $services = [...$services, cleanService];
	}

	function handleSubmit(ev: SubmitEvent) {
		const target = ev.target as HTMLFormElement;
		if (!target) return;

		const formData = new FormData(target);
		let basePrice = formData.get('price') as string;
		let hours = formData.get('hours') as string;
		const extraPrice = '0';
		if (hours) {
			basePrice = `${Number(hours) * Number(basePrice)}`;
		}

		const service: ServiceClient = {
			id: nanoid(),
			name: formData.get('name') as string,
			price: formData.get('price') as string,
			price_type: priceType,
			weekday,
			hours: priceType === 'hourly' ? (formData.get('hours') as string) : null,
			date,
			paid: 'no',
			paid_amount: '0',
			to_pay: {
				base: basePrice,
				extra: extraPrice,
				total: `${Number(basePrice) + Number(extraPrice)}`
			}
		};

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

		<label for="date">Fecha</label>
		<input
			type="date"
			id="date"
			name="date"
			class=" w-full rounded border border-neutral-400 p-2"
			bind:value={date}
		/>

		<label for="week">Días de la semana</label>
		<div class="grid grid-cols-4 gap-2">
			{#each Object.entries(WEEKDAYS_LIB) as [day, name]}
				<label
					for={day}
					class="flex cursor-pointer items-center justify-center overflow-hidden text-ellipsis rounded border border-neutral-400 p-2"
					class:bg-neutral-200={weekday === day}
				>
					<span class="w-full overflow-hidden text-ellipsis text-center capitalize">{name}</span>
				</label>
				<input
					type="radio"
					id={day}
					name="weekday"
					value={day}
					class="sr-only"
					bind:group={weekday}
				/>
			{/each}
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
			<label for="hours">Horas dedicadas</label>
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
