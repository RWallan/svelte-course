<script lang="ts">
  import { Button, SectionHeadline } from "$components";
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
        statistical modeling, and machine learning. Currently, I apply my skills
        at ScientifiCloud, where I dive into Python, R, and tools like
        LangChain, FastAPI, ScikitLearn, BigQuery and other databases to bring
        insights and innovative solutions to life.
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
        className="mt-m"
        onclick={() => {
          goto("/#contact-form");
        }}>Tell me about your project!</Button
      >
    </div>
  </div>
</section>
