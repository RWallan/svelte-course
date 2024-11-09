<script lang="ts">
  let { data } = $props();
  const {
    company,
    name,
    dateAccomplished,
    stack,
    projectImageUrl,
    content,
    projectUrl,
  } = data.project;

  const getTagFromStyle = (style: ProcessedTextContent["style"]): string => {
    if (style === "normal") {
      return "p";
    }
    return style;
  };
</script>

<main class="default-margin work-page">
  <h4>{company}</h4>
  <div class="underscore"></div>
  <h2 class="mb-s">{name}</h2>
  <img src={projectImageUrl} alt="" class="project-image" />
  <div class="project-container mt-m">
    <div class="metadata">
      <h3 class="semi-bold">Date</h3>
      <p>{dateAccomplished.slice(0, 7)}</p>
      <h3 class="semi-bold mt-m">Tech Stack</h3>
      {#each stack as skill}
        <li>{skill}</li>
      {/each}
      <h3 class="semi-bold mt-m">Project URL</h3>
      <a href={projectUrl} class="underline">See the project</a>
    </div>
    <div class="project-text">
      {#each content as block}
        {#if block.type === "text"}
          <svelte:element this={getTagFromStyle(block.style)}
            >{block.textToRender}</svelte:element
          >
        {:else}
          <img src={block.url} alt="" class="content-image" />
        {/if}
      {/each}
    </div>
  </div>
</main>
