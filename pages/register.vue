<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)
const showPassword = ref(false)

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
            <div class="relative">
              <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required minlength="6"
                class="w-full border-0 border-b-2 border-white/15 focus:border-brand-400 outline-none py-2 text-sm text-white bg-transparent transition-colors pr-8" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-xs">
                {{ showPassword ? 'Sembunyikan' : 'Lihat' }}
              </button>
            </div>
          </div>
          <button type="submit" :disabled="loading"
            class="w-full mt-2 bg-white text-black py-2.5 text-sm font-medium rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 transition-all">
            {{ loading ? 'Mendaftar...' : 'Daftar →' }}
          </button>
        </form>
        <p class="text-center text-xs text-white/40 mt-8">
          Sudah punya akun? <NuxtLink to="/login" class="text-brand-300 hover:underline">Login</NuxtLink>
        </p>
      </template>
    </div>
  </div>
</template>
