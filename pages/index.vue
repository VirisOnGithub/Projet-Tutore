<script setup lang="ts">
import {useHead} from "@unhead/vue";

useHead({titleTemplate: "MovieFinder"});
</script>

<template>
  <div id="imageWrapper" class="z-[-1] relative">
    <img class="" src="public/index_backdrop.webp" alt="Backdrop"/>
  </div>
  <div id="gray-filter" class="absolute inset-0 w-screen h-auto" style="background: rgba(0, 0, 0, 0.5);"></div>
</template>

<style scoped>

</style>
