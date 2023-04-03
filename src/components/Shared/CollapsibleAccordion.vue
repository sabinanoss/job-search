<template>
  <div class="border-b border-solid border-brand-grey-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      role="button"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <FontAwesome :icon="caretIcon" class="ml-4 mr-3" />
    </div>

    <div v-if="isOpen" class="mt-5 w-full">
      <slot>
        <p>whoops, somebody forgot to populate me</p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

defineProps({
  header: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};

const caretIcon = computed(() =>
  isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]
);
</script>
