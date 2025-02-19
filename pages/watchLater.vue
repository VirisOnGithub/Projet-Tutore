<!-- 
    Page de la liste des films à regarder plus tard
-->

<template>
  <div class="p-5 overflow-auto h-screen">
    <div class="flex">
      <UIcon name="i-material-symbols-av-timer" class="h-9 w-9 mr-2" />
      <h1 class="text-3xl font-bold mb-10">À regarder plus tard</h1>
    </div>
    <div v-if="isLoading" class="loading">
      <div class="absolute top-1/2 left-1/2 translate-y-1/2 translate-x-1/2">
        <div class="w-10 h-10 border-4 border-t-white border-gray-600 rounded-full animate-spin"></div>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 xl:grid-cols-2">
      <div v-if="movieInfosWatchLater.length !== 0" v-for="movie in movieInfosWatchLater" class="flex justify-center">
        <WatchLaterCard :key="movie.id" :movie="movie" @remove-from-watch-later="(id) => filterWatchList(id)"/>
      </div>
      <div v-else class="text-center text-2xl font-bold">Aucun film à regarder plus tard</div>
      <div class="h-8"></div>
    </div>
    <div class="mt-12"></div>
  </div>
</template>

<script lang="ts" setup>

useHead({titleTemplate: "À regarder plus tard"});

interface Movie {
    title: string;
    poster_path: string;
    vote_average: number;
    runtime: number;
    id: number;
    release_date: string;
    genres: Genres[];
}

interface Genres {
  id: number;
  name: string;
}

const isLoading = ref(true);
const movieInfosWatchLater = ref<Movie[]>([]);
const { user } = useUserSession();

/**
 * Récupère les films à regarder plus tard
 */
const fetchWatchLaterMovies = async () => {
  try {
    const response = await fetch('/api/getWatchlaterMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.value?.id })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching watch later movies:', error);
    return [];
  }
};

/**
 * Récupère les informations d'un film
 *
 * @param {number} id_film - L'identifiant du film
 */
const fetchMovieInfos = async (id_film: number) => {
  try {
    const response = await fetch('/api/getMovieInfos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movieId: id_film })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie infos:', error);
    return null;
  }
};

/**
 * Filtre la liste des films à regarder plus tard
 *
 * @param {number} id - L'identifiant du film
 */
const filterWatchList = (id: number) => {
  movieInfosWatchLater.value = movieInfosWatchLater.value.filter((movie) => movie.id !== id);
};

onMounted(async () => {
  const watchLaterMovies = await fetchWatchLaterMovies();
  for (let i = 0; i < watchLaterMovies.length; i++) {
    const movieInfo = await fetchMovieInfos(watchLaterMovies[i]);
    if (movieInfo) {
      movieInfosWatchLater.value.push(movieInfo);
    }
  }
  isLoading.value = false;
});
</script>

<style scoped>
.loading {
  position: relative;
  height: 100vh;
}
</style>