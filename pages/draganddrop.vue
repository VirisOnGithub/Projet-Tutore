<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession , clear: clearSession, session } = useUserSession()
const router = useRouter()
if(!loggedIn.value){
  router.push('/login')
}
const circleStyle = "height: 20vh; width: 20vh;"

const trendings = await $fetch("/api/getTrendingMovies");

const i = ref(0);

const movieTime = ref<string>("");

const poster = ref(null);
const genresNames = ref("");

onMounted(() => {

})

watchEffect(() => {
  const mousePosition = ref({ x: 0, y: 0 });

  genresNames.value = trendings.results[i.value].genre_ids.map((genreId: number) => {
    return movieGenres.find((genre) => genre.id === genreId)?.name;
  }).join(", ");

  onMounted(() => {
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight * 0.9;

    window.addEventListener('resize', () => {
      centerX = window.innerWidth / 2;
      centerY = window.innerHeight * 0.9;
    });

    window.addEventListener('mousemove', (event) => {
      mousePosition.value = { x: event.clientX, y: event.clientY };
      if (poster.value && poster.value.style) {
        const angle = -Math.atan2(mousePosition.value.x - centerX, mousePosition.value.y - centerY) * 180 / Math.PI + 180;
        if(angle < 45 || angle > 315) {
          poster.value.style.transform = `rotate(${angle}deg)`;
        } else {
          if(angle < 180) {
            poster.value.style.transform = `rotate(45deg)`;
          } else {
            poster.value.style.transform = `rotate(-45deg)`;
          }
        }
      }
    });
  });
});

const nextMovie = () => {
  i.value = (i.value + 1) % trendings.results.length;
}

const addToWatchlist = () => {
  $fetch("/api/addToWatchLater", {
    method: "POST",
    body: {
      movieId: trendings.results[i.value].id,
      userId: session.value.user?.id
    }
  });
  nextMovie();
}



</script>

<template>
  <div class="grid gap-0 h-screen grid-cols-2">
    <div class="bg-red-400 flex justify-center items-center" @click="nextMovie">
      <div class="rounded-full bg-red-500 flex justify-center items-center" :style="circleStyle">
        <img src="/cross.svg" alt="cross">
      </div>
    </div>
    <div class="bg-green-400 flex justify-center items-center" @click="addToWatchlist">
      <div class="rounded-full bg-green-500 flex justify-center items-center" :style="circleStyle">
        <img src="/later.svg" alt="watch later button">
      </div>
    </div>
  </div>
  <div id="movieInfos" class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-gray-200 text-black rounded-xl p-3" style="top: 25%">
    <h1 class="text-3xl font-bold">{{ trendings.results[i].title }}</h1>
    <div class="flex justify-center">
      <Badge class="text-white mx-2">{{ genresNames }}</Badge>
      <Badge class="mx-2">
        <StarBadge :rating="trendings.results[i].vote_average" />
      </Badge>
    </div>
  </div>
  <div id="moviePoster" class="absolute left-1/2 -translate-x-1/2 -translate-y-full" style="top: 90%;">
    <img id="poster" ref="poster" :src="'https://image.tmdb.org/t/p/w500' + trendings.results[i].poster_path" alt="movie poster" class="origin-bottom">
  </div>
</template>

<style scoped>
img#poster {
  height: 50vh;
}
</style>