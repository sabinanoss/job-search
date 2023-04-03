<template>
  <section class="mb-16">
    <h1 class="mb-10 text-7xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br />
      <span>for everyone</span>
    </h1>
    <h2 class="text-3xl font-light">Find you next job at Job Search</h2>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import nextElementInList from "@/utils/nextElementInList";

const action = ref("Build");
const interval = ref<ReturnType<typeof setInterval>>();

const actionClasses = computed(() => {
  return {
    [action.value.toLowerCase()]: true,
  };
});

const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ["Build", "Create", "Design", "Code"];
    action.value = nextElementInList(actions, action.value);
  }, 3000);
};
onMounted(changeTitle);
onBeforeUnmount(() => clearInterval(interval.value));
</script>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
