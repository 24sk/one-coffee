export default defineNuxtRouteMiddleware(async (to) => {
  const client = useSupabaseClient();
  const { data } = await client.auth.getSession();
  const user = data.session?.user;

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
