<template>
  <header class="row p-3 z-[3] relative bg-gray-950">
    <nav class="flex flex-wrap items-center justify-between p-3">
      <NuxtLink to="/browse" class="flex items-center">
        <img src="/main_logo.svg" class="align-top" alt="Website logo">
        <h1 class="inline-block text-white ml-2 font-bold text-4xl">MovieFinder</h1>
      </NuxtLink>
      <ul class="flex">
        <!--        <li v-if="loggedIn">-->
        <!--          <NuxtLink to="/profile" :class="buttonStyle">Profil</NuxtLink>-->
        <!--        </li>-->
        <li v-if="!loggedIn">
          <NuxtLink to="/login" :class="buttonStyle">Connexion</NuxtLink>
        </li>
        <!--        <li v-if="loggedIn">-->
        <!--          <NuxtLink to="/watchLater" :class="buttonStyle">À regarder plus tard</NuxtLink>-->
        <!--        </li>-->
        <!--        <li v-if="loggedIn">-->
        <!--          <NuxtLink to="/favouriteList" :class="buttonStyle">Favoris</NuxtLink>-->
        <!--        </li>-->
        <!--        <li v-if="loggedIn">-->
        <!--          <NuxtLink to="/draganddrop" :class="buttonStyle">Choisir ses films</NuxtLink>-->
        <!--        </li>-->
        <!--        <li>-->
        <!--          <NuxtLink to="/about" :class="buttonStyle">Plus</NuxtLink>-->
        <!--        </li>-->
        <li v-if="loggedIn">
          <UDropdown class="cursor-pointer" :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }">
            <UAvatar
              :src="'https://ui-avatars.com/api//?name=' + username + '&background=C4B5FD&color=1D1D1D&&rounded=true&size=64'"
              size="xl" />

            <template #logout="{ item }">
              <NuxtLink>
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 mr-1" />
                <span @click="item.onClick" class="cursor-pointer">{{ item.label }}</span>
              </NuxtLink>
            </template>

            <template #item="{ item }">
              <NuxtLink :to="item.to" class="flex items-center">
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 mr-1" />
                <span class="truncate">{{ item.label }}</span>
              </NuxtLink>

              <!--              <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />-->
            </template>

          </UDropdown>
        </li>
        <!--        <li v-if="loggedIn">-->
        <!--          <NuxtLink @click="logOut" :class="buttonStyle" class="cursor-pointer">Déconnexion</NuxtLink>-->
        <!--        </li>-->
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>

const buttonStyle: string = "bg-transparent font-semibold hover:bg-violet-500  hover:text-white py-2 px-4 hover:border-transparent active:bg-violet-700 rounded m-1 transition-all";
const { loggedIn, clear: clearSession, session, fetch, user } = useUserSession();
const router = useRouter();
const username = ref(user.value?.username);

console.log('loggedIn', loggedIn.value);

watch(() => router.currentRoute.value, async () => {
  if (loggedIn.value) {
    await fetch();
    username.value = user.value?.username || '';
    console.log('username', username.value);
  }
});

const logOut = async () => {
  console.log('logging out');
  await clearSession();
  await router.push('/');
}

const capitalize = <T extends string>(str: T) => {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const items = [
  [{
    label: 'Profil',
    to: '/profile',
    icon: 'i-heroicons-user-circle-16-solid'
  }, {
    label: 'À regarder plus tard',
    to: '/watchLater',
    icon: 'i-material-symbols-av-timer'
  }, {
    label: 'Favoris',
    to: '/favouriteList',
    icon: 'i-material-symbols-favorite'
  }, {
    label: 'Choisir ses films',
    to: '/draganddrop',
    icon: 'i-material-symbols-cards-star'
  }], [{
    label: 'Déconnexion',
    slot: 'logout',
    icon: 'i-streamline-logout-1-solid',
    onClick: logOut,
  }]
];

</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}
</style>