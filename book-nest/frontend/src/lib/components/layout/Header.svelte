<script lang="ts">
  import logo from "$assets/app-logo.svg";
  import { Button } from "$components";
</script>

<header>
  <a href="/">
    <img src={logo} alt="Go to home" class="logo" />
  </a>
  <nav>
    <ul>
      <li><Button isMenu={true} href="/register">Create account</Button></li>
      <li>
        <Button isMenu={true} isSecondary={true} href="/login">Login</Button>
      </li>
    </ul>
  </nav>
</header>
