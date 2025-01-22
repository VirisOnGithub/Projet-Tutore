<template>
  <div id="base" class="flex-column w-screen h-screen overflow-hidden">
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {useHead} from "@unhead/vue";

useHead({titleTemplate: "MovieFinder"});

</script>

<style scoped>
#base {
  background-image:
      linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
      url("/index_backdrop.webp");
}

</style>