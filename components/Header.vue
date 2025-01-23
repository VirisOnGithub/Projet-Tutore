<template>
  <header class="row p-3 z-[3] relative font-['Inter'] bg-gray-950">
    <nav class="flex flex-wrap items-center justify-between p-3">
      <NuxtLink to="/" class="flex items-center">
        <img src="/main_logo.svg" class="align-top" alt="Website logo">
        <h1 class="inline-block text-white ml-2 font-bold text-4xl">MovieFinder</h1>
      </NuxtLink>
      <ul class="flex">
        <li v-if="loggedIn">
          <NuxtLink to="/profile" :class="buttonStyle">Profile</NuxtLink>
        </li>
        <li v-else>
          <NuxtLink to="/login" :class="buttonStyle">Log in</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/browse" :class="buttonStyle">Movies</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/browse" :class="buttonStyle">TV Shows</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/browse" :class="buttonStyle">People</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" :class="buttonStyle">More</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/movie/762509" :class="buttonStyle">The Lion King</NuxtLink>
        </li>
        <li v-if="loggedIn">
          <NuxtLink @click="logOut" :class="buttonStyle" class="cursor-pointer">Log out</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>

const buttonStyle : string = "bg-transparent font-semibold hover:bg-violet-500  hover:text-white py-2 px-4 hover:border-transparent active:bg-violet-700 rounded m-1 transition-all";
const { loggedIn, clear: clearSession } = useUserSession();
const router = useRouter();

const logOut = async () => {
  await clearSession();
  await router.push('/');
}

</script>

<style scoped>
/* Scoped styles not needed in Tailwind transformation */
</style>