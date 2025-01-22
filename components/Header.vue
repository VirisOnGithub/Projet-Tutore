<template>
  <header class="row p-3 font-['Inter']">
    <nav class="flex flex-wrap items-center justify-between p-3 z-[3] relative">
      <NuxtLink to="/carousel" class="flex items-center">
        <img src="/main_logo.svg" class="align-top" alt="Website logo">
        <h1 class="inline-block text-white ml-2 font-bold text-4xl">MovieFinder</h1>
      </NuxtLink>
      <ul class="flex">
        <li>
          <NuxtLink to="/login" :class="buttonStyle">Sign in</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/carousel" :class="buttonStyle">Movies</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/carousel" :class="buttonStyle">TV Shows</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/carousel" :class="buttonStyle">People</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" :class="buttonStyle">More</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/movie/762509" :class="buttonStyle">The Lion King</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>

const buttonStyle : string = "bg-transparent font-semibold hover:bg-blue-500  hover:text-white py-2 px-4 hover:border-transparent active:bg-blue-700 rounded m-1 transition-all";


</script>

<style scoped>
/* Scoped styles not needed in Tailwind transformation */
</style>