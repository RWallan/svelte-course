<script lang="ts">
  import type { Snippet } from "svelte";

    interface ButtonProps {
        children: Snippet,
        onclick: ((e: MouseEvent) => void | (() => void));
        className?: string;
    }

  let { className, children, ...props }: ButtonProps = $props();
</script>

<button class={`btn ${className}`} {...props}>
    {@render children()}
</button>

<style>
  .btn {
    font-family: "Lato", sans-serif;
    font-weight: 500;
    background-color: #242d4e;
    color: whitesmoke;
    font-size: 24px;
    padding: 14px 40px;
    border-radius: 10px;
  }
</style>