<template>
  <header>
    <h1 class="text-center bg-header py-3 mb-0 bg-header text-white fs-1">Recipedeck</h1>

    <nav class="navbar navbar-expand-lg bg-header px-3 ms-auto">
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

            <a href="/" class="nav-link text-white fs-4">Log Out</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.bg-header {
  background-color: #87ceeb;
}

.nav-link {
  font-weight: 500;
}

.nav-link:hover, .nav-link:focus {
  text-decoration: underline;
}

.navbar-toggler {
  border-color: rgb(255, 255, 255);
}

.navbar-toggler-icon {
  width: 2.5rem;
  height: 2.5rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255,255,255,1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style>