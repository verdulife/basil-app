<script>
	const t = 't';
</script>

<ul class={`flex snap-x snap-mandatory scroll-p-4 items-center overflow-x-auto ${$$props.class}`}>
	<slot />
</ul>

<style>
	ul {
		scrollbar-width: none;
	}
</style>
