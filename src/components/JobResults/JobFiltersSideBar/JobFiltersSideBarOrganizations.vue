<template>
  <JobFiltersSideBarCheckboxGroup
    :unique-values="UNIQUE_ORGANIZATIONS"
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";

import JobFiltersSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarCheckboxGroup.vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const jobsStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);

const userStore = useUserStore();
</script>
