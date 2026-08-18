<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const initials = computed(() => (user.value?.email ?? '?').slice(0, 2).toUpperCase())
const avatarOpen = ref(false)

async function logout() {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <div v-if="user" class="relative min-h-screen flex flex-col overflow-x-hidden">

    <!-- Ambient glow -->
    <div class="pointer-events-none fixed -top-40 right-0 w-[55%] h-[60%] rounded-full blur-3xl opacity-40
                bg-[radial-gradient(closest-side,rgba(176,197,168,0.28),transparent)]"></div>
    <div class="pointer-events-none fixed -bottom-48 -left-32 w-[55%] h-[60%] rounded-full blur-3xl opacity-30
                bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)]"></div>

    <!-- Minimal top bar -->
    <header class="relative z-30 flex items-center justify-between px-5 md:px-8 py-4">
      <NuxtLink to="/" class="font-semibold text-white flex items-center gap-2">
        <span class="w-7 h-7 rounded-full bg-white/10 grid place-items-center text-sm">◈</span> Sise
      </NuxtLink>

      <!-- Avatar dropdown -->
      <div class="relative">
        <div v-if="avatarOpen" class="fixed inset-0 z-10" @click="avatarOpen = false" />
        <button @click="avatarOpen = !avatarOpen"
          class="relative z-20 w-9 h-9 rounded-full bg-white/10 border border-white/15 text-white grid place-items-center text-sm font-semibold hover:bg-white/15 transition-colors">
          {{ initials }}
        </button>
        <div v-if="avatarOpen"
          class="absolute right-0 top-11 z-20 bg-neutral-900 rounded-2xl shadow-xl border border-white/10 p-4 min-w-48">
          <p class="text-xs text-white/40 truncate mb-3">{{ user.email }}</p>
          <button @click="logout" class="text-sm text-red-400 hover:text-red-300 font-medium">Logout</button>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="relative z-10 flex-1 px-5 md:px-8 pb-28 overflow-x-hidden">
      <NuxtPage />
    </main>

  </div>
  <NuxtPage v-else />
</template>
