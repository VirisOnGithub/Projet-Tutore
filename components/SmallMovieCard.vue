<script setup lang="ts">
const props = defineProps<{
  movie: {
    title: string;
    poster_path: string;
    id: number;
  }
}>();

const router = useRouter();

const truncateTitle = (title: string): string => {
  return title.length > 15 ? title.substring(0, 15) + '...' : title;
};

const goToMoviePage = () => {
  router.push(`/movie/${props.movie.id}`);
};
</script>

<template>
  <div @click="goToMoviePage"
       class="bg-[#202020] border border-white p-5 rounded-lg cursor-pointer transition-transform transform hover:scale-105 flex items-center justify-center h-96 w-72 overflow-auto">
    <div class="flex flex-col items-center">
      <h3 class="text-center text-[180%] font-bold">{{ truncateTitle(movie.title) }}</h3>
      <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="Poster"
           class="h-60 border border-white rounded-lg">
    </div>
  </div>
</template>

<style scoped>

</style>