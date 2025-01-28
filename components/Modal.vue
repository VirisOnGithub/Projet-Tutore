<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-gray-400 p-5 rounded-lg shadow-lg text-black">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <p>{{ message }}</p>
      <button @click="closeModal" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">OK</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  message: string;
  isVisible: boolean;
}>();

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
</style>