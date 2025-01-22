<script setup lang="ts">

const email = ref('');
const password = ref('');

const login = async (event: Event) => {
  event.preventDefault();
  email.value = email.value.trim();
  password.value = password.value.trim();

  try {
    const response = await fetch('/api/getIdentification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success) {
      console.log('Login successful');
      await navigateTo('/');
    } else {
      console.log('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

</script>

<template>
  <div class="items-center justify-center">
    <div id="login" class="bg-black rounded shadow flex flex-col justify-between p-5">
      <form class="text-white" action="" method="post">
        <fieldset class="">
          <legend class="text-center bold text-2xl">Welcome again!</legend>
          <hr class="mt-5 mb-5">
          <label class="text-s font-bold after:content-['*'] after:text-red-400" for="email">Login </label>
          <input v-model="email" class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-blue-500" required
                 placeholder="xX_cooldude69_Xx" id="email" type="text">
          <label class="text-s font-bold after:content-['*'] after:text-red-400" for="password">Password </label>
          <input v-model="password" class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-blue-500" type="password"
                 required placeholder="********" id="password">
          <a href="#" class="block text-right text-xs text-indigo-500 text-right mb-4">Forgot Password?</a>
          <button @click="login"
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
