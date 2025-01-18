<template>
    <div>

        <Head>
            <Title>{{ $route.params.id }}</Title>
        </Head>
        <div v-if="isLoading" class="loading">Loading...</div>
        <div v-else>
            <div id="imageWrapper" class="w-100 overflow-hidden z-n1 position-relative">
                <img class="w-100" :src="'https://image.tmdb.org/t/p/w1280' + movieInfos.backdrop_path"  alt="Backdrop"/>
            </div>
            <div id="gray-filter" class="position-absolute top-0 bottom-0 start-0 end-0"
                style="background: rgba(0, 0, 0, 0.5);"></div>
            <div id="cta" class="position-absolute top-0 start-0 end-0 bottom-0 bg-gradient-black"></div>
            <div class="banner">
                <img :src="'https://image.tmdb.org/t/p/w1280' + movieInfos.poster_path" class="position-absolute"
                     style="top: 30%; left: 10%; width: 20%;" id="poster" alt="Poster"/>
                <div id="movieDetails" class="text-white mt-5 position-absolute">
                    <div id="additionalInformation" class="d-flex flex-wrap gap-2">
                        <Badge>{{ movieInfos.release_date.substring(0, 4) }}</Badge>
                        <Badge>{{ movieInfos.genres.map((genre: Genres) => genre.name).join(", ") }}</Badge>
                        <Badge>{{ castDuration(movieInfos.runtime) }}</Badge>
                    </div>
                    <h1 id="movieTitle" class="fw-bold" style="font-size: 3rem">{{ movieInfos.title }}</h1>
                    <p id="movieTagline" class="fs-5 fw-light">{{ movieInfos.tagline }}</p>
                    <div id="stars" class="d-flex mb-3">
                      <Badge>
                          <StarBadge :rating="movieInfos.vote_average" />
                      </Badge>
                    </div>
                    <div id="badges" class="mb-3 d-flex flex-wrap gap-2">
                        <Badge v-for="country in movieInfos.production_countries">
                            <CountryBadge :key="country.iso_3166_1" :country="country.iso_3166_1" />
                        </Badge>
                    </div>
                    <p id="movieOverview" class="fs-6 fw-normal">{{ movieInfos.overview }}</p>
                </div>
            </div>
            <div class="cover-image position-absolute z-1 top-100 start-0 end-0 h-100 text-white" style="background-color: #202020">
              dsqdq
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const isLoading = ref(true);
let movieInfos: Movie;

interface Genres {
    id: number;
    name: string;
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

const fetchMovieInfos = async () => {
    try {
        const response = await fetch('/api/getMovieInfos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieId: route.params.id })
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

const castDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h${minutes}m`;
}

onMounted(async () => {
    console.log('Fetching movie infos...');
    movieInfos = await fetchMovieInfos();
    console.log(movieInfos);
    isLoading.value = false;

});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap');


.bg-gradient-black {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(32, 32, 32, 1) 90%);
}

.other {
    height: 100vh;
    background-color: #202020;
}

#movieDetails {
  top: 30%;
  left: 35%;
  width: 30%;
  font-family: "Inter", serif;
}
</style>