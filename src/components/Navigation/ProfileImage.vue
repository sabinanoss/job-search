<template>
  <img
    :src="imageLink"
    alt="Profile image"
    class="h-8 w-8 rounded-3xl object-contain hover:outline hover:outline-4 hover:outline-brand-grey-1"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink: "https://randomuser.me/api/portraits/men/1.jpg",
    };
  },
};
</script>
