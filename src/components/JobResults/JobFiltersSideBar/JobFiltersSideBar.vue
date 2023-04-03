<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-grey-1 bg-white p-4"
  >
    <section class="pb-5">
      <JobFiltersSideBarPrompt />

      <JobFiltersSideBarSkills />

      <CollapsibleAccordion header="Degrees">
        <JobFiltersSideBarDegrees />
      </CollapsibleAccordion>

      <CollapsibleAccordion header="Job Types">
        <JobFiltersSideBarJobTypes />
      </CollapsibleAccordion>

      <CollapsibleAccordion header="Oganizations">
        <JobFiltersSideBarOrganizations />
      </CollapsibleAccordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import JobFiltersSideBarDegrees from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarDegrees.vue";
import JobFiltersSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarJobTypes.vue";
import JobFiltersSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarOrganizations.vue";
import JobFiltersSideBarPrompt from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarPrompt.vue";
import JobFiltersSideBarSkills from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarSkills.vue";

import { useUserStore } from "@/stores/user";

const route = useRoute();
const userStore = useUserStore();

const parseSkillsSearchTerm = () => {
  const role = (route.query.role as string) || "";
  userStore.UPDATE_SKILLS_SEARCH_TERM(role);
};

onMounted(parseSkillsSearchTerm);
</script>
