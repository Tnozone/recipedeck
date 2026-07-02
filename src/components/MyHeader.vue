<template>
  <header class="bg-header">
    <div class="d-flex align-items-center justify-content-center gap-2">
      <img src="../../public/recipedeck-logo.png" alt="recipedeck logo" class="logo" />
      <h1 class="text-center py-3 mb-0 text-warning fs-1">Recipedeck</h1>
    </div>

    <nav class="navbar navbar-expand-lg px-3 ms-auto">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible menu -->
        <div
          class="collapse navbar-collapse"
          id="mainNavbar"
        >
          <div class="navbar-nav ms-auto">
            <router-link to="/" class="nav-link text-white fs-4">
              Home
            </router-link>

            <router-link to="/upload" class="nav-link text-white fs-4">
              Upload Recipe
            </router-link>

            <router-link to="/recipes" class="nav-link text-white fs-4">
              My Recipes
            </router-link>

            <router-link to="/fav" class="nav-link text-white fs-4">
              Favorite Recipes
            </router-link>

            <a href="#" @click.prevent="handleLogout" class="nav-link text-white fs-4">Log Out</a>

            <a href="#" @click.prevent="deleteAccount" class="nav-link fs-4 delete-link">Delete Account</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.bg-header {
  background-color: var(--head-bg-color);
}

.logo {
  height: 3rem;
  width: 3rem;
  object-fit: contain;
}

.nav-link {
  font-weight: 500;
}

.nav-link:hover, .nav-link.router-link-exact-active {
  text-decoration: underline;
}

.nav-link:focus-visible {
  outline: 4px solid var(--bs-warning);
  outline-offset: 2px;
}

.navbar-toggler {
  border-color: #fff;
}

.navbar-toggler-icon {
  width: 2.5rem;
  height: 2.5rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255,255,255,1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.delete-link {
  color: #fff;
}

.delete-link:hover, .delete-link:focus {
  color: var(--delete-color);
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import { logout, token, user } from '../stores/auth.js'
import { showMessage } from '../stores/message'
import { showConfirm } from '../stores/confirm'

const router = useRouter()

function handleLogout() {
  logout()
  router.push('/')
}

// delete account function
async function deleteAccount() {
  
  if (!token.value) {
    return
  }

  const confirmed = await showConfirm(
    'Are you sure you want to delete your account? This action cannot be undone.'
  )

  if (!confirmed) return

  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${user.value.username}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      const error = await response.json()
      alert(error.message)
      return
    }

    // logout after successful deletion
    logout()

    showMessage('Account deleted', 'success')

    router.push('/')
  }
  catch (err) {
    console.error(err)
    showMessage('Could not connect to server', 'danger')
  }
}
</script>