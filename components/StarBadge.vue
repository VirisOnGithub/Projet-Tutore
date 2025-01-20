<script setup lang="ts">
defineProps({
  rating: {
    type: Number,
    required: true
  }
})


const getNumberofFullStars = (rating: number): number => {
  return Math.floor(rating / 2);
}

const getNumberOfHalfStars = (rating: number): number => {
  return (rating / 2 % 1) >= 0.5 ? 1 : 0;
}

const getNumberOfEmptyStars = (rating: number) => {
  return 5 - getNumberofFullStars(rating) - getNumberOfHalfStars(rating);
}
</script>

<template>
  <div class="flex items-center py-1">
    <img v-for="n in getNumberofFullStars(rating)" src="/full_star.svg" alt="full star" class="w-4 h-4">
    <img v-for="n in getNumberOfHalfStars(rating)" src="/half_star.svg" alt="half star" class="w-4 h-4">
    <img v-for="n in getNumberOfEmptyStars(rating)" src="/empty_star.svg" alt="empty star" class="w-4 h-4">
  </div>
  <div class="pl-2 font-medium text-yellow-400">
    {{ rating.toFixed(1) }}
  </div>
</template>

<style scoped>

</style>