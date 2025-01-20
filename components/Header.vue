<template>
  <header class="row bg-dark p-3 z-[3]">
    <nav class="flex flex-wrap items-center justify-between bg-dark p-3 z-[3] relative">
      <NuxtLink to="/" class="flex items-center">
        <img src="/main_logo.svg" class="align-top">
        <h1 class="inline-block text-white ml-2">MovieFinder</h1>
      </NuxtLink>
      <ul class="flex flex-row space-x-4">
        <li>
          <NuxtLink to="/" class="btn btn-outline-primary">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="btn btn-outline-primary">Movies</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="btn btn-outline-primary">TV Shows</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="btn btn-outline-primary">People</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="btn btn-outline-primary">More</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/movie/762509" class="btn btn-outline-primary">The Lion King</NuxtLink>
        </li>
      </ul>
      <div class="flex">
        <input
            class="form-control border border-primary text-primary bg-secondary bg-opacity-10 placeholder-primary focus:ring-primary focus:ring-2"
            type="text" placeholder="Search"/>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>

</script>

<style scoped>
/* Scoped styles not needed in Tailwind transformation */
</style>