<script lang="ts">
  import { Button } from "$components";

  interface ComponentProps {
    isRegistration?: boolean;
  }
  let { isRegistration }: ComponentProps = $props();
</script>

<div class="default-margin auth-container">
  <h1 class="mb-l">{isRegistration ? "Register" : "Login"}</h1>
  <div class="form-and-social-login">
    <form class="auth-form">
      {#if isRegistration}
        <input type="text" placeholder="Name" name="name" />
      {/if}
      <input type="text" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      {#if isRegistration}
        <input
          type="password"
          placeholder="Confirm password"
          name="passwordConfirmation"
        />
      {/if}
      <Button type="submit">{isRegistration ? "Register" : "Login"}</Button>
      {#if isRegistration}
        <p class="auth-hint mt-s">
          Already have an account? <a href="/login">Log In.</a>
        </p>
      {:else}
        <p class="auth-hint mt-s">
          Do not have an account yet? <a href="/register">Create an account.</a>
        </p>
      {/if}
    </form>
    <div class="social-login"></div>
  </div>
</div>
