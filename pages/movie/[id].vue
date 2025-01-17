<template>
  <div>
    <Head>
        <Title>{{ $route.params.id }}</Title>
    </Head>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else>
        <img class="backdrop" :src="'http://image.tmdb.org/t/p/w1280' + movieInfos.backdrop_path" />
        <div class="gray-filter"></div>
        <div class="cta"></div>
        <div class="banner">
            <img :src="'http://image.tmdb.org/t/p/w1280' + movieInfos.poster_path" id="poster" />
            <div id="movieDetails">
                <h1 id="movieTitle">{{ movieInfos.title }}</h1>
                <div id="badges">
                    <CountryBadge v-for="country in movieInfos.production_countries" :key="country.iso_3166_1" :country="country.iso_3166_1" />
                </div>
                <p id="movieOverview">{{ movieInfos.overview }}</p> 
            </div>
        </div>
        <div class="other">

        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CountryBadge from '~/components/CountryBadge.vue';
const route = useRoute();
const isLoading = ref(true);
let movieInfos: any = null;

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
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie infos:', error);
        return null;
    }
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
.backdrop {
    width: 100vw;
    transform: translateY(-10%);
    z-index: -99999999999999999;
    position: relative;
}

.gray-filter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}

.cta {
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}

.other {
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
}

#poster {
    position: absolute;
    top: 30%;
    left: 10%;
    width: 20%;
}

#movieDetails {
    position: absolute;
    top: 30%;
    left: 35%;
    width: 30%;
    color: white;
    margin-top: 2rem;
    font-family: "Inter", serif;

    > #movieTitle {
        font-size: 4rem;
        font-weight: 800;
    }
    > #movieOverview {
        font-size: 1rem;
        font-weight: 400;
    }
}

#badges {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>