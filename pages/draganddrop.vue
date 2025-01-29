<!-- 
    Page de choix dynamique de films tendances
-->

<script setup lang="ts">

const { session } = useUserSession()

useHead({titleTemplate: "Drag and Drop"});

const circleStyle = "height: 20vh; width: 20vh;"

const page = ref(1);

const modalOpened = ref(false);

const trendings = await $fetch("/api/getTrendingMovies", {
  method: "POST",
  body: {
    page: page.value
  }
});

/**
 * Récupère la page suivante de films tendances
 */
const getNextPage = async () => {
  page.value++;
  const newTrendings = await $fetch("/api/getTrendingMovies", {
    method: "POST",
    body: {
      page: page.value
    }
  });
  trendings.results.push(...newTrendings.results);
}

const i = ref(0);

const poster = ref<HTMLImageElement | null>(null);
const genresNames = ref("");

watchEffect(() => {
  const mousePosition = ref({ x: 0, y: 0 });

  // On récupère les deux premiers genres du film pour éviter d'en avoir trop (lisibilité)
  genresNames.value = trendings.results[i.value].genre_ids.map((genreId: number) => {
    return movieGenres.find((genre) => genre.id === genreId)?.name;
  }).slice(0,2).join(", ");

  onMounted(() => {

    // On centre le point de rotation du poster
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight * 0.9;

    window.addEventListener('resize', () => {
      centerX = window.innerWidth / 2;
      centerY = window.innerHeight * 0.9;
    });

    // On récupère la position de la souris pour faire tourner le poster
    window.addEventListener('mousemove', (event) => {
      mousePosition.value = { x: event.clientX, y: event.clientY };
      if (poster.value && poster.value.style && !modalOpened.value) {
        // calcul de l'angle de rotation nécessaire (tangeante limitée à l'angle [-45°, 45°])
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

watchEffect(() => {
    if (i.value > trendings.results.length - 3) {
      getNextPage();
    }
});

/**
 * Passe au film suivant
 */
const nextMovie = () => {
  i.value = (i.value + 1) % trendings.results.length;
}

/**
 * Ajoute le film à la liste de films à regarder plus tard
 */
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
    <div class="flex justify-center items-center">
      <h1 class="text-3xl font-bold">{{ trendings.results[i].title }}</h1>
      <UIcon name="i-streamline-interface-alert-information-circle-information-frame-info-more-help-point-circle" @click="modalOpened = true"  class="translate-x-1"/>
    </div>
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

  <UModal v-model="modalOpened">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800'}">
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">{{ trendings.results[i].title }}</h1>
          <Badge class="mx-2">
            <StarBadge :rating="trendings.results[i].vote_average" />
          </Badge>
          <UButton @click="modalOpened = false" icon="i-heroicons-x-mark-20-solid" />
        </div>
      </template>

      <p>
        <span class="font-bold">Synopsis : </span>
        {{ trendings.results[i].overview }}
      </p>
    </UCard>
  </UModal>
</template>

<style scoped>
img#poster {
  height: 50vh;
}

@media screen and (max-width: 1024px) {
  #movieInfos {
    width: 80%;
  }
}
</style>