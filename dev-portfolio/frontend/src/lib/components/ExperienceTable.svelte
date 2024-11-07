<script lang="ts">
  interface WorkExperience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate?: string;
  }

  const workExperience: WorkExperience[] = [
    {
      jobTitle: "Data Scientist JR",
      company: "ScientifiCloud",
      startDate: "2021-12",
    },
    {
      jobTitle: "Statistician Trainee",
      company: "DataSenado",
      startDate: "2019-05",
      endDate: "2021-05",
    },
    {
      jobTitle: "Statistics Consultant JR",
      company: "Estat Consultoria",
      startDate: "2018-01",
      endDate: "2019-06",
    },
  ];
</script>

<section class="default-margin work-experience-mt-m">
  <ul class="work-experience-list">
    {#each workExperience as job}
      <li class="work-item">
        <article>
          <h3 class="semi-bold mb-xs">{job.jobTitle}</h3>
          <div class="company-and-date">
            <p>{job.company}</p>
            <p class="dark-grey">
              {job.startDate}
              {#if job.endDate}
                / {job.endDate}
              {:else}
                / present
              {/if}
            </p>
          </div>
        </article>
      </li>
    {/each}
  </ul>
  <h2 class="headline">Past Work <br /> Experience</h2>
</section>
