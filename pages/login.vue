<script setup lang="ts">

</script>

<template>
  <div class="items-center justify-center">
    <div id="login" class="bg-black rounded shadow flex flex-col justify-between p-5">
      <form class="text-white" action="" method="post">
        <fieldset class="">
          <legend class="text-center bold text-2xl">Welcome again!</legend>
          <hr class="mt-5 mb-5">
          <label class="text-s font-bold after:content-['*'] after:text-red-400" for="email">Login </label>
          <input class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-blue-500" required=""
                 placeholder="xX_cooldude69_Xx">
          <label class="text-s font-bold after:content-['*'] after:text-red-400" for="password">Password </label>
          <input class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-blue-500" type="password"
                 required="" placeholder="********">
          <a href="#" class="block text-right text-xs text-indigo-500 text-right mb-4">Forgot Password?</a>
          <button
              class="w-full rounded bg-blue-600 text-indigo-50 p-2 text-center font-bold hover:bg-blue-500 active:bg-blue-700">
            Log In
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
