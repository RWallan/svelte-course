<script>
	import { AuthForm } from '$components';

	let { form } = $props();
</script>

<AuthForm isRegistration={false} {form} />
