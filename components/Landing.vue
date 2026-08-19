<script setup>
const sources = ['LinkedIn', 'Glints', 'Jobstreet', 'Kalibrr', 'Indeed']
</script>

<template>
  <div class="min-h-screen bg-black font-sans text-white">
    <div class="relative w-full bg-black overflow-hidden min-h-screen flex flex-col">

      <!-- Ambient glow -->
      <div class="pointer-events-none absolute -top-32 right-0 w-[60%] h-[70%] rounded-full blur-3xl opacity-60
                  bg-[radial-gradient(closest-side,rgba(176,197,168,0.35),transparent)] animate-glow"></div>
      <div class="pointer-events-none absolute -bottom-40 -left-24 w-[55%] h-[70%] rounded-full blur-3xl opacity-50
                  bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)] animate-glow-slow"></div>
      <!-- Star specks -->
      <div class="pointer-events-none absolute inset-0 opacity-[0.15]
                  bg-[radial-gradient(1px_1px_at_20%_30%,#fff,transparent),radial-gradient(1px_1px_at_70%_60%,#fff,transparent),radial-gradient(1px_1px_at_40%_80%,#fff,transparent),radial-gradient(1px_1px_at_85%_25%,#fff,transparent)]"></div>

      <!-- Nav -->
      <nav class="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5">
        <span class="font-semibold text-lg tracking-tight flex items-center gap-2">
          <span class="w-7 h-7 rounded-full bg-white/10 grid place-items-center text-sm">◈</span> NgTrack
        </span>
        <NuxtLink to="/login" class="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors">
          <span class="w-7 h-7 rounded-full border border-white/20 grid place-items-center text-xs">◐</span>
          Buat Akun
        </NuxtLink>
      </nav>

      <!-- Hero -->
      <section class="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.02] max-w-4xl animate-fade-up delay-1">
          Semua lamaran dalam<br /><span class="text-white/35">satu papan kendali</span>
        </h1>
        <p class="text-white/50 mt-6 max-w-lg text-sm sm:text-base animate-fade-up delay-2">
          Catat, lacak, dan pindahkan setiap lamaran dari Wishlist hingga Offer, semua dalam satu dashboard yang mulus.
        </p>

        <div class="flex items-center gap-3 mt-9 animate-fade-up delay-3">
          <NuxtLink to="/register" class="flex items-center gap-1.5 bg-white/10 border border-white/15 text-white font-medium px-6 py-3 rounded-full backdrop-blur transition-all hover:bg-white/15 hover:-translate-y-0.5">
            Mulai gratis <span class="text-white/60">↗</span>
          </NuxtLink>
          <NuxtLink to="/login" class="bg-white text-black font-medium px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10">
            Masuk
          </NuxtLink>
        </div>

        <!-- Bottom meta row -->
        <div class="hidden sm:flex absolute bottom-6 left-6 right-6 items-end justify-between text-xs">
          <span class="flex items-center gap-2 text-white/50 bg-white/5 border border-white/10 rounded-full pl-1.5 pr-3 py-1.5">
            <span class="w-6 h-6 rounded-full bg-white/10 grid place-items-center">↓</span> Scroll
          </span>
          <span class="text-brand-300/80">Pipeline lamaran</span>
        </div>
      </section>

      <!-- Source logos -->
      <section id="sumber" class="relative z-10 border-t border-white/10 px-5 sm:px-8 py-8">
        <p class="text-center text-xs text-white/30 mb-5">Lacak lamaran dari sumber favoritmu</p>
        <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <span v-for="s in sources" :key="s" class="text-white/40 font-medium tracking-tight hover:text-white/70 transition-colors">{{ s }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@keyframes glow {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
  50%      { transform: translate(-4%, 3%) scale(1.08); opacity: 0.7; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
.animate-glow      { animation: glow 9s ease-in-out infinite; }
.animate-glow-slow { animation: glow 13s ease-in-out infinite; }
.animate-float     { animation: float 5s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .animate-glow, .animate-glow-slow, .animate-float { animation: none; }
}
</style>
