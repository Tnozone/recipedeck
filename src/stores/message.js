import { ref } from 'vue'

export const message = ref('')
export const messageType = ref('success')

let timeoutId = null

export function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type

  clearTimeout(timeoutId)

  timeoutId = setTimeout(() => {
    message.value = ''
  }, 3000)
}