<!-- 
    Bouton pour supprimer un film de la liste des films en favoris
-->
<script setup lang="ts">
const { session } = useUserSession();
const idUser = session.value.user?.id;
const props = defineProps(
    {
      id: {
        type: Number,
        required: true
      }
    }
);
const emit = defineEmits(['removeFromFavourites']);

/**
 * Supprime un film de la liste des films en favoris.
 *
 * @param {Event} event - L'événement de clic.
 */
const deleteMovieFromFavourites = async (event : Event) => {
  event.stopPropagation();
  try {
    const response = await fetch('/api/deleteFavourite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movieId: props.id, userId: idUser })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    emit('removeFromFavourites', props.id);
    return null;
  } catch (error) {
    console.error('Error removing movie from favourites list:', error);
    return null;
  }
};
</script>

<template>
  <button
      @click="deleteMovieFromFavourites"
      class="rounded-xl ml-2 relative h-6 cursor-pointer flex items-center border border-black-500 bg-black-500 group hover:bg-black-600 active:bg-black-700 text-gray-100 hover:text-[#202020] hover:bg-gray-100"
  >
    <span
        class="text-inherit font-semibold ml-2 transition-all duration-300"
    >
      Enlever de la liste
    </span>
    <UIcon name="i-gridicons-cross" class="text-inherit transition-all duration-300 m-1" />
  </button>
</template>

<style scoped>

</style>