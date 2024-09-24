<script>
	import { routes } from '@/lib/routes';
	import { ICONS_ENUM } from '@/lib/consts';

	import Calendar from '@/assets/Calendar.svelte';
	import Users from '@/assets/Users.svelte';
	import Report from '@/assets/Report.svelte';
	import Settings from '@/assets/Settings.svelte';
</script>

<footer class="border-t border-neutral-400">
	<nav>
		<ul class="grid grid-cols-4">
			{#each routes as route}
				<li>
					<a href={route.path} class="flex w-full flex-col items-center justify-center p-4">
						{#if ICONS_ENUM.calendar === route.icon}
							<Calendar />
						{:else if ICONS_ENUM.users === route.icon}
							<Users />
						{:else if ICONS_ENUM.report === route.icon}
							<Report />
						{:else if ICONS_ENUM.settings === route.icon}
							<Settings />
						{/if}
						<span>{route.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</footer>
