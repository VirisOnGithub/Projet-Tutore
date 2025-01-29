<template>
  <div class="flex absolute top-0 left-0 h-screen w-screen justify-center items-center bg-[#202020]">
    <div class="block">
      <h1 class="text-4xl font-bold mb-10">Films tendances en ce moment</h1>
      <MovieCarousel />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({titleTemplate: "Parcourir les films"});
</script>

<style scoped>

</style>
