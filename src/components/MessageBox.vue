<template>
  <div
    v-if="visible"
    class="alert"
    :class="`alert-${type}`"
    role="alert"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'success'
  }
})

const visible = ref(false)

watch(
  () => props.message,
  (newMessage) => {
    if (!newMessage) return

    visible.value = true

    setTimeout(() => {
      visible.value = false
    }, 3000)
  }
)
</script>