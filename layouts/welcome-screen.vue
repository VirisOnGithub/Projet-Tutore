<template>
  <body>
  <div class="flex-column w-screen h-screen overflow-hidden">
    <slot/>
  </div>
  </body>
</template>

<script setup lang="ts">

</script>

<style scoped>
body {
  background-image:
  linear-gradient(rgba(0, 0, 20, 0.5), rgba(0, 0, 0, 0.5)),
  url("/index_backdrop.webp");
}

</style>