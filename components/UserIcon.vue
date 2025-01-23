<script setup lang="ts">
const { session } = useUserSession();
const username = session.value.user?.username;

</script>

<template>
  <svg class="rounded-full bg-violet-300 h-36 w-36 text-black" xmlns="http://www.w3.org/2000/svg">
    <text>{{ username }}</text>
  </svg>

</template>

<style scoped>

</style>