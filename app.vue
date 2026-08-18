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
  <div v-if="user" class="min-h-screen flex flex-col">

    <!-- Minimal top bar -->
    <header class="flex items-center justify-between px-5 md:px-8 py-4">
      <NuxtLink to="/" class="font-semibold text-brand-900 flex items-center gap-1.5">
        <span class="text-brand-600">◈</span> Jobs Tracker
      </NuxtLink>

      <!-- Avatar dropdown -->
      <div class="relative">
        <div v-if="avatarOpen" class="fixed inset-0 z-10" @click="avatarOpen = false" />
        <button @click="avatarOpen = !avatarOpen"
          class="relative z-20 w-9 h-9 rounded-full bg-brand-100 text-brand-700 grid place-items-center text-sm font-semibold hover:bg-brand-200 transition-colors">
          {{ initials }}
        </button>
        <div v-if="avatarOpen"
          class="absolute right-0 top-11 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 min-w-48">
          <p class="text-xs text-gray-400 truncate mb-3">{{ user.email }}</p>
          <button @click="logout" class="text-sm text-red-500 hover:text-red-700 font-medium">Logout</button>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 px-5 md:px-8 pb-28 overflow-x-hidden">
      <NuxtPage />
    </main>

  </div>
  <NuxtPage v-else />
</template>
