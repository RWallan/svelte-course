<script lang="ts">
  import type { Snippet } from "svelte";

  interface ButtonProps {
    children: Snippet;
    onclick: ((e: MouseEvent) => void) | (() => void);
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
    background-color: black;
    color: whitesmoke;
    font-size: 24px;
    padding: 14px 40px;
    border-radius: 10px;
  }

  .nav-bar {
    padding: 10px 24px;
    font-size: 20px;
  }
</style>
