import { ref } from 'vue'

export const confirmState = ref({
  show: false,
  message: '',
  resolve: null
})

export function showConfirm(message) {
  confirmState.value.show = true
  confirmState.value.message = message

  return new Promise((resolve) => {
    confirmState.value.resolve = resolve
  })
}

export function resolveConfirm(value) {
  confirmState.value.show = false

  if (confirmState.value.resolve) {
    confirmState.value.resolve(value)
  }
}