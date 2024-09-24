<script>
	import { routes } from '@/lib/routes';
	import { page } from '$app/stores';

	$: ({ pathname } = $page.url);
	$: currentPath = routes.find((route) => route.path === pathname)?.name;
</script>

{#if currentPath}
	<header class="border-b border-neutral-400 p-4">
		<p class="text-2xl font-bold">{currentPath}</p>
	</header>
{/if}
