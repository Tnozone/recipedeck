<template>
  <div class="container p-3">
    <div class="card p-4">
      <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Register</h3>
      <form @submit.prevent="register">

        <div data-mdb-input-init class="form-outline mb-4 col-md-8">
          <input 
            v-model="username"
            type="text" 
            class="form-control form-control-lg" 
            required
          />
          <label class="form-label">Username</label>
        </div>

        <div data-mdb-input-init class="form-outline mb-4 col-md-8">
          <input 
            v-model="email"
            type="email" 
            class="form-control form-control-lg" 
            required
          />
          <label class="form-label">Email</label>
        </div>

        <div data-mdb-input-init class="form-outline mb-4 col-md-8">
          <input 
            v-model="password"
            type="password" 
            class="form-control form-control-lg" 
            required
          />
          <label class="form-label">Password</label>
        </div>
        <div class="strength-meter mb-2 col-md-8">
          <div
            class="strength-bar col-2"
            :class="getBarClass(1)"
          ></div>

          <div
            class="strength-bar col-2"
            :class="getBarClass(2)"
          ></div>

          <div
            class="strength-bar col-2"
            :class="getBarClass(3)"
          ></div>
        </div>

        <div class="mb-3">
          <small v-if="passwordStrength === 1" class="text-danger mb-2">
            Weak
          </small>

          <small v-else-if="passwordStrength === 2" class="text-warning mb-2">
            Medium
          </small>

          <small v-else-if="passwordStrength === 3" class="text-success mb-2">
            Strong
          </small>
        </div>

        <div data-mdb-input-init class="form-outline mb-4 col-md-8">
          <input 
            v-model="confirmPassword"
            type="password" 
            class="form-control form-control-lg" 
            required
          />
          <label class="form-label">Repeat your password</label>
        </div>

        <div class="d-flex justify-content-center">
          <button  type="submit" data-mdb-button-init
            data-mdb-ripple-init class="btn btn-success btn-block btn-lg gradient-custom-4 text-white">Register</button>
        </div>

        <p class="text-center text-muted mt-5 mb-0">Have already an account? <router-link to="/login">Login here</router-link></p>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showMessage } from '../stores/message'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const passwordStrength = computed(() => {
  const len = password.value.length

  if (len >= 14) return 3
  if (len >= 8) return 2
  if (len > 0) return 1
  return 0
})

function getBarClass(index) {
  if (passwordStrength.value < index) return ''

  if (passwordStrength.value === 1) return 'weak'
  if (passwordStrength.value === 2) return 'medium'
  if (passwordStrength.value >= 3) return 'strong'
}

async function register() {

  if (
    !username.value.trim() ||
    !email.value.trim() ||
    !password.value ||
    !confirmPassword.value
  ) {
    showMessage('Please fill in all fields.', 'danger')
    return
  }
  
  if (password.value !== confirmPassword.value) {
    showMessage('Passwords do not match', 'danger')
    return
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value
        })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      alert(error.message)
      return
    }

    showMessage('You are registered!', 'success')

    router.push("/login")
  }
  catch (err) {
    console.error(err)
    alert("Could not connect to server.")
  }
}
</script>

<style scoped>
.strength-meter {
  display: flex;
  gap: 6px;
}

.strength-bar {
  flex: 1;
  height: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.strength-bar.weak {
  background-color: var(--color-red);
}

.strength-bar.medium {
  background-color: var(--color-gold);
}

.strength-bar.strong {
  background-color: var(--color-strong);
}

.btn-success {
  color: #fff;
  background-color: var(--color-success);
}

.btn-success:hover {
  background-color: var(--color-success-hover);
}
</style>