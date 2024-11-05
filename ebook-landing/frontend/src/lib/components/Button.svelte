<script>
  import {loadStripe} from '@stripe/stripe-js'
  import {PUBLIC_FRONTEND_URL, PUBLIC_STRIPE_KEY} from '$env/static/public';
  import {goto} from '$app/navigation';

  let { children, ...props } = $props();

  const onclick = async () => {
    try {
        const stripe = await loadStripe(PUBLIC_STRIPE_KEY)

        const response = await fetch('http://localhost:8000/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success_url: `${PUBLIC_FRONTEND_URL}/checkout/success`,
                cancel_url: `${PUBLIC_FRONTEND_URL}/checkout/failure`,
            })
        })

        const data = await response.json()
        await stripe.redirectToCheckout({sessionId: data.session_id})
    } catch (err) {
        goto('/checkout/failure')
    }
  }
</script>

<button {...props} {onclick}>{@render children()}</button>

<style>
    button {
        background-color: black;
        color: whitesmoke;
        padding: 20px 24px;
        font-weight: normal;
        font-size: 22px;
        text-transform: uppercase;
        transition: all 0.3s;
        border: 1px solid whitesmoke;
    }

    button:hover {
        background-color: whitesmoke;
        color: black;
    }
</style>