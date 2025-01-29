<template>
  <div>
    <div v-if="isLoading" class="loading">
      <div class="absolute top-1/2 left-1/2 translate-y-1/2 translate-x-1/2">
        <div class="w-10 h-10 border-4 border-t-white border-gray-600 rounded-full animate-spin"></div>
      </div>
    </div>
    <div v-else>
      <div id="imageWrapper" class="z-[0] relative">
        <img class="w-full" :src="'https://image.tmdb.org/t/p/w1280' + movieInfos.backdrop_path" alt="Backdrop"/>
      </div>
      <div id="gray-filter" class="absolute inset-0" style="background: rgba(0, 0, 0, 0.5);"></div>
      <div id="cta" class="absolute inset-0 bg-gradient-to-b from-transparent to-[#202020] z-[1]"></div>
      <div class="banner">
        <img :src="'https://image.tmdb.org/t/p/w1280' + movieInfos.poster_path"
             class="absolute top-[30%] left-[10%] w-[20%] z-[2]"
             id="poster" alt="Poster"/>
        <div id="movieDetails" class="text-white mt-5 absolute top-[30%] left-[35%] w-[30%] z-[2]">
          <div id="additionalInformation" class="flex flex-wrap gap-2">
            <Badge>{{ movieInfos.release_date.substring(0, 4) }}</Badge>
            <Badge>{{ movieInfos.genres.map((genre: Genres) => genre.name).join(", ") }}</Badge>
            <Badge>{{ castDuration(movieInfos.runtime) }}</Badge>
          </div>
          <h1 id="movieTitle" class="font-bold text-3xl z-[2]">{{ movieInfos.title }}</h1>
          <p id="movieTagline" class="text-lg font-light z-[2]">{{ movieInfos.tagline }}</p>
          <div id="stars" class="flex mb-3 z-[2]">
            <Badge>
              <StarBadge v-if="movieInfos.vote_average > 0 && releaseDatePast" :rating="movieInfos.vote_average"/>
              <span v-else-if="releaseDatePast" class="text-lg">No rating</span>
              <p v-else><i>Ce film sortira prochainement</i></p>
            </Badge>
            <WatchLaterButton v-if="loggedIn && !isFavourite" />
          </div>
          <div id="badges" class="mb-3 flex flex-wrap gap-2 z-[2]">
            <Badge v-for="country in movieInfos.production_countries" :key="country.iso_3166_1">
              <CountryBadge :country="country.iso_3166_1"/>
            </Badge>
          </div>
          <p id="movieOverview" class="text-base font-normal z-[2]">{{ movieInfos.overview }}</p>
        </div>
      </div>
      <div class="cover-image absolute z-[1] top-full inset-x-0 h-full text-white pt-32" style="background-color: #202020;">
        <div v-if="!comments || comments.length === 0" class="text-center mt-5">
          <p>Aucun commentaire n'est disponible.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 md:mr-[10%] md:ml-[10%]">
          <div v-for="(comment, index) in comments" :key="index" class="bg-[#202020] border border-white p-5 rounded-lg  mr-[5%] ml-[5%] mb-[5%]">
            <div class="flex justify-between">
              <div class="flex items-center">
                <img src="/public/people.svg" alt="User" class="w-10 h-10 rounded-full mr-2">
                <h3 class="text-lg font-bold">{{ comment.user_name }}</h3>
              </div>
              <Badge>
                <StarBadge :rating="comment.rating_user"/>
              </Badge>
            </div>
            <p class="mt-2 break-words">{{ comment.content }}</p>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div v-if="loggedIn" class="flex flex-col items-center justify-center mt-10">
            <h3 class="text-2xl font-bold">Laisser un avis</h3>
            <nuxt-rating
                :rating-step="0.5"
                :read-only="false"
                @rating-selected="(rating) => updateRating(rating*2)"
                :rating-size="30"
            />
            <textarea v-model="commentaire" class="border border-gray-300 p-2 rounded m-1" placeholder="Votre commentaire"/>
            <!--          <RatingSlider :rating="newRating" @update:rating="updateRating"/>-->
            <button @click="addComment" class="bg-transparent border-2 border-green-500 font-semibold hover:bg-green-500  hover:text-white py-2 px-4 hover:border-transparent active:bg-green-700 rounded m-1 transition-all">Ajouter un commentaire</button>
          </div>
          <div v-else class="flex flex-col items-center justify-center mt-10">
            <h3 class="text-2xl font-bold"><NuxtLink to="/login">Connectez-vous</NuxtLink> pour laisser un avis</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: 'default',
});

const route = useRoute();
const isLoading = ref(true);
let movieInfos: Movie;
let comments: Ref<Comment[] | null> = ref(null);
const commentaire = ref("");
const newRating = ref(0);
const { loggedIn, session } = useUserSession();
const id = session.value.user?.id;
let releaseDatePast: Ref<boolean | null> = ref(null);
const isFavourite = ref(false)

interface Genres {
  id: number;
  name: string;
}

interface Comment {
  rating_user: number;
  content: string;
  user_name: string;
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

const fetchComments = async () => {
  try {
    const response = await fetch('/api/getComments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movieId: route.params.id })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comments = await response.json();
    console.log('Comments fetched:', comments);
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
};
const castDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h${minutes}m`;
}

const addComment = async () => {
  try {
    const response = await fetch('/api/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movieId: route.params.id,
        content: commentaire.value,
        rating: newRating.value,
        userId: id
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comment = await response.json();
    console.log('Comment inserted:', comment);
    comments.value = await fetchComments();
    console.log(comments.value)
    commentaire.value = "";
    return null;
  } catch (error) {
    console.error('Error inserting new comment:', error);
    return null;
  }
};

const updateRating = (rating: number) => {
  newRating.value = rating;
};

const hasBeenPublished = (release_date : string) => {
  const currDate = new Date();
  const release_dateFilm = new Date(release_date)
  return release_dateFilm <= currDate;
}

const isInFavourites = async () => {
  try {
    const response = await fetch('/api/getFavoritesMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: id
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const listId = await response.json();
    console.log('Favourites Movies IDs:', listId);
    listId.forEach((movieId : number) => {
      if (movieId === movieInfos.id) {
        isFavourite.value = true
      }
    })
    console.log(isFavourite.value)
    return null;
  } catch (error) {
    console.error('Error inserting new comment:', error);
    return null;
  }
}

onMounted(async () => {
  console.log('Fetching movie infos...');
  movieInfos = await fetchMovieInfos();
  useHead({titleTemplate: (movieInfos.title)});
  console.log(movieInfos);

  console.log('Fetching comments...');
  comments.value = await fetchComments();
  console.log(comments.value);

  console.log("Checking release date...")
  releaseDatePast.value = hasBeenPublished(movieInfos.release_date)
  console.log(releaseDatePast.value)

  console.log("Checking favourite list...")
  isInFavourites()
  console.log(isFavourite.value)

  isLoading.value = false;

});
</script>