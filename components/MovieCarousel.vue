<template>
  <div v-if="isLoading" class="flex justify-center items-center h-72 text-2xl">Loading...</div>
  <UCarousel v-else :items="paths" :config="carouselConfig" arrows>
    <template #default="{ item }">
      <div class="carousel__item">
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

const carouselConfig = {
  itemsToShow: 2,
  wrapAround: true,
  autoplay: true,
  autoplayTimeout: 3000,
  pauseAutoplayOnHover: true,
};

const paths = ref<{ id: number; path: string }[]>([]);
const isLoading = ref(true);

const fetchPosters = async () => {
  try {
    const response = await fetch('/api/getTrendingMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching poster:', error);
    return null;
  }
}

onMounted(async () => {
  console.log('Fetching posters...');
  const trendings = await fetchPosters();
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