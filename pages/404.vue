<!-- 
    Page 404
-->

<script setup lang="ts">
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'welcome-screen',
});

useHead({titleTemplate: "Page introuvable"});

const router = useRouter();

/**
 * Retourne à la page d'accueil
 */
const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-xl text-gray-600 mb-5">Oups ! Il semblerait qu'un problème soit arrivé.</p>
    <button @click="goHome" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
      Retourner à l'accueil
    </button>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>