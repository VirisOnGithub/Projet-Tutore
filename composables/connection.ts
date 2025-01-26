const router = useRouter();
const { loggedIn } = useUserSession();

const checkConnected = () : void => {
    if(!loggedIn.value){
        router.push('/login')
    }
}

export { checkConnected }