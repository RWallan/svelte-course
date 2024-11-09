<script lang="ts">
  import { Button, SectionHeadline } from "$components";

  const onSubmit = (event: Event) => {
    event.preventDefault();
    console.log(event);
  };
</script>

<section class="mt-l">
  <SectionHeadline sectionName="contact-form">Let's Talk</SectionHeadline>
  <div class="form-container default-margin mt-m">
    <form>
      <input type="text" class="text-input mb-m" placeholder="Your Name" />
      <input type="text" class="text-input mb-m" placeholder="Your Email" />
      <textarea placeholder="Tell me what's up."></textarea>
      <Button onclick={onSubmit}>Submit</Button>
    </form>
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
