<script setup lang="ts">
definePageMeta({
  layout: 'welcome-screen',
});

const { loggedIn } = useUserSession();

const buttonStyle : string = "w-full text-center bg-transparent font-semibold bg-violet-600 hover:bg-violet-500  hover:text-white py-2 px-4 hover:border-transparent active:bg-violet-700 rounded m-1 transition-all";
</script>

<template>
  <div class="flex h-screen w-screen justify-center items-center">
    <div class="flex flex-col items-center p-5 bg-gray-300 rounded-lg d bg-opacity-30 z-10">
      <div class="flex items-center mb-5">
        <img src="/main_logo.svg" class="inline-block size-24" alt="Website logo">
        <h1 class="inline-block text-white ml-2 font-bold text-7xl">MovieFinder</h1>
      </div>
      <hr>
      <NuxtLink to="/browse" :class="buttonStyle">Parcourir</NuxtLink>
      <hr>
      <NuxtLink to="/login" :class="buttonStyle" v-if="!loggedIn">Connexion</NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
