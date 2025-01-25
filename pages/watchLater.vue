<template>
  <div class="p-5">
    <h1 class="text-3xl font-bold mb-5">À regarder plus tard</h1>
    <div v-if="isLoading" class="loading">
      <div class="absolute top-1/2 left-1/2 translate-y-1/2 translate-x-1/2">
        <div class="w-10 h-10 border-4 border-t-white border-gray-600 rounded-full animate-spin"></div>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-x-48 mx-auto place-content-center lg:mx-32 xl:mx-60 2xl:mx-96">
      <WatchLaterCard v-for="movie in movieInfosWatchLater" :key="movie.id" :movie="movie" @add-to-favourite-list="(id) => filterWatchList(id)"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
const { session } = useUserSession();

const fetchWatchLaterMovies = async () => {
  try {
    const response = await fetch('/api/getWatchlaterMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: session.value.user?.id })
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

const filterWatchList = (id: number) => {
  console.log('oui');
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