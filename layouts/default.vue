<template>
  <body>
  <div class="flex-column w-screen h-screen overflow-hidden">
    <Header />
    <slot />
  </div>
  </body>
</template>

<script lang="ts" setup>

import {useHead} from "@unhead/vue";

useHead({titleTemplate: "MovieFinder"});

</script>

<style>

</style>