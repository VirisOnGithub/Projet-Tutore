<template>
  <div v-if="isLoading" class="flex justify-center items-center h-72 text-2xl">Loading...</div>
  <Carousel v-else v-bind="carouselConfig">
    <Slide v-for="poster in paths" :key="poster.id">
      <NuxtLink :to="'/movie/' + poster.id">
        <div class="carousel__item"><img class="w-72"
                                         :src="'http://image.tmdb.org/t/p/w600_and_h900_bestv2' + poster.path"/></div>
      </NuxtLink>
    </Slide>
  </Carousel>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';

const carouselConfig = {
  itemsToShow: 5,
  wrapAround: true
}

const paths = ref<any[]>([]);
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
  paths.value = trendings.results.map((data: any) => ({path: data.poster_path, id: data.id}));
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