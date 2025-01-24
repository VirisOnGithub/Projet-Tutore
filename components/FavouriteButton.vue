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
const emit = defineEmits(['addToFavouriteList']);

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
        console.log('Movie added to favoutite list');
        router.go(0);
        // emit('addToFavouriteList', props.id);
        return null;
    } catch (error) {
        console.error('Error adding movie to watchlater list:', error);
        return null;
    }
};

onMounted(async () => {
  console.log('id', idUser);
  console.log('route.params.id', props.id);
});
</script>

<template>
  <button
      @click="addToFavouriteList"
      class="rounded-lg relative w-56 h-8 cursor-pointer flex items-center border border-black-500 bg-black-500 group hover:bg-black-600 active:bg-black-700 text-gray-100 hover:text-[#202020] hover:bg-gray-100"

  >
              <span
                  class="text-inherit font-semibold ml-4 transition-all duration-300"
              >Add to favoutite list</span
              >
    <span
        class="absolute right-0 h-full w-10 rounded-lg bg-black-500 flex items-center justify-center transition-all duration-300 group-hover:bg-black-600 group-active:bg-black-700"
    >
                <svg
                    class="svg w-8 text-inherit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19"></line>
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
              </span>
  </button>
</template>

<style scoped>

</style>