<template>
    <header class="row bg-dark p-3 z-3">
        <nav class="navbar navbar-expand-lg">
            <NuxtLink to="/" class="navbar-brand"><img src="/main_logo.svg" class="align-top">
                <h1 class="d-inline-block text-white">MovieFinder</h1>
            </NuxtLink>
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <NuxtLink to="/" class="btn btn-outline-primary">Home</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="btn btn-outline-primary">Movies</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="btn btn-outline-primary">TV Shows</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="btn btn-outline-primary">People</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/about" class="btn btn-outline-primary">More</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/movie/762509" class="btn btn-outline-primary">The Lion King</NuxtLink>
                </li>
            </ul>
            <div class="form-inline">
                <input class="form-control border border-primary text-primary bg-secondary bg-opacity-10" type="text"
                    placeholder="Search" />
            </div>
        </nav>
    </header>
</template>

<script lang="ts" setup>

</script>

<style scoped>
li {
    list-style: none;
}

input::placeholder {
    color: var(--primary);
}

input:hover {
    background-color: #eee !important;
}
</style>