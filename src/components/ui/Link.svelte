<script>
	export let href;
</script>

<a {href} class={`rounded bg-green-400 px-6 py-3 text-sm text-center font-medium ${$$props.class}`}>
	<slot />
</a>
