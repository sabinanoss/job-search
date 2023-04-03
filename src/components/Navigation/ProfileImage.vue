<template>
  <img
    :src="imageLink"
    alt="Profile image"
    class="h-8 w-8 rounded-3xl object-contain hover:outline hover:outline-4 hover:outline-brand-grey-1"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const imageLink = ref("https://randomuser.me/api/portraits/men/1.jpg");
</script>
