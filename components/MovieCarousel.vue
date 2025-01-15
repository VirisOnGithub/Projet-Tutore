<template>
    <div v-if="isLoading" class="loading">Loading...</div>
    <Carousel v-else v-bind="carouselConfig">
        <Slide v-for="poster in paths" :key="poster">
            <div class="carousel__item"><img :src="'http://image.tmdb.org/t/p/w600_and_h900_bestv2' + poster" /></div>
        </Slide>
    </Carousel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const carouselConfig = {
    itemsToShow: 5,
    wrapAround: true
}

let paths: string[] = [];
const isLoading = ref(true);

const fetchPosters = async () => {
    try {
        const response = await fetch('/api/getTrendingMovies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching poster:', error);
        return null;
    }
}

onMounted(async () => {
    console.log('Fetching posters...');
    const trendings = await fetchPosters();
    paths = trendings.results.map((data: any) => data.poster_path);
    
    

    // posters.forEach(data => {
    //     if (data) {
    //         moviePosters.push(data.Poster);
    //     }
    // });
    isLoading.value = false;
});
</script>

<style scoped>
.carousel {
    height: 300px;
}

.carousel__slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: #f1f1f1;
    min-height: 300px;
}

.carousel__item > img {
    width: 300px;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-size: 2rem;
}
</style>