<template>
    <div class="p-5 overflow-auto h-screen">
      <div class="flex">
        <UIcon name="i-material-symbols-favorite" class="h-9 w-9 mr-2" />
        <h1 class="text-3xl font-bold mb-10">Liste de favoris</h1>
      </div>
      <div v-if="isLoading" class="loading">
        <div class="absolute top-1/2 left-1/2 translate-y-1/2 translate-x-1/2">
          <div class="w-10 h-10 border-4 border-t-white border-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-x-48 mx-auto lg:mx-32 xl:mx-60 2xl:mx-96">
        <FavouriteCard v-if="movieInfosWatchLater.length !== 0" v-for="movie in movieInfosWatchLater" :key="movie.id" :movie="movie" @remove-from-watch-later="(id) => filterWatchList(id)"/>
        <div v-else class="text-center text-2xl font-bold">Aucun film dans les favoris</div>
      </div>
      <div class="mt-12"></div>
    </div>
  </template>
  
  <script lang="ts" setup>
  
  useHead({titleTemplate: "Favoris"});
  
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
  
  const fetchWatchLaterMovies = async () => {
    try {
      const response = await fetch('/api/getFavoritesMovies', {
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