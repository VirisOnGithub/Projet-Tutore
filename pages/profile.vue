<template>
    <p>Liste de favoris</p>
    <p>Liste de films à regarder plus tard</p>
</template>

<script setup lang="ts">
const { session } = useUserSession();
interface User {
  username: string;
}

const user: User = { username: session.value.user?.username ?? '' };
const username = user.username;
</script>

<style scoped>
</style>