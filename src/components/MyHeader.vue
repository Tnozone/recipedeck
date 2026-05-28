<template>
  <header>
    <h1 class="text-primary, text-center">Recipedeck</h1>

    <nav class="navbar">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/upload" class="nav-item">Upload Recipe</router-link>
      <router-link to="/recipes" class="nav-item">My Recipes</router-link>
      <router-link to="/fav" class="nav-item">Favorite Recipes</router-link>
      <a href="/" class="nav-item">Log Out</a>
    </nav>
  </header>
</template>