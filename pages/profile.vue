<template>
  <div class="flex w-screen justify-center">
  <div class="grid grid-cols-2 gap-2 p-5 w-3/4">
    <div class="flex items-center justify-start">
      <UserIcon />
      <p class="font-bold text-8xl ml-4">{{ username }}</p>
    </div>
    <div class="grid grid-cols-2 grid-rows-2">
      <div class="flex">
        <NuxtLink to="/watchLater" :class="buttonStyle">À regarder plus tard</NuxtLink>
      </div>
      <div class="flex">
        <NuxtLink to="/" :class="buttonStyle">Favoris</NuxtLink>
      </div>
      <div class="flex">
        <NuxtLink to="/" :class="buttonStyle">Commentaires</NuxtLink>
      </div>
      <div class="flex">
        <NuxtLink to="/login" :class="buttonStyle" @click="deleteAccount">Supprimer le compte</NuxtLink>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import {checkConnected} from "~/composables/connection";

useHead({titleTemplate: "Profil"});

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

const { session, clear: clearSession } = useUserSession();
const user: userConnected = { username: session.value.user?.username, id: session.value.user?.id };
const username = user.username;
const id = user.id;
const watchLater = ref<any[]>([]);
const movieInfosWatchLater = ref<Movie[]>([]);
const favorites = ref<any[]>([]);
const movieInfosFavorites = ref<Movie[]>([]);
const route = useRoute();

checkConnected();



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

const deleteAccount = async () => {
  try {
    const response = await fetch('/api/deleteAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: id })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Account deleted');
    clearSession();
  } catch (error) {
    console.error('Error deleting account:', error);
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

const buttonStyle : string = "w-full text-center bg-transparent font-semibold bg-violet-600 hover:bg-violet-500  hover:text-white py-2 px-4 hover:border-transparent active:bg-violet-700 rounded m-1 transition-all";

</script>

<style scoped>
</style>