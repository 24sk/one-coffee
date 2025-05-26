export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  const publicPages = ['/login', '/auth/callback'];
  const isPublic = publicPages.includes(to.path);

  if (!user.value && !isPublic) {
    return navigateTo('/login');
  }

  if (user.value && to.path === '/login') {
    return navigateTo('/user');
  }

  if (to.path === '/') {
    return navigateTo(user.value ? '/user' : '/login');
  }
});
