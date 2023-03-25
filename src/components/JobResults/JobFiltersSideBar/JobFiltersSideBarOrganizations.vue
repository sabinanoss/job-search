<template>
  <CollapsibleAccordion header="Organizations"
    ><div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in UNIQUE_ORGANIZATIONS"
            :key="organization"
            class="h-8 w-1/2"
          >
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script>
import { mapState } from "pinia";
import { useJobsStore, UNIQUE_ORGANIZATIONS } from "@/stores/jobs.js";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSideBarOrganizations",
  components: {
    CollapsibleAccordion,
  },
  data() {
    return {
      selectedOrganizations: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
  },
  methods: {
    selectOrganization() {
      console.log(this.selectOrganizations);
    },
  },
};
</script>
