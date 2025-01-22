<template>
  <header class="row p-3">
    <nav class="flex flex-wrap items-center justify-between p-3 z-[3] relative">
      <NuxtLink to="/" class="flex items-center">
        <img src="/main_logo.svg" class="align-top" alt="Website logo">
        <h1 class="inline-block text-white ml-2 font-bold text-4xl">MovieFinder</h1>
      </NuxtLink>
      <ul class="flex">
        <li v-if="!isLoggedIn">
          <NuxtLink to="/login" :class="buttonStyle">Sign in</NuxtLink>
        </li>
        <li v-else>
          <NuxtLink to="/" :class="buttonStyle">Profile</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" :class="buttonStyle">Movies</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" :class="buttonStyle">TV Shows</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" :class="buttonStyle">People</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" :class="buttonStyle">More</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/movie/762509" :class="buttonStyle">The Lion King</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>

const buttonStyle : string = "bg-transparent font-semibold hover:bg-blue-500  hover:text-white py-2 px-4 hover:border-transparent active:bg-blue-700 rounded m-1 transition-all";
const { isAuthenticated } = useAuth();
const isLoggedIn = ref(false);

onMounted(() => {
  isLoggedIn.value = isAuthenticated.value;
  console.log(isLoggedIn.value);
});
</script>

<style scoped>
/* Scoped styles not needed in Tailwind transformation */
</style>