<template>
  <main class="flex h-screen flex-col">
    <section class="pt-10 pb-20">
      <div class="my-0 mx-auto max-w-7xl">
        <div class="grid grid-cols-12">
          <div class="col-span-5 col-start-1">
            <TheHeadline />
            <JobSearchForm />
          </div>
          <div class="col-span-5 col-start-8 self-center justify-self-center">
            <img
              class="h-80 w-80 object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png"
              alt="Vue logo"
            />
          </div>
        </div>
      </div>
    </section>

    <SpotLight class="flex flex-row justify-center pb-16">
      <template #default="{ img, title, description }">
        <routerlink
          to="/jobs/results"
          class="mx-5 flex h-96 w-72 flex-col rounded-lg border bg-brand-grey-2"
        >
          <img :src="img" class="object-contain" />

          <div class="mt-3 h-48 py-4 px-6">
            <h3 class="text-lg font-medium">{{ title }}</h3>

            <p class="mt-3 text-sm">{{ description }}</p>
          </div>
          <router-link
            to="/jobs/results"
            class="px-6 pb-4 text-sm text-brand-blue-1"
            >See Jobs</router-link
          >
        </routerlink>
      </template>
    </SpotLight>
  </main>
</template>

<script>
import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";
import SpotLight from "@/components/JobSearch/SpotLight.vue";

export default {
  name: "TheHero",
  components: {
    TheHeadline,
    JobSearchForm,
    SpotLight,
  },
};
</script>
