<template>
  <div class="flex w-full flex-row flex-nowrap">
    <JobFiltersSideBar />
    <JobListings />
  </div>
</template>

<script lang="ts" setup>
import JobFiltersSideBar from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";
</script>
