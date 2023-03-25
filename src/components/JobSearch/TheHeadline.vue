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

<script>
import nextElementInList from "@/utils/nextElementInList.js";

export default {
  name: "TheHedline",
  data() {
    return {
      action: "Build",
      interval: null,
    };
  },
  computed: {
    actionClasses() {
      return {
        [this.action.toLowerCase()]: true,
      };
    },
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"];
        this.action = nextElementInList(actions, this.action);
      }, 3000);
    },
  },
};
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
