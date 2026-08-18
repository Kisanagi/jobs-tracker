<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

async function loginWithGoogle() {
  const { error: err } = await supabase.auth.signInWithOAuth({ provider: 'google' })
  if (err) error.value = err.message
}

async function submit() {
  loading.value = true
  error.value = ''
  const { error: err } = await supabase.auth.signUp({ email: email.value, password: password.value })
  if (err) { error.value = err.message; loading.value = false }
  else success.value = true
}
</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
    <div class="pointer-events-none fixed -top-40 right-0 w-[55%] h-[60%] rounded-full blur-3xl opacity-40
                bg-[radial-gradient(closest-side,rgba(176,197,168,0.28),transparent)]"></div>
    <div class="pointer-events-none fixed -bottom-48 -left-32 w-[55%] h-[60%] rounded-full blur-3xl opacity-30
                bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)]"></div>

    <div class="relative z-10 w-full max-w-xs">
      <p class="text-xs font-semibold tracking-widest text-brand-300 uppercase mb-2 animate-fade-up">NgTrack</p>
      <h1 class="text-4xl font-bold text-white mb-1 animate-fade-up delay-1">Buat akun.</h1>
      <p class="text-white/40 text-sm mb-10 animate-fade-up delay-2">Mulai lacak lamaranmu.</p>

      <p v-if="success" class="text-brand-300 text-sm">
        Akun dibuat. <NuxtLink to="/login" class="underline font-medium">Login sekarang</NuxtLink>.
      </p>
      <template v-else>
        <p v-if="error" class="text-red-400 text-sm mb-6">{{ error }}</p>
        <form @submit.prevent="submit" class="space-y-5 animate-fade-up delay-2">
          <div>
            <label for="email" class="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wide">Email</label>
            <input id="email" v-model="email" type="email" required autofocus
              class="w-full border-0 border-b-2 border-white/15 focus:border-brand-400 outline-none py-2 text-sm text-white bg-transparent transition-colors" />
          </div>
          <div>
            <label for="password" class="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wide">Password</label>
            <input id="password" v-model="password" type="password" required minlength="6"
              class="w-full border-0 border-b-2 border-white/15 focus:border-brand-400 outline-none py-2 text-sm text-white bg-transparent transition-colors" />
          </div>
          <button type="submit" :disabled="loading"
            class="w-full mt-2 bg-white text-black py-2.5 text-sm font-medium rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 transition-all">
            {{ loading ? 'Mendaftar...' : 'Daftar →' }}
          </button>
        </form>
        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-white/10"></div>
          <span class="text-xs text-white/30">atau</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>
        <button @click="loginWithGoogle"
          class="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white/80 py-2.5 text-sm font-medium rounded-full hover:bg-white/10 transition-all">
          <svg viewBox="0 0 24 24" class="w-4 h-4 shrink-0">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Daftar dengan Google
        </button>
        <p class="text-center text-xs text-white/40 mt-8">
          Sudah punya akun? <NuxtLink to="/login" class="text-brand-300 hover:underline">Login</NuxtLink>
        </p>
      </template>
    </div>
  </div>
</template>
