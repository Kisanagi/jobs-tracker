<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const { data: applications, refresh } = await useAsyncData('applications', async () => {
  if (!user.value) return []
  const { data } = await supabase.from('applications').select('*').order('created_at', { ascending: false })
  return data ?? []
})

const search = ref('')
const draggingId = ref(null)
const showModal = ref(false)
const editingApp = ref(null)

const total = computed(() => applications.value?.length ?? 0)
const awaiting = computed(() => applications.value?.filter(a => ['Applied', 'Screening', 'Interview'].includes(a.status)).length ?? 0)
const rejected = computed(() => applications.value?.filter(a => ['Rejected', 'Ghosted'].includes(a.status)).length ?? 0)

const visible = computed(() =>
  (applications.value ?? []).filter(a =>
    !search.value || a.company.toLowerCase().includes(search.value.toLowerCase())
  )
)

function byStatus(status) {
  return visible.value.filter(a => a.status === status)
}

const newStatus = ref(null)
function openNew(status = null) { editingApp.value = null; newStatus.value = status; showModal.value = true }
function openEdit(app) { editingApp.value = app; showModal.value = true }
function closeModal() { showModal.value = false; editingApp.value = null; newStatus.value = null }

async function save(data) {
  if (editingApp.value) {
    await supabase.from('applications').update(data).eq('id', editingApp.value.id)
  } else {
    await supabase.from('applications').insert({ ...data, user_id: user.value.id })
  }
  await refresh()
  closeModal()
}

async function deleteApp(id) {
  if (!confirm('Hapus lamaran ini?')) return
  await supabase.from('applications').delete().eq('id', id)
  await refresh()
}

async function updateStatus(id, status) {
  await supabase.from('applications').update({ status }).eq('id', id)
  await refresh()
}

function onDragStart(e, id) {
  draggingId.value = id
  e.dataTransfer.effectAllowed = 'move'
}

function onDragOver(e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
}

function onDrop(e, status) {
  e.preventDefault()
  if (draggingId.value) updateStatus(draggingId.value, status)
  draggingId.value = null
}

const COLUMN_ACCENTS = {
  Applied:   'border-t-blue-400',
  Screening: 'border-t-yellow-400',
  Interview: 'border-t-purple-400',
  Offer:     'border-t-green-400',
  Accepted:  'border-t-brand-500',
  Rejected:  'border-t-red-400',
  Ghosted:   'border-t-slate-400',
}
</script>

<template>
  <Landing v-if="!user" />

  <div v-else class="space-y-6">

    <!-- Header -->
    <div class="animate-fade-up">
      <h1 class="text-2xl md:text-3xl font-semibold text-white tracking-tight">Dashboard</h1>
      <p class="text-sm text-white/40 mt-0.5">{{ user.email }}</p>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-3 gap-3 md:gap-4 animate-fade-up delay-1">
      <div class="relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 p-3 md:p-5">
        <p class="text-[10px] md:text-xs font-medium uppercase tracking-wide text-white/40">Total</p>
        <p class="text-2xl md:text-4xl font-bold mt-1 text-white">{{ total }}</p>
        <span class="absolute -right-3 -bottom-3 text-6xl opacity-[0.07] select-none">📋</span>
      </div>
      <div class="relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 p-3 md:p-5">
        <p class="text-[10px] md:text-xs font-medium text-white/40 uppercase tracking-wide">Menunggu</p>
        <p class="text-2xl md:text-4xl font-bold text-brand-300 mt-1">{{ awaiting }}</p>
        <span class="absolute -right-3 -bottom-3 text-6xl opacity-[0.07] select-none">⏳</span>
      </div>
      <div class="relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 p-3 md:p-5">
        <p class="text-[10px] md:text-xs font-medium text-white/40 uppercase tracking-wide">Ditolak</p>
        <p class="text-2xl md:text-4xl font-bold text-red-400 mt-1">{{ rejected }}</p>
        <span class="absolute -right-3 -bottom-3 text-6xl opacity-[0.07] select-none">❌</span>
      </div>
    </div>

    <!-- Search -->
    <div class="animate-fade-up delay-2">
      <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
        <input v-model="search" type="text" placeholder="Cari perusahaan..."
          class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 bg-white/5 transition-colors" />
      </div>
    </div>

    <!-- Kanban -->
    <div class="overflow-x-auto md:overflow-x-visible pb-4 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory animate-fade-up delay-2">
      <div class="flex gap-3 min-w-max md:grid md:auto-cols-fr md:grid-flow-col md:min-w-0 md:gap-3">
        <div v-for="status in STATUSES" :key="status"
          class="w-[78vw] md:w-auto snap-start flex flex-col rounded-xl bg-white/[0.03] border border-white/10 border-t-2 transition-all"
          :class="[COLUMN_ACCENTS[status], { 'ring-2 ring-brand-400/50 bg-white/[0.06]': draggingId }]"
          @dragover="onDragOver"
          @drop="onDrop($event, status)">

          <div class="flex items-center justify-between px-3 py-2.5">
            <span class="text-xs font-semibold text-white/70">{{ status }}</span>
            <span class="text-xs font-bold min-w-5 h-5 flex items-center justify-center rounded-full px-1.5"
              :class="STATUS_COLORS[status]">{{ byStatus(status).length }}</span>
          </div>

          <div class="flex flex-col gap-2 p-2 h-72 overflow-y-auto">
            <div v-for="app in byStatus(status)" :key="app.id"
              draggable="true"
              @dragstart="onDragStart($event, app.id)"
              @dragend="draggingId = null"
              class="bg-white/[0.06] rounded-xl border border-white/10 p-3 cursor-grab active:cursor-grabbing active:opacity-50 active:scale-95 transition-all duration-150 hover:bg-white/10 hover:-translate-y-0.5 group">

              <div class="flex items-start gap-2 mb-2">
                <span class="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-200 grid place-items-center text-xs font-bold shrink-0 mt-0.5">
                  {{ app.company[0].toUpperCase() }}
                </span>
                <div class="min-w-0">
                  <a v-if="app.job_url" :href="app.job_url" target="_blank" @click.stop
                    class="text-xs font-semibold text-white/90 hover:text-brand-300 truncate block leading-tight">{{ app.company }}</a>
                  <span v-else class="text-xs font-semibold text-white/90 truncate block leading-tight">{{ app.company }}</span>
                  <p class="text-[11px] text-white/40 truncate mt-0.5">{{ app.position }}</p>
                </div>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-white/5">
                <span class="text-[10px] text-white/30">{{ app.applied_date ?? '-' }}</span>
                <div class="flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button @click.stop="openEdit(app)"
                    class="text-[10px] text-white/40 hover:text-brand-300 font-medium">Edit</button>
                  <button @click.stop="deleteApp(app.id)"
                    class="text-[10px] text-white/40 hover:text-red-400 font-medium">Hapus</button>
                </div>
              </div>
              <select @click.stop @change="updateStatus(app.id, $event.target.value)"
                :value="app.status"
                class="md:hidden mt-2 w-full text-[11px] rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-white/60 focus:outline-none">
                <option v-for="s in STATUSES" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>

            <!-- Empty column: whole area is a clickable add zone -->
            <button v-if="byStatus(status).length === 0"
              @click="openNew(status)"
              class="flex-1 min-h-24 w-full flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 text-white/30 hover:border-brand-400/50 hover:text-brand-300 hover:bg-white/[0.04] transition-colors">
              <span class="text-xl leading-none">+</span>
              <span class="text-[11px] font-medium">Tambah</span>
            </button>

            <!-- Non-empty column: small add button under the cards -->
            <button v-else
              @click="openNew(status)"
              class="mt-1 py-1.5 rounded-lg border border-dashed border-white/15 text-[11px] text-white/40 hover:border-brand-400/50 hover:text-brand-300 hover:bg-white/[0.04] transition-colors">
              + Tambah
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FAB -->
    <button @click="openNew"
      class="fixed bottom-6 right-6 bg-white text-black px-5 py-3 rounded-full shadow-lg shadow-black/40 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 font-medium text-sm z-10">
      <span class="text-base leading-none">+</span> Tambah Lamaran
    </button>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center sm:p-4"
        @click.self="closeModal">
        <div class="bg-neutral-900 border border-white/10 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
          <div class="sm:hidden flex justify-center pt-3 pb-1">
            <div class="w-10 h-1 rounded-full bg-white/20"></div>
          </div>
          <div class="flex items-center justify-between px-6 pt-4 pb-4 border-b border-white/10">
            <h2 class="font-semibold text-white">{{ editingApp ? 'Edit Lamaran' : 'Tambah Lamaran' }}</h2>
            <button @click="closeModal" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors text-lg">✕</button>
          </div>
          <div class="p-6">
            <ApplicationForm :initial="editingApp ?? (newStatus ? { status: newStatus } : {})" :preview="false" @submit="save" />
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>
