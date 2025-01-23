<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession , clear: clearSession, session } = useUserSession()
const router = useRouter()

const username = ref("");
const password = ref("");

async function login() {
  $fetch('/api/luka', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value
    }
  })
  .then(async () => {
    await refreshSession()
    if (loggedIn.value) {
      console.log('User session set', user.value);
      console.log('User session set', loggedIn.value);
      console.log('User session set', session.value.user);
      await router.push('/browse')
    }
  })
  .catch((e: Error) => {
    console.error(e.message);
  })
}

</script>

<template>
  <div class="flex absolute top-0 left-0 h-screen w-screen items-center justify-center">
    <div id="login" class="flex flex-col bg-black rounded-lg shadow justify-between p-5 ">
        <fieldset class="">
          <legend class="text-center bold text-2xl">Welcome again!</legend>
          <hr class="mt-5 mb-5">
          <label class="text-s font-bold after:content-['*'] after:text-red-400" for="email">Login </label>
          <input v-model="username" class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-blue-500" required
                 placeholder="xX_cooldude69_Xx" id="email" type="text">
          <label class="text-s font-bold after:content-['*'] after:text-red-400" for="password">Password </label>
          <input v-model="password" class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-blue-500" type="password"
                 required placeholder="********" id="password">
            <div class="flex justify-between mb-4">
            <a href="#" class="text-xs text-indigo-500">Forgot Password ?</a>
            <a href="/createAccount" class="text-xs text-indigo-500">Sign In</a>
            </div>
          <button @click="login"
              class="w-full rounded bg-blue-600 text-indigo-50 p-2 text-center font-bold hover:bg-blue-500 active:bg-blue-700">
            Log In
          </button>
        </fieldset>
    </div>
  </div>
</template>

<style scoped>

</style>
