<script setup lang="ts">
const route = useRoute();
const id = useUserSession().session.value.user?.id;
const movieInWL = ref(false);
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

onMounted(async () => {
  movieInWL.value = await isMovieInWatchLater();
});

const addToWatchLater = async () => {
  try {
    const response = await fetch('/api/addToWatchLater', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movieId: route.params.id, userId: id })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Movie added to watchlater list');
    movieInWL.value = true;
    modalTitle.value = 'Succès';
    modalMessage.value = 'Film ajouté à la liste "À regarder plus tard"';
    showModal.value = true;
    return null;
  } catch (error) {
    console.error('Error adding movie to watchlater list:', error);
    modalTitle.value = 'Erreur';
    modalMessage.value = 'Erreur lors de l\'ajout du film à la liste';
    showModal.value = true;
    return null;
  }
};

const isMovieInWatchLater = async () => {
  try {
    const response = await fetch('/api/isMovieInWatchLater', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movieId: route.params.id, userId: id })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking if movie is in watchlater list:', error);
    return null;
  }
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <button
    v-if="!movieInWL"
    @click="addToWatchLater"
    class="rounded-xl relative w-52 h-6 cursor-pointer flex items-center border border-black-500 bg-black-500 group hover:bg-black-600 active:bg-black-700 text-gray-100 hover:text-[#202020] hover:bg-gray-100 ml-2"
  >
    <span class="text-inherit font-semibold ml-4 transition-all duration-300">
      À regarder plus tard
    </span>
    <span class="absolute right-0 h-full w-10 rounded-lg bg-black-500 flex items-center justify-center transition-all duration-300 group-hover:bg-black-600 group-active:bg-black-700">
      <svg
        class="svg w-8 text-inherit"
        fill="none"
        height="24"
        width="24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="12" x2="12" y1="5" y2="19"></line>
        <line x1="5" x2="19" y1="12" y2="12"></line>
      </svg>
    </span>
  </button>
  <div v-else class="border-green-900 bg-green-600 rounded-xl px-3 ml-2">
    Ajouté à la liste
  </div>
  <Modal :title="modalTitle" :message="modalMessage" :isVisible="showModal" @close="closeModal" />
</template>

<style scoped>

</style>