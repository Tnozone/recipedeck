<template>
  <div class="container p-3">
    <div class="card p-4">
      <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Log In</h3>
      <form @submit.prevent="login">
        <!-- Email input -->
        <div data-mdb-input-init class="form-outline mb-4">
          <input 
            v-model="email"
            type="email" 
            class="form-control" 
          />
          <label class="form-label" for="form2Example1">Email address</label>
        </div>

        <!-- Password input -->
        <div data-mdb-input-init class="form-outline mb-4">
          <input 
            v-model="password"
            type="password" 
            class="form-control" 
          />
          <label class="form-label">Password</label>
        </div>

        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <!-- Checkbox -->
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" checked />
              <label class="form-check-label"> Remember me </label>
            </div>
          </div>

          <div class="col">
            <!-- Simple link -->
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <!-- Submit button -->
        <button  type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Sign in</button>

        <!-- Register buttons -->
        <div class="text-center">
          <p>Not a member? <router-link to="/signup">Register</router-link></p>
          <p>or sign up with:</p>
          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>

          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-google"></i>
          </button>

          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>

          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginUser } from '../data/users'

const email = ref('')
const password = ref('')

function login() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  const user = users.find(
    u => u.email === email.value &&
         u.password === password.value
  )

  if (!user) {
    alert('Invalid email or password')
    return
  }

  localStorage.setItem('currentUser', JSON.stringify(user))

  alert(`Welcome ${user.username}!`)

  // Later:
  // router.push('/')
}
// const user = loginUser(email.value, password.value)
</script>