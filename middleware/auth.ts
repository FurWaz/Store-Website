export default defineNuxtRouteMiddleware((to, from) => {
    if (!import.meta.client) return; // We don't need to check for authentication on the server side

    if (!User.Current || !User.Current.id) {
        return navigateTo('/', { external: true });
    }
});
