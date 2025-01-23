<script setup lang="ts">
const router = useRouter()

const username = ref("");
const password = ref("");
const passwordConfirmed = ref("");
const passwordError = ref(''); 

const fetchUser = async () => {
  try {
    const response = await fetch('/api/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
};



async function createAccount() {
  const response = await fetchUser();
  for (const user of response) {
    if (user === username.value) {
      passwordError.value = 'Ce nom d\'utilisateur est déjà pris';
      return;
    }
  }
  if (password.value !== passwordConfirmed.value) {
    passwordError.value = 'La vérification des mots de passe a échoué';
    return;
  }
  $fetch('/api/createAccount', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value
    }
  })
  .then(async () => {
    await router.push('/login')
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
            <legend class="text-center bold text-2xl">Créez votre compte</legend>
            <hr class="mt-5 mb-5">
            <label class="text-s font-bold after:content-['*'] after:text-red-400" for="email">Nom d&apos;utilisateur</label>
            <input v-model="username" class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-blue-500" required
                   placeholder="Quel sera votre nom d&apos;utilisateur ?" id="email" type="text">
            <label class="text-s font-bold after:content-['*'] after:text-red-400" for="password">Mot de passe</label>
            <input v-model="password" class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-blue-500" type="password"
                   required placeholder="********" id="password">
            <label class="text-s font-bold after:content-['*'] after:text-red-400" for="password">Confirmation du mot de passe</label>
            <input v-model="passwordConfirmed" class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-blue-500" type="password"
                   required placeholder="********" id="passwordConfirmed">
            <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
            <button @click="createAccount"
                class="w-full rounded bg-blue-600 text-indigo-50 p-2 text-center font-bold hover:bg-blue-500 active:bg-blue-700">
              Créer le compte
            </button>
          </fieldset>
      </div>
    </div>
  </template>

<style>
</style>