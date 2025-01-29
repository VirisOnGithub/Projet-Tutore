<template>
  <div class="flex flex-col w-screen h-screen overflow-scroll">
    <div class="grid grid-cols-2 gap-2 p-5 justify-center">
      <div class="flex items-center ml-5">
        <UserIcon/>
        <p class="font-bold text-xl ml-4 md:text-3xl lg:text-4xl xl:text-5xl">{{ username }}</p>
      </div>
      <div class="grid grid-cols-2 grid-rows-2 gap-2">
        <div class="flex items-center">
          <NuxtLink to="/watchLater" :class="buttonStyle"><p>À regarder plus tard</p></NuxtLink>
        </div>
        <div class="flex items-center">
          <NuxtLink to="/favouriteList" :class="buttonStyle"><p>Favoris</p></NuxtLink>
        </div>
        <div class="flex items-center">
          <NuxtLink to="/" :class="buttonStyle" @click="logOut"><p>Déconnexion</p></NuxtLink>
        </div>
        <div class="flex items-center">
          <NuxtLink to="/login" :class="buttonStyle" @click="deleteAccount"><p>Supprimer le compte</p></NuxtLink>
        </div>
      </div>
    </div>
    <div class="bg-zinc-800 p-5">
      <p class="font-bold text-3xl">Activités récentes :</p>
      <div v-if="isLoading" class="h-screen relative">
        <div class="absolute top-1/2 left-1/2 translate-y-1/2 translate-x-1/2">
          <div class="w-10 h-10 border-4 border-t-white border-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
      <div v-else class="grid grid-rows-2 gap-2 p-5">
        <div class="flex flex-col w-full ml-5">
          <NuxtLink to="/watchLater" class="font-semibold text-2xl">Films à regarder plus tard :</NuxtLink>
          <div>
            <h1 v-if="recentInfosWatchLater.length == 0" class="text-xl">Pas de films à regarder plus tard</h1>
            <div v-else class="flex flex-row gap-5">
              <SmallMovieCard :key="recentInfosWatchLater[0].id" :movie="recentInfosWatchLater[0]"/>
              <SmallMovieCard :key="recentInfosWatchLater[1].id" :movie="recentInfosWatchLater[1]" class="hidden md:flex"/>
              <SmallMovieCard :key="recentInfosWatchLater[2].id" :movie="recentInfosWatchLater[2]" class="hidden lg:flex"/>
              <SmallMovieCard :key="recentInfosWatchLater[3].id" :movie="recentInfosWatchLater[3]" class="hidden xl:flex"/>
              <SmallMovieCard :key="recentInfosWatchLater[4].id" :movie="recentInfosWatchLater[4]" class="hidden 2xl:flex"/>
              <div class="flex items-center hover:scale-110 transition-transform transform">
                <NuxtLink to="/watchLater">
                  <img src="/white_chevron.png" alt="Flèche blanche">
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full ml-5">
          <NuxtLink to="/favouriteList" class="font-semibold text-2xl">Films favoris :</NuxtLink>
          <div class="flex flex-row gap-5">
            <h1 v-if="recentInfosFavorites.length == 0" class="text-xl">Pas de films favoris</h1>
            <div v-else class="flex flex-row gap-5">
              <SmallMovieCard :key="recentInfosFavorites[0].id" :movie="recentInfosFavorites[0]"/>
              <SmallMovieCard :key="recentInfosFavorites[1].id" :movie="recentInfosFavorites[1]" class="hidden md:flex"/>
              <SmallMovieCard :key="recentInfosFavorites[2].id" :movie="recentInfosFavorites[2]" class="hidden lg:flex"/>
              <SmallMovieCard :key="recentInfosFavorites[3].id" :movie="recentInfosFavorites[3]" class="hidden xl:flex"/>
              <SmallMovieCard :key="recentInfosFavorites[4].id" :movie="recentInfosFavorites[4]" class="hidden 2xl:flex"/>
              <div class="flex items-center hover:scale-110 transition-transform transform">
                <NuxtLink to="/favouriteList">
                  <img src="/white_chevron.png" alt="Flèche blanche">
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-20"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const {loggedIn} = useUserSession();

const checkConnected = (): void => {
  if (!loggedIn.value) {
    router.push('/login')
  }
}

useHead({titleTemplate: "Profil"});

interface Movie {
  title: string;
  poster_path: string;
  id: number;
}

const isLoading = ref(true);
const {user, clear: clearSession} = useUserSession();
const username = user.value?.username;
const recentInfosWatchLater = ref<Movie[]>([]);
const recentInfosFavorites = ref<Movie[]>([]);

checkConnected();

const fetchRecentWatchLater = async () => {
  try {
    const response = await fetch('/api/getRecentWatchlaterMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: user.value?.id})
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

const logOut = async () => {
  console.log('logging out');
  await clearSession();
  router.push('/');
}

const fetchRecentFavorites = async () => {
  try {
    const response = await fetch('/api/getRecentFavoriteMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: user.value?.id})
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
      body: JSON.stringify({movieId: id_film})
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

const deleteAccount = async () => {
  try {
    const response = await fetch('/api/deleteAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: user.value?.id})
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
  const recentWatchLater = await fetchRecentWatchLater();
  const recentFavorites = await fetchRecentFavorites();
  for (let i = 0; i < recentWatchLater.length; i++) {
    const movieInfo = await fetchMovieInfos(recentWatchLater[i]);
    if (movieInfo) {
      recentInfosWatchLater.value.push(movieInfo);
    }
  }
  for (let i = 0; i < recentFavorites.length; i++) {
    const movieInfo = await fetchMovieInfos(recentFavorites[i]);
    if (movieInfo) {
      recentInfosFavorites.value.push(movieInfo);
    }
  }
  isLoading.value = false;
});

const buttonStyle: string = "flex h-full w-full justify-center items-center text-center font-semibold bg-violet-600 hover:bg-violet-500 hover:text-white hover:border-transparent active:bg-violet-700 rounded transition-all";

</script>

<style scoped>
</style>