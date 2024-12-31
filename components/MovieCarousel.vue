<template>
    <div v-if="isLoading" class="loading">Loading...</div>
    <Carousel v-else v-bind="carouselConfig">
        <Slide v-for="poster in moviePosters" :key="poster">
            <div class="carousel__item"><img :src="poster" /></div>
        </Slide>
    </Carousel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const carouselConfig = {
    itemsToShow: 5,
    wrapAround: true
}

const movieTitles = ['Titanic', 'Avatar', 'The Avengers', 'The Lion King', 'Frozen', 'The Incredibles', 'Finding Nemo', 'Toy Story', 'Aladdin', 'Beauty and the Beast'];
const moviePosters: string[] = [];
const isLoading = ref(true);

const fetchPoster = async (title: string) => {
    try {
        const response = await fetch('/api/poster', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title
            })
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
    const posterPromises = movieTitles.map(title => fetchPoster(title));
    const posters = await Promise.all(posterPromises);
    posters.forEach(data => {
        if (data) {
            moviePosters.push(data.Poster);
        }
    });
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

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-size: 2rem;
}
</style>