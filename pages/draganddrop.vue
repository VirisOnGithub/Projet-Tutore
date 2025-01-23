<script setup lang="ts">
// import { castDuration } from '~/composables/movieUtilities';
const circleStyle = "height: 20vh; width: 20vh;"

const trendings = await $fetch("/api/getTrendingMovies");

const i = ref(0);

const movieTime = ref<string>("");

const poster = ref(null);
const movieGenres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
];
console.log('movieGenres:', movieGenres);
const genresNames = ref("");

watchEffect(() => {
  const mousePosition = ref({ x: 0, y: 0 });

  genresNames.value = trendings.results[i.value].genre_ids.map((genreId: number) => {
    return movieGenres.find((genre) => genre.id === genreId)?.name;
  }).join(", ");

  onMounted(() => {
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight * 0.6;

    window.addEventListener('resize', () => {
      centerX = window.innerWidth / 2;
      centerY = window.innerHeight * 0.6;
    });

    window.addEventListener('mousemove', (event) => {
      mousePosition.value = { x: event.clientX, y: event.clientY };
      if (poster.value && poster.value.style) {
        const angle = -Math.atan2(mousePosition.value.x - centerX, mousePosition.value.y - centerY) * 180 / Math.PI + 180;
        poster.value.style.transform = `rotate(${angle}deg)`;
      }
    });

    window.addEventListener('click', () => {
      i.value = (i.value + 1) % trendings.results.length;
    });
  });
});

</script>

<template>
  <div class="grid gap-0 h-screen grid-cols-2">
    <div class="bg-red-400 flex justify-center items-center">
      <div class="rounded-full bg-red-500 flex justify-center items-center" :style="circleStyle">
        <img src="/cross.svg" alt="cross">
      </div>
    </div>
    <div class="bg-green-400 flex justify-center items-center">
      <div class="rounded-full bg-green-500 flex justify-center items-center" :style="circleStyle">
        <img src="/later.svg" alt="watch later button">
      </div>
    </div>
  </div>
  <div id="movieInfos" class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-gray-200 text-black rounded-xl p-3" style="top: 25%">
    <h1 class="text-3xl font-bold">{{ trendings.results[i].title }}</h1>
    <div class="flex justify-center">
      <Badge class="text-white">{{ genresNames }}</Badge>
      <Badge>
        <StarBadge :rating="trendings.results[i].vote_average" />
      </Badge>
    </div>
  </div>
  <div id="moviePoster" class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style="top: 60%;">
    <img id="poster" ref="poster" :src="'https://image.tmdb.org/t/p/w500' + trendings.results[i].poster_path" alt="movie poster">
  </div>
</template>

<style scoped>
img#poster {
  height: 50vh;
}
</style>