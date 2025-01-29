<!-- 
    Bouton pour ajouter un film à la liste des films en favoris
-->

<script setup lang="ts">
const { session } = useUserSession();
const idUser = session.value.user?.id;
const router = useRouter();
const props = defineProps(
    {
        id: {
        type: Number,
        required: true
        }
    }
);
const emit = defineEmits(['removeFromWatchLater']);

const addToFavouriteList = async (event : Event) => {
    event.stopPropagation();
    try {
        const response = await fetch('/api/addToFavourite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieId: props.id, userId: idUser })
        });
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        // router.go(0);
        emit('removeFromWatchLater', props.id);
        return null;
    } catch (error) {
        console.error('Error adding movie to watchlater list:', error);
        return null;
    }
};
</script>

<template>
  <button
      @click="addToFavouriteList"
      class="rounded-xl relative  h-6 cursor-pointer flex items-center border border-black-500 bg-black-500 group hover:bg-black-600 active:bg-black-700 text-gray-100 hover:text-[#202020] hover:bg-gray-100"
  >
    <span
        class="text-inherit font-semibold ml-2 transition-all duration-300"
    >
      Ajouter aux favoris
    </span>
    <UIcon name="i-gridicons-plus" class="text-inherit transition-all duration-300 mx-1" />
  </button>
</template>

<style scoped>

</style>