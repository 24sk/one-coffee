export default defineNuxtRouteMiddleware(async (to) => {
  const client = useSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  const publicPages = ['/login', '/auth/callback'];
  const isPublic = publicPages.includes(to.path);

  if (!user && !isPublic) {
    return navigateTo('/login');
  }

  if (user && to.path === '/login') {
    return navigateTo('/user');
  }

  if (to.path === '/') {
    return navigateTo(user ? '/user' : '/login');
  }
});