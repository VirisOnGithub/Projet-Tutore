<!-- 
    Page de connexion de l'utilisateur
-->

<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession, session } = useUserSession()
const router = useRouter()

useHead({titleTemplate: "Connexion"});

const username = ref("");
const password = ref("");
const passwordError = ref('');

/**
 * Connecte l'utilisateur
 */
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
      await router.push('/browse')
    }
  })
  .catch((e: Error) => {
    passwordError.value = 'Nom d\'utilisateur ou mot de passe incorrect';
  })
}

</script>

<template>
  <div class="flex absolute top-0 left-0 h-screen w-screen items-center justify-center">
    <div id="login" class="flex flex-col bg-black rounded-lg shadow justify-between p-5 ">
        <fieldset class="">
          <legend class="text-center bold text-2xl">Ravi de vous revoir !</legend>
          <hr class="mt-5 mb-5">
          <label class="text-s font-bold after:content-['*'] after:text-red-400" for="email">Nom d&apos;utilisateur</label>
          <input v-model="username" class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-violet-500" required
                 placeholder="Quel est votre nom d&apos;utilisateur ?" id="email" type="text">
          <label class="text-s font-bold after:content-['*'] after:text-red-400" for="password">Mot de passe</label>
          <input v-model="password" class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-violet-500" type="password"
                 required placeholder="********" id="password">
                 <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
          <div class="flex justify-between mb-4">
            <a href="#" class="text-xs text-indigo-500">Mot de passe oublié ?</a>
            <a href="/createAccount" class="text-xs text-indigo-500">Créer un compte</a>
          </div>
          <button @click="login"
              class="w-full rounded bg-violet-600 text-indigo-50 p-2 text-center font-bold hover:bg-violet-500 active:bg-violet-700">
            Connexion
          </button>
        </fieldset>
    </div>
  </div>
</template>

<style scoped>

</style>
