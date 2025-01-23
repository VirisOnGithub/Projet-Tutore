<template>
  <p>{{ username }}</p>
  <br>
  <p>Liste de favoris</p>
  <ul>
    <li v-for="movie in movieInfosFavorites" :key="movie.id">{{ movie.title }}</li>
  </ul>
  <br>
  <p>Liste de films à regarder plus tard</p>
  <ul>
    <li v-for="movie in movieInfosWatchLater" :key="movie.id">{{ movie.title }}</li>
  </ul>
</template>

<script setup lang="ts">

interface Genres {
  id: number;
  name: string;
}

interface userConnected {
  username: string;
  id: number;
}

interface Movie {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: any,
  budget: number,
  genres: Genres[],
  homepage: string,
  id: number,
  imdb_id: string,
  origin_country: string[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: any[],
  production_countries: any[],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: any[],
  status: string,
  tagline: string,
  title: string,
  video: any,
  vote_average: number,
  vote_count: number
}

const { session } = useUserSession();
const user: userConnected = { username: session.value.user?.username, id: session.value.user?.id };
const username = user.username;
const id = user.id;
const watchLater = ref<any[]>([]);
const movieInfosWatchLater = ref<Movie[]>([]);
const favorites = ref<any[]>([]);
const movieInfosFavorites = ref<Movie[]>([]);
const route = useRoute();



const fetchWatchLater = async () => {
  try {
    const response = await fetch('/api/getWatchlaterMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: id })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const watchlater = await response.json();
    console.log('Watchlater fetched:', watchlater);
    return watchlater;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
};

const fetchFavorites = async () => {
  try {
    const response = await fetch('/api/getFavoritesMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: id })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const favorites = await response.json();
    console.log('Watchlater fetched:', favorites);
    return favorites;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
};

const fetchMovieInfos = async (id_film: any) => {
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
}
  
onMounted(async () => {
  watchLater.value = await fetchWatchLater();
  favorites.value = await fetchFavorites();
  for (let i = 0; i < watchLater.value.length; i++) {
    movieInfosWatchLater.value[i] = await fetchMovieInfos(watchLater.value[i]);
  }
  for (let i = 0; i < favorites.value.length; i++) {
    movieInfosFavorites.value[i] = await fetchMovieInfos(favorites.value[i]);
  }
});

</script>

<style scoped>
</style>