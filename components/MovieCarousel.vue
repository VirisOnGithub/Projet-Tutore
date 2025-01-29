<!-- 
    Carrousel d'accueil de films récents
-->

<template>
  <div v-if="isLoading" class="flex justify-center items-center h-72 text-2xl">Loading...</div>
  <UCarousel v-else :items="paths" :config="carouselConfig" arrows>
    <template #default="{ item }">
      <div class="carousel__item hover:scale-105 transform transition-transform">
        <NuxtLink :to="'/movie/' + item.id">
          <img :src="'https://image.tmdb.org/t/p/w500' + item.path" :alt="item.id" class="w-1/2">
        </NuxtLink>
      </div>
    </template>
  </UCarousel>
</template>

<script lang="ts" setup>

interface Movie {
  id: number;
  path: string;
}

// Configuration du carousel
const carouselConfig = {
  itemsToShow: 2,
  wrapAround: true,
  autoplay: true,
  autoplayTimeout: 3000,
  pauseAutoplayOnHover: true,
};

const paths = ref<{ id: number; path: string }[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  const trendings = await $fetch("/api/getTrendingMovies", {
    method: "POST",
    body: {
      page: 1
    }
  });
  paths.value = trendings.results.map((data: any) => ({ path: data.poster_path, id: data.id }));
  isLoading.value = false;
});
</script>

<style scoped>
.carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>