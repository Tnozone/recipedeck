<template>
  <Transition name="message">
    <div
      v-if="visible"
      class=" message-box alert alert-dismissible shadow m-3 d-flex justify-content-between"
      :class="`alert-${messageType}`"
    >
      {{ message }}

      <i
          :class="
            messageType === 'success'
              ? 'bi bi-check-circle-fill text-success'
              : 'bi bi-x-circle-fill text-danger'
          "
        ></i>
    </div>
  </Transition>
</template>

<style scoped>
.message-box {
  position: fixed;
  font-size: 1rem;
  top: 20px;
  min-width: 320px;
  cursor: pointer;
  z-index: 9999;
}

/* Vue transition classes */
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>

<script setup>
import { ref, watch } from 'vue'
import { message, messageType } from '../stores/message'

const visible = ref(false)

watch(message, (newMessage) => {
  if (!newMessage) return

  visible.value = true

  setTimeout(() => {
    visible.value = false
    message.value = ''
  }, 3000)
})
</script>