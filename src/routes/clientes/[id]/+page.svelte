<script>
	import { page } from '$app/stores';
	import ClientView from '@/components/ClientView.svelte';

	const { id } = $page.params;
</script>

<ClientView {id} />
