<template>
  <div class="flex-column w-screen h-screen overflow-hidden bg-[#202020]">
    <Header />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {useHead} from "@unhead/vue";

useHead({titleTemplate: "MovieFinder"});

</script>

<style>

</style>