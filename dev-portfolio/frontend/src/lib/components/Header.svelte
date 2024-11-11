<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$components";
</script>

<nav class="default-margin navbar">
  <a href="/" class="logo">RW</a>
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

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .logo {
    font-size: 35px;
    font-weight: bold;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 60px;
  }

  .nav-link {
    position: relative;
  }

  .nav-link::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: #8e2d55;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  .nav-link:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
</style>
