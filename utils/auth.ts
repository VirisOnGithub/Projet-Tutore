export function useAuth() {
    const session = useCookie('session');
    console.log('session', session.value);
    const isAuthenticated = computed(() => !!session.value);
    return { isAuthenticated };
}