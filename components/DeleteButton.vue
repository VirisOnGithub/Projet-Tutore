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

const deletemovieFromWatchLater = async (event : Event) => {
  event.stopPropagation();
  emit('removeFromWatchLater', props.id);
};

onMounted(async () => {
  console.log('id', idUser);
  console.log('route.params.id', props.id);
});
</script>

<template>
  <button
      @click="deletemovieFromWatchLater"
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