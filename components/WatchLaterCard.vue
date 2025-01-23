<template>
  <div @click="goToMoviePage" class="bg-[#202020] border border-white p-5 rounded-lg cursor-pointer transition-transform transform hover:scale-105">
    <div class="flex items-center">
      <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="Poster" class="w-16 h-24 mr-4">
      <div>
        <h3 class="text-lg font-bold">{{ movie.title }}</h3>
        <StarBadge :rating="movie.vote_average"/>
        <p class="text-sm">{{ castDuration(movie.runtime) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  movie: {
    title: string;
    poster_path: string;
    vote_average: number;
    runtime: number;
    id: number;
  }
}>();

const router = useRouter();

const goToMoviePage = () => {
  router.push(`/movie/${props.movie.id}`);
};

const castDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h${minutes}m`;
};
</script>

<style scoped>
</style>