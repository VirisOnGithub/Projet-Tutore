<template>
  <div @click="goToMoviePage" class="bg-[#202020] border border-white p-5 rounded-lg cursor-pointer transition-transform transform hover:scale-105">
    <div class="flex items-center">
      <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="Poster" class="w-16 h-24 mr-4">
      <div>
        <h3 class="text-lg font-bold">{{ movie.title}}</h3>
        <p>{{ movie.id }}</p>
        <div id="stars" class="flex mb-3 z-[2]">
            <Badge>
              <StarBadge v-if="movie.vote_average > 0 && releaseDatePast" :rating="movie.vote_average"/>
              <span v-else-if="releaseDatePast" class="text-lg">No rating</span>
              <p v-else><i>Ce film sortira prochainement</i></p>
            </Badge>
            <FavouriteButton :id="movie.id"/>
          </div>
        <div id="additionalInformation" class="flex flex-wrap gap-2">
          <Badge>{{ movie.release_date.substring(0, 4) }}</Badge>
          <Badge>{{ movie.genres.map((genre: Genres) => genre.name).join(", ") }}</Badge>
        </div>  
        
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface Genres {
  id: number;
  name: string;
}

const props = defineProps<{
  movie: {
    title: string;
    poster_path: string;
    vote_average: number;
    runtime: number;
    id: number;
    release_date: string;
    genres: Genres[];
  }
}>();

const router = useRouter();
let releaseDatePast: Ref<boolean | null> = ref(null);

const goToMoviePage = () => {
  router.push(`/movie/${props.movie.id}`);
};

const castDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h${minutes}m`;
};

const hasBeenPublished = (release_date : string) => {
  const currDate = new Date();
  const release_dateFilm = new Date(release_date)
  return release_dateFilm <= currDate;
}

onMounted(async () => {
  releaseDatePast.value = hasBeenPublished(props.movie.release_date)
});
</script>

<style scoped>
</style>