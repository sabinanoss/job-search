<template>
  <div class="h-16 w-full border-b border-solid border-brand-grey-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <FontAwesome icon="fa-solid fa-search" class="mr-3" />
        <span><span class="text-brand-green-1">1695</span> jobs matched</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSubnav",
  computed: {
    onJobResultsPage() {
      return this.$route.name === "JobResults";
    },
  },
};
</script>
