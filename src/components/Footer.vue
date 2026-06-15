<template>
  <footer class="text-center text-lg-start text-white">
    <div class="container p-4 pb-0">
      <div class="row">
        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold">
            Recipedeck
          </h6>
          <p>
            A platform for freely sharing recipes between people. Let your culinary world expand.
          </p>
        </div>
        <nav class="navbar col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold">Navigation</h6>
          <router-link to="/" class="nav-item text-white">Home</router-link>
          <router-link to="/upload" class="nav-item text-white">Upload Recipe</router-link>
          <router-link to="/recipes" class="nav-item text-white">My Recipes</router-link>
          <router-link to="/fav" class="nav-item text-white">Favorite Recipes</router-link>
        </nav>
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
          <p><i class="fas fa-home mr-3"></i> Garches 92380, FR</p>
          <p><i class="fas fa-envelope mr-3"></i> maxnocquet@gmail.com</p>
          <p><i class="fas fa-phone mr-3"></i> + 06 82 63 00 67</p>
        </div>
      </div>
      <div class="p-3 d-flex justify-content-center">
        © 2026
        <a class="text-white" href="/"
            >Recipedeck.com</a
          >
      </div>
    </div>
  </footer>
</template>

<style scoped>

footer {
  background-color: #5FA06D;
}

</style>