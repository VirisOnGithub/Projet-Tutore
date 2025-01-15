<template>
  <header class="row bg-secondary bg-opacity-50 p-3 z-3 position-relative">
    <h1 class="col-3">TMDB2</h1>
    <nav class="col-6">
      <ul class="row d-flex align-items-center h-100">
        <li class="col-2"><NuxtLink to="/index" class="btn btn-outline-primary">Home</NuxtLink></li>
        <li class="col-2"><NuxtLink to="/index" class="btn btn-outline-primary">Movies</NuxtLink></li>
        <li class="col-2"><NuxtLink to="/index" class="btn btn-outline-primary">TV Shows</NuxtLink></li>
        <li class="col-2"><NuxtLink to="/index23" class="btn btn-outline-primary">People</NuxtLink></li>
        <li class="col-2"><NuxtLink to="/about" class="btn btn-outline-primary">More</NuxtLink></li>
        <li class="col-2"><NuxtLink to="/movie/762509" class="btn btn-outline-primary">The Lion King</NuxtLink></li>
      </ul>
    </nav>
    <div class="col-3 d-flex justify-content-end">
      <input class="form-control m-2 border border-primary text-primary bg-secondary bg-opacity-10" type="text" placeholder="Search" />
    </div>
  </header>
</template>

<script lang="ts" setup>

</script>

<style scoped>
    li  {
        list-style: none;
    }

    input::placeholder {
        color: var(--primary);
    }
    input:hover {
        background-color: #eee !important;
    }
</style>