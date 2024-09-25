<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null = null;
</script>

<button
	{type}
	class={`rounded bg-green-400 px-6 py-3 text-sm font-medium text-center ${$$props.class}`}
	on:click
>
	<slot />
</button>
