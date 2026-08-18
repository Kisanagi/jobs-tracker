<script setup>
const features = [
  { icon: '📋', title: 'Lacak Semua Lamaran', desc: 'Catat setiap lamaran: perusahaan, posisi, sumber, dan statusnya, di satu tempat.' },
  { icon: '🗂️', title: 'Kanban Pipeline', desc: 'Visualisasikan progress dari Wishlist hingga Accepted dengan board drag & drop.' },
  { icon: '🔍', title: 'Filter & Cari', desc: 'Cari berdasarkan perusahaan, filter per status atau role track dalam hitungan detik.' },
]
</script>

<template>
  <div class="min-h-screen bg-cream font-sans text-ink">
    <nav class="flex items-center justify-between px-6 sm:px-10 py-5">
      <span class="font-display font-semibold text-xl text-ink">◈ Jobs Tracker</span>
      <NuxtLink to="/login" class="bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">Masuk</NuxtLink>
    </nav>

    <section class="text-center px-6 pt-14 pb-20">
      <h1 class="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-ink leading-[1.05] max-w-3xl mx-auto tracking-tight animate-fade-up">
        <em>Kendali penuh</em> atas<br />lamaranmu
      </h1>
      <p class="text-muted mt-6 max-w-md mx-auto text-sm sm:text-base animate-fade-up delay-1">
        Satu tempat untuk mencatat, melacak, dan memantau semua lamaran kerja kamu.
      </p>
      <div class="flex items-center justify-center gap-3 mt-9 animate-fade-up delay-2">
        <NuxtLink to="/register" class="bg-brand-600 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-all hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-md">Mulai gratis</NuxtLink>
        <NuxtLink to="/login" class="bg-ink text-white font-medium px-6 py-3 rounded-xl transition-all hover:bg-brand-900 hover:-translate-y-0.5">Masuk</NuxtLink>
      </div>
    </section>

    <section class="px-6 sm:px-10 pb-8 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="(f, idx) in features" :key="f.title"
        class="bg-white/60 border border-black/5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg animate-fade-up"
        :class="`delay-${idx + 1}`">
        <div class="w-11 h-11 rounded-full bg-brand-200 text-brand-800 grid place-items-center text-lg">{{ f.icon }}</div>
        <h3 class="font-display font-semibold text-lg text-ink mt-4">{{ f.title }}</h3>
        <p class="text-sm text-muted mt-2 leading-relaxed">{{ f.desc }}</p>
      </div>
    </section>

    <section class="px-6 sm:px-10 pt-12 pb-16">
      <h2 class="font-display text-3xl font-semibold text-center text-ink animate-fade-up">Semua dalam satu board</h2>
      <div class="mt-8 bg-white rounded-2xl border border-black/5 shadow-xl p-5 sm:p-7 max-w-4xl mx-auto animate-fade-up delay-1">
        <p class="font-display text-lg font-semibold text-ink mb-5">Dashboard</p>
        <div class="grid grid-cols-3 gap-4">
          <div class="rounded-xl bg-cream p-4">
            <p class="text-[10px] font-medium text-muted uppercase tracking-wide">Total Lamaran</p>
            <p class="text-3xl sm:text-4xl font-bold text-ink mt-1">12</p>
          </div>
          <div class="rounded-xl bg-cream p-4">
            <p class="text-[10px] font-medium text-muted uppercase tracking-wide">Menunggu</p>
            <p class="text-3xl sm:text-4xl font-bold text-ink mt-1">5</p>
          </div>
          <div class="rounded-xl bg-cream p-4">
            <p class="text-[10px] font-medium text-muted uppercase tracking-wide">Ditolak</p>
            <p class="text-3xl sm:text-4xl font-bold text-ink mt-1">3</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-10">
        <NuxtLink to="/register" class="inline-block bg-brand-600 text-white font-medium px-7 py-3 rounded-xl transition-all hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-md animate-fade-up delay-2">Mulai gratis</NuxtLink>
      </div>
    </section>
  </div>
</template>
