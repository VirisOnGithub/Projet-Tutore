<script setup lang="ts">
const { session } = useUserSession();
const username = session.value.user?.username;

</script>

<template>
  <img :src="'https://ui-avatars.com/api//?name=' + username + '&background=C4B5FD&color=1D1D1D&&rounded=true&size=128'">

</template>

<style scoped>

</style>