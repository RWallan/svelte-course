<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$components";
</script>

<nav class="default-margin navbar">
  <a href="'/" class="logo">RW</a>
  <div class="navbar-links">
    <a href="/#about-me" class="nav-link">About Me</a>
    <a href="/#my-work" class="nav-link">Work</a>
    <Button
      className="nav-bar"
      onclick={() => {
        goto("#contact-form");
      }}>Contact</Button
    >
  </div>
</nav>
