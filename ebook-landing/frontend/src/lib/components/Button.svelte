<script>
  let { children, ...props } = $props();
</script>

<button {...props}>{@render children()}</button>

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