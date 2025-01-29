const router = useRouter();
const { loggedIn } = useUserSession();

/**
 * Vérifie si l'utilisateur est connecté, sinon le redirige vers la page de connexion
 */
const checkConnected = () : void => {
    if(!loggedIn.value){
        router.push('/login')
    }
}

export { checkConnected }