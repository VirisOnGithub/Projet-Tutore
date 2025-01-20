<template>
  <div>
    <Head>
      <Title>{{ $route.params.id }}</Title>
    </Head>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else>
      <div id="imageWrapper" class="w-full overflow-hidden z-[-1] relative">
        <img class="w-full" :src="'https://image.tmdb.org/t/p/w1280' + movieInfos.backdrop_path" alt="Backdrop"/>
      </div>
      <div id="gray-filter" class="absolute inset-0" style="background: rgba(0, 0, 0, 0.5);"></div>
      <div id="cta" class="absolute inset-0 bg-gradient-to-b from-transparent to-[#202020] z-[1]"></div>
      <div class="banner">
        <img :src="'https://image.tmdb.org/t/p/w1280' + movieInfos.poster_path"
             class="absolute top-[30%] left-[10%] w-[20%] z-[2]"
             id="poster" alt="Poster"/>
        <div id="movieDetails" class="text-white mt-5 absolute top-[30%] left-[35%] w-[30%] font-['Inter'] z-[2]">
          <div id="additionalInformation" class="flex flex-wrap gap-2">
            <Badge>{{ movieInfos.release_date.substring(0, 4) }}</Badge>
            <Badge>{{ movieInfos.genres.map((genre: Genres) => genre.name).join(", ") }}</Badge>
            <Badge>{{ castDuration(movieInfos.runtime) }}</Badge>
          </div>
          <h1 id="movieTitle" class="font-bold text-3xl z-[2]">{{ movieInfos.title }}</h1>
          <p id="movieTagline" class="text-lg font-light z-[2]">{{ movieInfos.tagline }}</p>
          <div id="stars" class="flex mb-3 z-[2]">
            <Badge>
              <StarBadge v-if="movieInfos.vote_average > 0" :rating="movieInfos.vote_average"/>
                <span v-else class="text-lg">No rating</span>
            </Badge>
          </div>
          <div id="badges" class="mb-3 flex flex-wrap gap-2 z-[2]">
            <Badge v-for="country in movieInfos.production_countries" :key="country.iso_3166_1">
              <CountryBadge :country="country.iso_3166_1"/>
            </Badge>
          </div>
          <p id="movieOverview" class="text-base font-normal z-[2]">{{ movieInfos.overview }}</p>
        </div>
      </div>
      <div class="cover-image absolute z-[1] top-full inset-x-0 h-full text-white" style="background-color: #202020;">
        
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
let users: any;

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

const fetchUser = async () => {
      try {
        const response = await fetch('/api/getUser');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const user = await response.json();
        console.log('User fetched:', user);
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    };

const castDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h${minutes}m`;
}

onMounted(async () => {
  console.log('Fetching movie infos...');
  movieInfos = await fetchMovieInfos();
  users = await fetchUser();
  console.log(movieInfos);
  isLoading.value = false;

});
</script>