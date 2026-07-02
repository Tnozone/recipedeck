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
          data-bs-target="#guestNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible menu -->
        <div
          class="collapse navbar-collapse"
          id="guestNavbar"
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

            <router-link to="/login" class="nav-link text-white fs-4">
              Log In
            </router-link>

            <router-link to="/signup" class="nav-link text-white fs-4">
              Sign Up
            </router-link>
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
</style>