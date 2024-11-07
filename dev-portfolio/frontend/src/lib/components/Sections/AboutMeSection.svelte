<script lang="ts">
  import { Button, ExperienceTable, SectionHeadline } from "$components";
  import profile from "$assets/profile.jpg";
  import { goto } from "$app/navigation";
</script>

<section class="about-me mt-l">
  <SectionHeadline sectionName={"about-me"}>About Me</SectionHeadline>

  <div class="mt-m content-container default-margin">
    <img src={profile} alt="" class="image" />
    <div class="text">
      <p>
        Hey, I'm Richard, a Data Scientist with a background in Statistics and a
        passion for creating impactful, data-driven solutions.
      </p>
      <p>
        I've had the opportunity to work with diverse datasets and tackle
        complex problems, developing my expertise in data manipulation,
        statistical modeling, machine learning and Large Language Models
        applications.
      </p>
      <p>
        Beyond coding, I value clear communication and collaboration. I thrive
        on making complex data accessible and actionable, crafting everything
        from insightful reports to dynamic dashboards with Svelte. With hands-on
        experience across sectors, I'm here to translate data into strategic,
        real-world insights that drive results.
      </p>
      <p>
        Let’s connect if you're interested in making data work smarter and
        better for impactful decisions.
      </p>

      <Button
        className="mt-s"
        onclick={() => {
          goto("/#contact-form");
        }}>Tell me about your project!</Button
      >
    </div>
  </div>

  <ExperienceTable />
</section>

<style>
  .content-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  .image {
    width: 42%;
    border-radius: 20px;
    object-fit: cover;
  }

  .text {
    width: 55%;
    text-align: left;
  }
</style>
