<script>
	import '@/app.css';
	import Header from '@/components/Header.svelte';
	import Nav from '@/components/Nav.svelte';
</script>

<div class="flex h-dvh flex-col overflow-hidden text-pretty">
	<Header />
	<main class="flex-1 overflow-y-auto overscroll-contain">
		<slot></slot>
	</main>
	<Nav />
</div>
