<script>
	import "../app.css";
	import { initializeFirebase } from '$lib/config.ts'
	import { onMount } from 'svelte';

	onMount(() => {
		// initializeFirebase();
	})

</script>

<slot />