<script setup>
const route = useRoute()
const supabase = useSupabaseClient()

const { data: application } = await useAsyncData(`app-${route.params.id}`, async () => {
  const { data } = await supabase.from('applications').select('*').eq('id', route.params.id).single()
  return data
})

async function save(updates) {
  const { error } = await supabase.from('applications').update(updates).eq('id', route.params.id)
  if (error) throw new Error(error.message)
  navigateTo('/')
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-bold">Edit Lamaran</h1>
    <ApplicationForm v-if="application" :initial="application" @submit="save" />
  </div>
</template>
