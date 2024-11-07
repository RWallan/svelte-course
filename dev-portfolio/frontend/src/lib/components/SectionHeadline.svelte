<script lang="ts">
  import type { Snippet } from "svelte";

  interface HeadlineProps {
    children: Snippet;
    sectionName: string;
  }

  let { children, sectionName }: HeadlineProps = $props();
</script>

<div class="default-margin" id={sectionName}>
  <h2 >{@render children()}</h2>
  <div class="underscore mb-m"></div>
</div>
