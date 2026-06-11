<template>
  <div class="container p-3">
    <div class="card p-4">
      <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Log In</h3>
      <form @submit.prevent="handlelogin">
        <!-- Identifier input -->
        <div data-mdb-input-init class="form-outline mb-4">
          <input 
            v-model="loginIdentifier"
            type="text" 
            class="form-control" 
          />
          <label class="form-label">Username or email</label>
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
import { useRouter } from 'vue-router'
import { login } from '../stores/auth'

const router = useRouter()

const loginIdentifier = ref('')
const password = ref('')

async function handlelogin() {
  try {
    const response = await fetch(
      'http://localhost:3000/api/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          loginIdentifier: loginIdentifier.value,
          password: password.value
        })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      alert(error.message || 'Login failed')
      return
    }

    const user = await response.json()

    login(user)

    router.push('/')
  }
  catch (err) {
    console.error(err)
    alert('Could not connect to server')
  }
}
</script>