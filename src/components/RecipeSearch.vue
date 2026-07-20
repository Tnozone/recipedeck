<template>
  <div class="p-3 mb-4 search">
    <div class="row g-2 d-flex justify-content-center">
      <div class="col-md-5">
        <input
          v-model="search"
          class="form-control"
          type="text"
          placeholder="Search recipes..."
        >
      </div>

      <!-- selection for search type -->
      <div class="col-4 col-md-2">
        <select v-model="mode" class="form-select">
          <option value="name">Recipe name</option>
          <option value="tag">Tag</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['search'])

const search = ref('')
const mode = ref('name')

watch([search, mode], () => {
  emit('search', {
    text: search.value,
    mode: mode.value
  })
})
</script>

<style scoped>

.search .form-select:focus, .search .form-select:focus-visible, .search .form-control:focus, .search .form-control:focus-visible {
  box-shadow: 0 0 0 0.25rem var(--color-gold-rgb);
}

</style>