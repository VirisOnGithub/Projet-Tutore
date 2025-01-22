<template>
  <div class="flex h-screen w-screen justify-center items-center bg-[#202020]">
    <img src="/index_backdrop.webp" alt="Background Image" class="fixed top-0 left-0 w-full h-full object-cover z-[-2]">
    <div id="gray-filter" class="absolute inset-0 z-[-1]" style="background: rgba(0, 0, 0, 0.8);"></div>
    <MovieCarousel />
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
