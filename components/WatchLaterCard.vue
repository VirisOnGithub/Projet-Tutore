<template>
  <div @click="goToMoviePage" class="bg-[#202020] border border-white p-5 rounded-lg cursor-pointer transition-transform transform hover:scale-105 h-44 my-16" style="width: 600px">
    <div class="flex items-start">
      <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" alt="Poster" class="h-60 mr-4 relative -top-28 border border-white rounded-lg">
      <div>
        <h3 class="text-3xl font-bold">{{ truncateTitle(movie.title) }}</h3>
        <div id="stars" class="flex mb-3 z-[2]">
          <Badge>
            <StarBadge v-if="movie.vote_average > 0 && releaseDatePast" :rating="movie.vote_average"/>
            <span v-else-if="releaseDatePast" class="text-lg">No rating</span>
            <p v-else><i>Ce film sortira prochainement</i></p>
          </Badge>
          <Badge class="ml-2">{{ movie.release_date.substring(0, 4) }}</Badge>
        </div>
        <div id="additionalInformation" class="flex flex-wrap gap-2">
          <Badge>{{ castDuration(movie.runtime) }}</Badge>
          <Badge>{{ movie.genres.map((genre: Genres) => genre.name).slice(0,2).join(", ") }}</Badge>
        </div>
        <div id="actions" class="flex mt-3">
          <FavouriteButton :id="movie.id" @remove-from-watch-later="args => $emit('remove-from-watch-later', args)"/>
          <DeleteButtonWL :id="movie.id" @remove-from-watch-later="args => $emit('remove-from-watch-later', args)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import StarBadge from '~/components/StarBadge.vue';
import FavouriteButton from '~/components/FavouriteButton.vue';
import DeleteButton from '~/components/DeleteButtonWL.vue';
import { castDuration, hasBeenPublished } from '~/composables/movieUtilities';

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

const truncateTitle = (title: string): string => {
  return title.length > 20 ? title.substring(0, 20) + '...' : title;
};

onMounted(async () => {
  releaseDatePast.value = hasBeenPublished(props.movie.release_date);
});
</script>

<style scoped>
</style>