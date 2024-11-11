<script lang="ts">
  import { Button, SectionHeadline } from "$components";

  let contactName = $state("");
  let contactEmail = $state("");
  let informationAboutProject = $state("");
  let isFormInvalid = $state(false);
  let isEmailSent = $state(false);
  let showErrorMessage = $state(false);
  let isLoading = $state(false);

  const onSubmit = async (event: Event) => {
    event.preventDefault();

    if (contactEmail && contactName && informationAboutProject) {
      isLoading = true;
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          contactName,
          contactEmail,
          informationAboutProject,
        }),
        headers: { "Content-Type": "application/json" },
      });
      isLoading = false;
      if (response.ok) {
        isEmailSent = true;
      } else {
        showErrorMessage = true;
      }
    } else {
      isFormInvalid = true;
    }
  };

  $effect(() => {
    if (contactEmail || contactName || informationAboutProject) {
      isFormInvalid = false;
    }
  });
</script>

<section class="mt-l">
  <SectionHeadline sectionName="contact-form">Let's Talk</SectionHeadline>
  <div class="form-container default-margin mt-m">
    {#if isEmailSent}
      <div class="spinner-container">
        <h3>
          Thank you for getting in contact with me. I'll usally reply within 24
          hours.
        </h3>
      </div>
    {:else if isLoading}
      <div class="spinner-container">
        <div class="spinner"></div>
        <h3>Sending off the contact form.</h3>
      </div>
    {:else if showErrorMessage}
      <h3>
        We seem to have trouble with our server in the moment. Please send me an
        email directly to <a href="mailto:coding.rwallan@gmail.com" class="link"
          >coding.rwallan@gmail.com</a
        >
      </h3>
    {:else}
      <form>
        <input
          type="text"
          class="text-input mb-m"
          class:input-error={isFormInvalid && !Boolean(contactName.length)}
          placeholder="Your Name"
          bind:value={contactName}
        />
        <input
          type="text"
          class="text-input mb-m"
          class:input-error={isFormInvalid && !Boolean(contactEmail.length)}
          placeholder="Your Email"
          bind:value={contactEmail}
        />
        <textarea
          placeholder="Tell me what's up."
          class:input-error={isFormInvalid &&
            !Boolean(informationAboutProject.length)}
          bind:value={informationAboutProject}
        ></textarea>
        <Button onclick={onSubmit}>Submit</Button>
      </form>
    {/if}
    <div class="form-text">
      <h3 class="bold mb-s">Let's create a connection</h3>
      <p>
        I am always open to new opportunities to collaborate on challenging
        projects, innovative roles, and initiatives that strive to make a
        difference. With a strong passion for sharing knowledge and a constant
        drive to learn, I’m excited to contribute my experience and explore new
        professional horizons. Let’s connect! It would be a pleasure to discuss
        ideas, projects, or any opportunity to build impactful solutions and
        achieve great results together.
      </p>
    </div>
  </div>
</section>

<style>
  section {
    padding-bottom: 140px;
  }

  .form-container {
    display: flex;
    justify-content: space-between;
  }

  .form-text {
    width: 39%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 45%;
  }

  form * {
    font-size: 20px;
    font-family: "Lato", sans-serif;
    font-weight: 500;
    color: black;
  }

  textarea,
  input {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.035);
    border-radius: 8px;
    padding: 4px 12px;
    outline: none;
    border: none;
  }

  input {
    height: 48px;
  }

  textarea {
    height: 120px;
    margin-bottom: 40px;
  }

  textarea::placeholder,
  input::placeholder {
    font-size: 20px;
    font-weight: 400px;
  }

  .input-error {
    background-color: rgba(223, 87, 87, 0.667);
    color: white;
  }

  .input-error::placeholder {
    color: white;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #8e2d55;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: inline-block;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .spinner-container {
    display: flex;
  }
</style>
