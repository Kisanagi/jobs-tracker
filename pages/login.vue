<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  loading.value = true
  error.value = ''
  const { error: err } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  if (err) { error.value = err.message; loading.value = false }
  else navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6">
    <div class="w-full max-w-xs">
      <p class="text-xs font-semibold tracking-widest text-brand-600 uppercase mb-2 animate-fade-up">Jobs Tracker</p>
      <h1 class="text-4xl font-bold text-gray-900 mb-1 animate-fade-up delay-1">Selamat datang.</h1>
      <p class="text-gray-400 text-sm mb-10 animate-fade-up delay-2">Masuk untuk melanjutkan.</p>

      <p v-if="error" class="text-red-500 text-sm mb-6">{{ error }}</p>

      <form @submit.prevent="submit" class="space-y-5 animate-fade-up delay-2">
        <div>
          <label for="email" class="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Email</label>
          <input id="email" v-model="email" type="email" required autofocus
            class="w-full border-0 border-b-2 border-gray-200 focus:border-brand-500 outline-none py-2 text-sm bg-transparent transition-colors" />
        </div>
        <div>
          <label for="password" class="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Password</label>
          <input id="password" v-model="password" type="password" required
            class="w-full border-0 border-b-2 border-gray-200 focus:border-brand-500 outline-none py-2 text-sm bg-transparent transition-colors" />
        </div>
        <button type="submit" :disabled="loading"
          class="w-full mt-2 bg-brand-600 text-white py-2.5 text-sm font-medium rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors">
          {{ loading ? 'Masuk...' : 'Masuk →' }}
        </button>
      </form>
      <p class="text-center text-xs text-gray-400 mt-8">
        Belum punya akun? <NuxtLink to="/register" class="text-brand-600 hover:underline">Daftar</NuxtLink>
      </p>
    </div>
  </div>
</template>
