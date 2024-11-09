<script lang="ts">
  import SectionHeadline from "$components/SectionHeadline.svelte";

  interface SkillsSectionProps {
    skills: Skill[];
  }

  let { skills }: SkillsSectionProps = $props();
  $inspect(skills[0].icon);
</script>

<section class="mt-l">
  <SectionHeadline sectionName="skills-section">Skills</SectionHeadline>
  <div class="wrapper default-margin">
    <div class="skills-container mt-m">
      {#each skills as skill}
        <i class={skill.icon}></i>
      {/each}
    </div>
  </div>
</section>
