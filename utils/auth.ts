export function useAuth() {
    const session = useCookie('session');
    const isAuthenticated = computed(() => !!session.value);
    return { isAuthenticated };
}