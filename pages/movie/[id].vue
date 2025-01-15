<template>
  <div>
    <Head>
        <Title>{{ $route.params.id }}</Title>
    </Head>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else>
        <img class="backdrop" :src="'http://image.tmdb.org/t/p/w1280_and_h720_bestv2' + movieInfos.backdrop_path" />
        <div class="gray-filter"></div>
        <div class="cta"></div>
        <div class="other">

        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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
</style>