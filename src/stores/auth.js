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

  console.log('Status:', res.status)

  if (!res.ok) {
    console.log(await res.text())
    logout()
    return
  }

  user.value = await res.json()
  console.log('User:', user.value)
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