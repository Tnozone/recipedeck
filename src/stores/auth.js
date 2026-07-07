import { ref, computed } from 'vue'

export const token = ref(
  localStorage.getItem('token')
)

export const isAuthenticated = computed(() => !!token.value)

export const user = ref(null)

export async function fetchUser() {
  if (!token.value) return

  const res = await fetch('http://localhost:3000/api/users/me', {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  if (!res.ok) {
    logout()
    return
  }

  user.value = await res.json()
}

export async function loginToken(newToken) {
  if (!newToken) {
    throw new Error('No authentication token received.')
  }
  
  token.value = newToken
  localStorage.setItem('token', newToken)
}

export function logout() {
  token.value = null
  user.value = null
  localStorage.removeItem('token')
}