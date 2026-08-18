export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const authPages = ['/login', '/register']
  if (user.value && authPages.includes(to.path)) return navigateTo('/')
})
