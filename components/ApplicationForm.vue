<script setup>
const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  preview: { type: Boolean, default: true }
})
const emit = defineEmits(['submit'])

const company = ref(props.initial.company ?? '')
const position = ref(props.initial.position ?? '')
const source = ref(props.initial.source ?? '')
const status = ref(props.initial.status ?? 'Applied')
const applied_date = ref(props.initial.applied_date ?? '')
const job_url = ref(props.initial.job_url ?? '')
const salary_range = ref(props.initial.salary_range ?? '')
const notes = ref(props.initial.notes ?? '')
const loading = ref(false)
const error = ref('')

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await emit('submit', {
      company: company.value, position: position.value,
      source: source.value, status: status.value,
      applied_date: applied_date.value || null,
      job_url: job_url.value || null,
      salary_range: salary_range.value || null,
      notes: notes.value || null
    })
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const inputClass = 'w-full border-0 border-b-2 border-white/15 focus:border-brand-400 outline-none py-2 text-sm text-white placeholder-white/25 bg-transparent transition-colors'
const labelClass = 'block text-xs font-medium text-white/40 uppercase tracking-wide'
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-8 animate-fade-up">
    <form @submit.prevent="submit" class="flex-1 space-y-5 max-w-lg">
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

      <div class="space-y-1">
        <label for="company" :class="labelClass">Perusahaan *</label>
        <input id="company" v-model="company" required placeholder="Google, Tokopedia..." :class="inputClass" />
      </div>
      <div class="space-y-1">
        <label for="position" :class="labelClass">Posisi *</label>
        <input id="position" v-model="position" required placeholder="Software Engineer..." :class="inputClass" />
      </div>
      <div class="space-y-1">
        <label for="status" :class="labelClass">Status</label>
        <select id="status" v-model="status" :class="inputClass">
          <option v-for="s in STATUSES" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div class="space-y-1">
        <label for="source" :class="labelClass">Sumber *</label>
        <input id="source" v-model="source" required placeholder="LinkedIn, Glints, referral..." :class="inputClass" />
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div class="space-y-1">
          <label for="applied_date" :class="labelClass">Tanggal Melamar</label>
          <input id="applied_date" v-model="applied_date" type="date" :class="inputClass" />
        </div>
        <div class="space-y-1">
          <label for="salary_range" :class="labelClass">Rentang Gaji</label>
          <input id="salary_range" v-model="salary_range" placeholder="5-8 juta" :class="inputClass" />
        </div>
      </div>
      <div class="space-y-1">
        <label for="job_url" :class="labelClass">URL Lowongan</label>
        <input id="job_url" v-model="job_url" type="url" placeholder="https://..." :class="inputClass" />
      </div>
      <div class="space-y-1">
        <label for="notes" :class="labelClass">Catatan</label>
        <textarea id="notes" v-model="notes" rows="3" placeholder="Informasi tambahan..." :class="inputClass + ' resize-none'"></textarea>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="submit" :disabled="loading"
          class="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 transition-all">
          {{ loading ? 'Menyimpan...' : 'Simpan →' }}
        </button>
        <NuxtLink v-if="preview" to="/" class="px-6 py-2.5 rounded-full text-sm border border-white/15 text-white/80 hover:bg-white/10 transition-colors">Batal</NuxtLink>
      </div>
    </form>

    <!-- Live preview -->
    <div v-if="preview" class="lg:w-64 shrink-0">
      <p class="text-xs font-medium text-white/40 uppercase tracking-wide mb-3">Preview Kartu</p>
      <div class="sticky top-24 bg-white/[0.06] rounded-xl border border-white/10 p-4 space-y-2.5 transition-all">
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full bg-brand-500/20 text-brand-200 grid place-items-center text-xs font-bold shrink-0">
            {{ (company || '?')[0].toUpperCase() }}
          </span>
          <span class="text-sm font-semibold text-white/90 truncate">{{ company || 'Nama Perusahaan' }}</span>
        </div>
        <p class="text-xs text-white/50 truncate">{{ position || 'Posisi' }}</p>
        <p class="text-xs text-white/40">{{ source || 'Sumber' }}</p>
        <div class="flex items-center justify-between pt-1">
          <span class="text-[10px] px-2 py-0.5 rounded-full font-medium" :class="STATUS_COLORS[status]">{{ status }}</span>
          <span class="text-[10px] text-white/30">{{ applied_date || '-' }}</span>
        </div>
        <p v-if="salary_range" class="text-[10px] text-white/40 border-t border-white/5 pt-2">{{ salary_range }}</p>
        <p v-if="notes" class="text-[10px] text-white/40 italic truncate">{{ notes }}</p>
      </div>
    </div>
  </div>
</template>
