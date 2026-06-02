<template>
  <div class="card">
    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Register</h3>
    <form @submit.prevent="register">

      <div data-mdb-input-init class="form-outline mb-4">
        <input 
          v-model="username"
          type="text" 
          class="form-control form-control-lg" 
        />
        <label class="form-label">Username</label>
      </div>

      <div data-mdb-input-init class="form-outline mb-4">
        <input 
          v-model="email"
          type="email" 
          class="form-control form-control-lg" 
        />
        <label class="form-label">Email</label>
      </div>

      <div data-mdb-input-init class="form-outline mb-4">
        <input 
          v-model="password"
          type="password" 
          class="form-control form-control-lg" 
        />
        <label class="form-label">Password</label>
      </div>

      <div data-mdb-input-init class="form-outline mb-4">
        <input 
          v-model="password"
          type="password" 
          class="form-control form-control-lg" 
        />
        <label class="form-label">Repeat your password</label>
      </div>

      <div class="d-flex justify-content-center">
        <button  type="submit" data-mdb-button-init
          data-mdb-ripple-init class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
      </div>

      <p class="text-center text-muted mt-5 mb-0">Have already an account? <router-link to="/login">Login here</router-link></p>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { saveUser } from '../data/users'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function register() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  const user = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]')

  users.push(user)

  localStorage.setItem('users', JSON.stringify(users))

  saveUser(user)

  alert('User registered!')

  username.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
}
</script>