<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$components";
</script>

<section class="hero-section default-margin">
  <h3>Hello, I'm Richard</h3>
  <div class="underscore mb-m"></div>
  <h1>I'm a Data Scientist uncovering insights and building</h1>
  <h1 class="dark-red">data-driven solutions.</h1>

  <Button
    onclick={() => {
      goto("/#contact-form");
    }}>Let's Talk!</Button
  >
</section>

<style>
  .hero-section {
    padding-top: 60px;
  }
</style>
